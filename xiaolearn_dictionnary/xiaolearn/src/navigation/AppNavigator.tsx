import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import {
  DictionaryScreen,
  FlashcardsScreen,
  WritingScreen,
  ProgressScreen,
} from '../screens';
import { colors } from '../utils/theme';

export type RootTabParamList = {
  Dictionary: undefined;
  Flashcards: undefined;
  Writing: undefined;
  Progress: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.backgroundLight,
          borderTopColor: colors.glassBorder,
          borderTopWidth: 1,
          paddingBottom: 10,
          paddingTop: 12,
          height: 80,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Dictionary"
        component={DictionaryScreen}
        options={{
          tabBarLabel: 'Dictionnaire',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Flashcards"
        component={FlashcardsScreen}
        options={{
          tabBarLabel: 'Flashcards',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="layers" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Writing"
        component={WritingScreen}
        options={{
          tabBarLabel: 'Écriture',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="create" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          tabBarLabel: 'Progrès',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
