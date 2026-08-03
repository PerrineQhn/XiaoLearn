/**
 * Hook partagé — swipe-to-dismiss pour les bottom sheets.
 * Applique panHandlers sur le handle area, anime l'overlay opacity.
 * Utiliser animationType="none" sur le Modal pour éviter le double-slide.
 */
import { useRef, useEffect } from 'react';
import { Animated, PanResponder } from 'react-native';

export function useSwipeToDismiss(onClose: () => void) {
  const translateY = useRef(new Animated.Value(600)).current;
  const onCloseRef = useRef(onClose);
  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);

  // Opacité overlay inversement proportionnelle à la translation
  const overlayOpacity = translateY.interpolate({
    inputRange: [0, 350],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const panResponder = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderTerminationRequest: () => false,
    onPanResponderMove: (_, { dy }) => {
      if (dy > 0) translateY.setValue(dy);
    },
    onPanResponderRelease: (_, { dy, vy }) => {
      if (dy > 80 || vy > 0.5) {
        Animated.timing(translateY, { toValue: 900, duration: 220, useNativeDriver: true })
          .start(() => { translateY.setValue(600); onCloseRef.current(); });
      } else {
        Animated.spring(translateY, { toValue: 0, useNativeDriver: true, bounciness: 4 }).start();
      }
    },
  })).current;

  // Appelé dans onShow du Modal — slide-up depuis le bas
  const open = () => {
    translateY.setValue(600);
    Animated.spring(translateY, { toValue: 0, useNativeDriver: true, bounciness: 3, speed: 18 }).start();
  };

  const reset = () => translateY.setValue(0);
  return { translateY, overlayOpacity, panResponder, open, reset };
}
