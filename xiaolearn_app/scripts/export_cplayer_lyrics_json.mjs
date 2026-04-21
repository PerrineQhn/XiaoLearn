#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const parseArgs = (argv) => {
  const args = {
    out: 'exports/cplayer_lyrics.json',
    collection: 'cplayer_lyrics',
    reviewedOnly: false,
    project: '',
    perSong: false,
    perSongDir: 'exports/cplayer_lyrics_songs'
  };

  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--out' && argv[i + 1]) {
      args.out = argv[i + 1];
      i += 1;
    } else if (token === '--collection' && argv[i + 1]) {
      args.collection = argv[i + 1];
      i += 1;
    } else if (token === '--project' && argv[i + 1]) {
      args.project = argv[i + 1];
      i += 1;
    } else if (token === '--reviewed-only') {
      args.reviewedOnly = true;
    } else if (token === '--per-song') {
      args.perSong = true;
    } else if (token === '--per-song-dir' && argv[i + 1]) {
      args.perSongDir = argv[i + 1];
      i += 1;
    } else if (token === '--help' || token === '-h') {
      console.log(`Usage:
  node scripts/export_cplayer_lyrics_json.mjs [options]

Options:
  --out <path>           Output JSON path (default: exports/cplayer_lyrics.json)
  --collection <name>    Firestore collection (default: cplayer_lyrics)
  --project <projectId>  Override Firebase project id
  --reviewed-only        Export only reviewed == true documents
  --per-song             Also write one JSON file per song
  --per-song-dir <path>  Per-song output directory (default: exports/cplayer_lyrics_songs)
  --help                 Show this help

Credentials (one of):
  FIREBASE_SERVICE_ACCOUNT_JSON='{"type":"service_account",...}'
  FIREBASE_SERVICE_ACCOUNT_PATH=/abs/path/service-account.json
  GOOGLE_APPLICATION_CREDENTIALS=/abs/path/service-account.json
`);
      process.exit(0);
    }
  }
  return args;
};

const readServiceAccount = async () => {
  const rawJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (rawJson) {
    return JSON.parse(rawJson);
  }

  const jsonPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (jsonPath) {
    const content = await fs.readFile(path.resolve(jsonPath), 'utf8');
    return JSON.parse(content);
  }

  throw new Error(
    'Missing service account. Set FIREBASE_SERVICE_ACCOUNT_JSON or FIREBASE_SERVICE_ACCOUNT_PATH (or GOOGLE_APPLICATION_CREDENTIALS).'
  );
};

const normalizeTimestamp = (value) => {
  if (!value) return value;
  if (typeof value?.toDate === 'function') {
    try {
      return value.toDate().toISOString();
    } catch {
      return value;
    }
  }
  return value;
};

const sanitizeDoc = (id, data) => {
  const lines = Array.isArray(data?.lines)
    ? data.lines.map((line) => ({
        time: Number(line?.time || 0),
        hanzi: String(line?.hanzi || ''),
        pinyin: String(line?.pinyin || ''),
        translationFr: String(line?.translationFr || ''),
        translationEn: String(line?.translationEn || '')
      }))
    : [];

  return {
    id,
    videoId: String(data?.videoId || id),
    title: String(data?.title || ''),
    artist: String(data?.artist || ''),
    source: String(data?.source || ''),
    reviewed: Boolean(data?.reviewed),
    revision: typeof data?.revision === 'number' ? data.revision : 0,
    updatedBy: String(data?.updatedBy || ''),
    createdAt: normalizeTimestamp(data?.createdAt) || null,
    updatedAt: normalizeTimestamp(data?.updatedAt) || null,
    lines
  };
};

const slugify = (value) =>
  String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

const run = async () => {
  const args = parseArgs(process.argv);

  let firebaseAdmin;
  try {
    const module = await import('firebase-admin');
    firebaseAdmin = module.default ?? module;
  } catch {
    throw new Error(
      'firebase-admin is not installed. Run: npm i -D firebase-admin'
    );
  }

  if (!firebaseAdmin || typeof firebaseAdmin.initializeApp !== 'function') {
    throw new Error('Invalid firebase-admin import shape (initializeApp missing).');
  }

  const serviceAccount = await readServiceAccount();
  const projectId = args.project || serviceAccount.project_id;
  if (!projectId) {
    throw new Error('Unable to determine Firebase project id.');
  }

  const apps = Array.isArray(firebaseAdmin.apps) ? firebaseAdmin.apps : [];
  const app =
    apps.length > 0
      ? firebaseAdmin.app()
      : firebaseAdmin.initializeApp({
          credential: firebaseAdmin.credential.cert(serviceAccount),
          projectId
        });

  const db =
    typeof firebaseAdmin.firestore === 'function'
      ? firebaseAdmin.firestore(app)
      : typeof firebaseAdmin.getFirestore === 'function'
        ? firebaseAdmin.getFirestore(app)
        : null;

  if (!db) {
    throw new Error('Unable to initialize Firestore from firebase-admin.');
  }

  // Avoid gRPC DNS issues on some local environments.
  if (typeof db.settings === 'function') {
    try {
      db.settings({ preferRest: true });
    } catch {
      // Ignore if already initialized with settings.
    }
  }

  let query = db.collection(args.collection);
  if (args.reviewedOnly) {
    query = query.where('reviewed', '==', true);
  }

  const snapshot = await query.get();
  const docs = snapshot.docs.map((doc) => sanitizeDoc(doc.id, doc.data()));

  const outputPath = path.resolve(args.out);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(
    outputPath,
    JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        projectId,
        collection: args.collection,
        reviewedOnly: args.reviewedOnly,
        count: docs.length,
        docs
      },
      null,
      2
    ),
    'utf8'
  );

  console.log(`Exported ${docs.length} docs from "${args.collection}" to: ${outputPath}`);

  if (args.perSong) {
    const perSongDir = path.resolve(args.perSongDir);
    await fs.mkdir(perSongDir, { recursive: true });

    for (const doc of docs) {
      const titleSlug = slugify(doc.title);
      const artistSlug = slugify(doc.artist);
      const suffix = [titleSlug, artistSlug].filter(Boolean).join('--');
      const baseName = suffix ? `${doc.videoId}__${suffix}` : doc.videoId;
      const filePath = path.join(perSongDir, `${baseName}.json`);
      await fs.writeFile(
        filePath,
        JSON.stringify(
          {
            exportedAt: new Date().toISOString(),
            projectId,
            collection: args.collection,
            reviewedOnly: args.reviewedOnly,
            song: doc
          },
          null,
          2
        ),
        'utf8'
      );
    }
    console.log(`Exported ${docs.length} per-song JSON files to: ${perSongDir}`);
  }
};

run().catch((error) => {
  console.error('[export_cplayer_lyrics_json] Failed:', error.message || error);
  if (error?.stack) {
    console.error(error.stack);
  }
  process.exit(1);
});
