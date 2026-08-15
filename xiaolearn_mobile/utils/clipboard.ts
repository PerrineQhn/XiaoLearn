/**
 * Copie dans le presse-papiers, sans exiger le module natif.
 *
 * `expo-clipboard` a besoin que son module natif soit présent dans le binaire.
 * Il l'est dans Expo Go et dans tout build fait APRÈS son installation — mais
 * un build de développement antérieur ne l'a pas, et l'import direct faisait
 * alors crasher l'écran entier au chargement (« Cannot find native module »).
 * Même garde que pour RevenueCat : on charge si présent, on dégrade sinon.
 */
import { Alert } from 'react-native';

let ExpoClipboard: { setStringAsync: (s: string) => Promise<boolean> } | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  ExpoClipboard = require('expo-clipboard');
} catch {
  ExpoClipboard = null;
}

/**
 * Second étage : le Clipboard HISTORIQUE de React Native. Déprécié, mais son
 * module natif fait partie du cœur de RN — il est donc présent dans TOUT
 * binaire, y compris un build de développement antérieur à l'installation
 * d'expo-clipboard. C'est lui qui rend la copie fonctionnelle sans rebuild.
 * Le require est différé et gardé : le jour où RN le retire vraiment, on
 * retombe sur le repli manuel au lieu de crasher.
 */
function rnCoreClipboard(): { setString: (s: string) => void } | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('react-native/Libraries/Components/Clipboard/Clipboard').default;
  } catch {
    return null;
  }
}

export async function copyText(text: string): Promise<void> {
  if (ExpoClipboard) {
    try {
      const ok = await ExpoClipboard.setStringAsync(text);
      console.log('[clipboard] expo-clipboard :', ok ? 'copié' : 'refusé');
      if (ok) return;
    } catch (e) {
      console.warn('[clipboard] expo-clipboard a échoué :', e);
    }
  }
  const core = rnCoreClipboard();
  if (core) {
    try {
      core.setString(text);
      console.log('[clipboard] copié via le Clipboard RN core');
      return;
    } catch (e) {
      console.warn('[clipboard] Clipboard RN core a échoué :', e);
    }
  }
  // Repli honnête : montrer le texte pour copie manuelle plutôt que de ne
  // rien faire — un bouton muet ressemble à une panne.
  console.warn('[clipboard] aucun presse-papiers disponible — repli manuel');
  Alert.alert('', text);
}
