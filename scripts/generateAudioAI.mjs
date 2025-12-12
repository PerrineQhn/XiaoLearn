import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const dataDir = path.join(root, 'data');
const publicDir = path.join(root, 'public');
const pythonScriptLocal = path.join(__dirname, 'audio_tts.py');
const pythonScriptCloud = path.join(__dirname, 'audio_cloud_tts.py');

const datasetFiles = ['hsk1.json', 'hsk2.json', 'hsk3.json', 'hsk4.json', 'hsk5.json', 'hsk6.json', 'hsk7.json'];

async function loadLessons() {
  const lessons = [];
  for (const file of datasetFiles) {
    const content = await fs.readFile(path.join(dataDir, file), 'utf-8');
    lessons.push(...JSON.parse(content));
  }
  return lessons;
}

function ensurePythonDeps(useCloud = false) {
  // Check for required dependencies
  const requiredPackages = ['soundfile', 'numpy', 'TTS', 'scipy'];

  if (useCloud) {
    requiredPackages.push('google-cloud-texttospeech');
  }

  const missingPackages = [];

  for (const pkg of requiredPackages) {
    const check = spawnSync('python3', ['-c', `import ${pkg.replace('-', '_')}`], { stdio: 'ignore' });
    if (check.status !== 0) {
      missingPackages.push(pkg);
    }
  }

  if (missingPackages.length > 0) {
    console.log(`Installation des dépendances Python manquantes: ${missingPackages.join(', ')}…`);
    const install = spawnSync('python3', ['-m', 'pip', 'install', '--break-system-packages', ...missingPackages], { stdio: 'inherit' });
    if (install.status !== 0) {
      throw new Error(`Impossible d'installer les librairies Python: ${missingPackages.join(', ')}`);
    }
  }
}

async function main() {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const useCloud = args.includes('--cloud');
  const forceRegenerate = args.includes('--force');

  // Select script based on mode
  const pythonScript = useCloud ? pythonScriptCloud : pythonScriptLocal;
  const mode = useCloud ? 'Google Cloud TTS' : 'Coqui TTS Local';

  console.log('═'.repeat(60));
  console.log(`🎙️  Génération audio - Mode: ${mode}`);
  console.log('═'.repeat(60));

  // Ensure dependencies
  ensurePythonDeps(useCloud);

  // Load lessons
  const lessons = await loadLessons();
  const payload = lessons.reduce((acc, lesson) => {
    if (!acc.some((entry) => entry.audio === lesson.audio)) {
      acc.push({ audio: lesson.audio, text: lesson.hanzi });
    }
    return acc;
  }, []);

  console.log(`\n📊 Total de ${payload.length} fichiers audio uniques à générer`);

  // Count existing files if not forcing regeneration
  if (!forceRegenerate) {
    let existingCount = 0;
    for (const item of payload) {
      const filePath = path.join(publicDir, item.audio);
      try {
        await fs.access(filePath);
        existingCount++;
      } catch {
        // File doesn't exist
      }
    }
    if (existingCount > 0) {
      console.log(`ℹ️  ${existingCount} fichiers existent déjà (seront ignorés)`);
      console.log(`✨ ${payload.length - existingCount} nouveaux fichiers à générer`);
    }
  }

  // Create temp file with jobs
  const tmpFile = path.join(os.tmpdir(), `tts-jobs-${Date.now()}.json`);
  await fs.writeFile(tmpFile, JSON.stringify(payload, null, 2), 'utf-8');

  // Build command
  const pythonArgs = [pythonScript, tmpFile, publicDir];
  if (useCloud) {
    pythonArgs.push('--cloud');
  }

  console.log(`\n🚀 Démarrage de la génération...\n`);

  // Execute Python script
  const result = spawnSync('python3', pythonArgs, { stdio: 'inherit' });

  // Cleanup
  await fs.rm(tmpFile, { force: true });

  if (result.status !== 0) {
    throw new Error('La génération audio IA a échoué.');
  }

  console.log('\n✅ Génération audio terminée avec succès!');
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
