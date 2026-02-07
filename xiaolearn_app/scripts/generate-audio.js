/**
 * Script pour générer automatiquement les fichiers audio des caractères chinois
 * Utilise Edge TTS (gratuit) pour la synthèse vocale en mandarin
 *
 * Installation requise :
 * npm install edge-tts --save-dev
 *
 * Usage :
 * node scripts/generate-audio.js
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');

const execPromise = util.promisify(exec);

// Configuration
const OUTPUT_DIR = path.join(__dirname, '../public/audio/grammar');
const VOICE = 'zh-CN-XiaoxiaoNeural'; // Voix féminine naturelle
// Autres voix disponibles :
// - zh-CN-XiaoxiaoNeural (femme, naturelle)
// - zh-CN-YunxiNeural (homme, naturel)
// - zh-CN-YunyangNeural (homme, professionnel)

// Liste des caractères à générer avec leur pinyin
const GRAMMAR_WORDS = [
  { hanzi: '不', pinyin: 'bù', filename: 'bu.mp3' },
  { hanzi: '没', pinyin: 'méi', filename: 'mei.mp3' },
  { hanzi: '的', pinyin: 'de', filename: 'de.mp3' },
  { hanzi: '吗', pinyin: 'ma', filename: 'ma.mp3' },
  { hanzi: '在', pinyin: 'zài', filename: 'zai.mp3' },
  { hanzi: '了', pinyin: 'le', filename: 'le.mp3' },
  { hanzi: '比', pinyin: 'bǐ', filename: 'bi.mp3' },
  { hanzi: '因为', pinyin: 'yīnwèi', filename: 'yinwei.mp3' },
  { hanzi: '所以', pinyin: 'suǒyǐ', filename: 'suoyi.mp3' },
  { hanzi: '因为所以', pinyin: 'yīnwèi suǒyǐ', filename: 'yinwei-suoyi.mp3' },
  { hanzi: '会', pinyin: 'huì', filename: 'hui.mp3' },
];

// Créer le dossier de sortie s'il n'existe pas
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✓ Dossier créé : ${dir}`);
  }
}

// Vérifier si edge-tts est installé
async function checkEdgeTTS() {
  try {
    await execPromise('edge-tts --version');
    return true;
  } catch (error) {
    console.error('❌ edge-tts n\'est pas installé.');
    console.error('Installation : npm install -g edge-tts');
    console.error('Ou : pip install edge-tts');
    return false;
  }
}

// Générer un fichier audio
async function generateAudio(hanzi, filename) {
  const outputPath = path.join(OUTPUT_DIR, filename);

  // Si le fichier existe déjà, on le saute
  if (fs.existsSync(outputPath)) {
    console.log(`⏭  Existe déjà : ${filename}`);
    return true;
  }

  try {
    const command = `edge-tts --voice "${VOICE}" --text "${hanzi}" --write-media "${outputPath}"`;
    await execPromise(command);
    console.log(`✓ Généré : ${filename} (${hanzi})`);
    return true;
  } catch (error) {
    console.error(`❌ Erreur pour ${filename}:`, error.message);
    return false;
  }
}

// Fonction principale
async function main() {
  console.log('🎵 Générateur d\'audio pour les points de grammaire\n');

  // Vérifier edge-tts
  const hasEdgeTTS = await checkEdgeTTS();
  if (!hasEdgeTTS) {
    process.exit(1);
  }

  // Créer le dossier
  ensureDirectoryExists(OUTPUT_DIR);
  console.log('');

  // Générer tous les audios
  let successCount = 0;
  let errorCount = 0;

  for (const word of GRAMMAR_WORDS) {
    const success = await generateAudio(word.hanzi, word.filename);
    if (success) {
      successCount++;
    } else {
      errorCount++;
    }
    // Petit délai pour ne pas surcharger l'API
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✓ Succès : ${successCount}/${GRAMMAR_WORDS.length}`);
  if (errorCount > 0) {
    console.log(`❌ Erreurs : ${errorCount}`);
  }
  console.log('='.repeat(50));
}

// Lancer le script
main().catch(console.error);
