import { useState, useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

interface ResponsiveInfo {
  width: number;
  height: number;
  isTablet: boolean;
  isLandscape: boolean;
  scale: number;
  fontScale: number;
  timerFontSize: number;
  containerPadding: number;
  cardPadding: number;
}

const getResponsiveInfo = (window: ScaledSize): ResponsiveInfo => {
  const { width, height } = window;
  const isLandscape = width > height;
  const shortDimension = Math.min(width, height);
  const isTablet = shortDimension >= 600;

  // Scale factor based on screen width
  const baseWidth = 375; // iPhone standard
  const scale = Math.min(width / baseWidth, 1.5);

  // Font scale for timer
  const timerFontSize = isTablet
    ? isLandscape ? 180 : 160
    : isLandscape ? 100 : 120;

  // Padding adjustments
  const containerPadding = isTablet ? 40 : 20;
  const cardPadding = isTablet ? 28 : 20;

  return {
    width,
    height,
    isTablet,
    isLandscape,
    scale,
    fontScale: scale,
    timerFontSize,
    containerPadding,
    cardPadding,
  };
};

export const useResponsive = (): ResponsiveInfo => {
  const [dimensions, setDimensions] = useState(() =>
    getResponsiveInfo(Dimensions.get('window'))
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(getResponsiveInfo(window));
    });

    return () => subscription.remove();
  }, []);

  return dimensions;
};

// Helper para crear estilos responsive
export const createResponsiveStyle = <T extends object>(
  baseStyle: T,
  tabletStyle: Partial<T>,
  isTablet: boolean
): T => {
  return isTablet ? { ...baseStyle, ...tabletStyle } : baseStyle;
};
