import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/theme';

interface PlusIconProps {
  size?: number;
}

export const PlusIcon: React.FC<PlusIconProps> = ({ size = 32 }) => {
  return (
    <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.plus, { fontSize: size * 0.55 }]}>+</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    backgroundColor: colors.primaryGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: {
    color: colors.white,
    fontWeight: '600',
    marginTop: -2,
  },
});
