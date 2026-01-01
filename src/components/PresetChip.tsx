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
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  nameSelected: {
    color: colors.text,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  subtitleSelected: {
    color: colors.text,
    opacity: 0.8,
  },
});
