import { Audio } from 'expo-av';

let currentSound: Audio.Sound | null = null;

/**
 * Jouer un fichier audio
 */
export const playAudio = async (audioPath: string): Promise<void> => {
  try {
    // Arrêter l'audio en cours si existe
    if (currentSound) {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
      currentSound = null;
    }

    // Charger et jouer le nouveau son
    const { sound } = await Audio.Sound.createAsync(
      { uri: audioPath },
      { shouldPlay: true }
    );

    currentSound = sound;

    // Libérer la mémoire quand l'audio est terminé
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        sound.unloadAsync();
        currentSound = null;
      }
    });
  } catch (error) {
    console.error('Error playing audio:', error);
    throw error;
  }
};

/**
 * Arrêter l'audio en cours
 */
export const stopAudio = async (): Promise<void> => {
  if (currentSound) {
    try {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
      currentSound = null;
    } catch (error) {
      console.error('Error stopping audio:', error);
    }
  }
};

/**
 * Initialiser le mode audio (requis pour iOS)
 */
export const initAudio = async (): Promise<void> => {
  try {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
    });
  } catch (error) {
    console.error('Error initializing audio:', error);
  }
};
