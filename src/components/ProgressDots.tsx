import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { Phase } from '../types';

interface ProgressDotsProps {
  total: number;
  current: number;
  phase: Phase;
}

export const ProgressDots: React.FC<ProgressDotsProps> = ({ total, current, phase }) => {
  const maxVisible = 15;
  const showDots = total <= maxVisible;

  if (!showDots) {
    return (
      <View style={styles.container}>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${(current / total) * 100}%`,
                backgroundColor: phase === 'work' ? colors.work : colors.rest,
              },
            ]}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.dotsContainer}>
        {Array.from({ length: total }, (_, i) => {
          const isCompleted = i < current - 1;
          const isCurrent = i === current - 1;

          return (
            <View
              key={i}
              style={[
                styles.dot,
                isCompleted && styles.dotCompleted,
                isCurrent && [
                  styles.dotCurrent,
                  { backgroundColor: phase === 'work' ? colors.work : colors.rest },
                ],
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.border,
  },
  dotCompleted: {
    backgroundColor: colors.textSecondary,
  },
  dotCurrent: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
});
