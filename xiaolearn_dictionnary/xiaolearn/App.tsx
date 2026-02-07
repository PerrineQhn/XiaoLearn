import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './src/navigation/AppNavigator';
import { initDatabase } from './src/database/init';
import { migrateDataToSQLite, isMigrationNeeded } from './src/database/migration';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { colors, gradients } from './src/utils/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { initAudio } from './src/utils/audio';

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function prepare() {
      try {
        // Initialiser l'audio
        await initAudio();

        // Initialiser la base de données
        await initDatabase();

        // Vérifier si migration nécessaire
        const needsMigration = await isMigrationNeeded();
        if (needsMigration) {
          console.log('Starting data migration...');
          await migrateDataToSQLite();
          console.log('Data migration completed!');
        }

        setIsReady(true);
      } catch (e) {
        console.error('Error preparing app:', e);
        setError('Erreur lors de l\'initialisation de l\'application');
      }
    }

    prepare();
  }, []);

  if (error) {
    return (
      <LinearGradient colors={gradients.background} style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </LinearGradient>
    );
  }

  if (!isReady) {
    return (
      <LinearGradient colors={gradients.background} style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Chargement...</Text>
      </LinearGradient>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <AppNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    color: colors.text,
    fontSize: 16,
  },
  errorText: {
    color: colors.error,
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});
