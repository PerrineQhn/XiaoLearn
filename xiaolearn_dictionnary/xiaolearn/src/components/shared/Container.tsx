import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { gradients } from '../../utils/theme';

interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Container: React.FC<ContainerProps> = ({ children, style }) => {
  return (
    <LinearGradient
      colors={gradients.background}
      style={styles.gradient}
    >
      <SafeAreaView style={[styles.container, style]}>
        {children}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
