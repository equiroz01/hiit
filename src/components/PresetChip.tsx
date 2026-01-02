import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { Preset } from '../types';

interface PresetChipProps {
  preset: Preset;
  onPress: () => void;
  selected?: boolean;
}

export const PresetChip: React.FC<PresetChipProps> = ({ preset, onPress, selected }) => {
  const subtitle = `${preset.workSeconds}/${preset.restSeconds} x ${preset.rounds}`;

  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.name, selected && styles.nameSelected]}>{preset.name}</Text>
      <Text style={[styles.subtitle, selected && styles.subtitleSelected]}>{subtitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginRight: 12,
    minWidth: 120,
    alignItems: 'center',
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  name: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  nameSelected: {
    color: colors.textLight,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  subtitleSelected: {
    color: colors.textLight,
    opacity: 0.9,
  },
});
