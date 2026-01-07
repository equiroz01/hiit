/**
 * Pulse HIIT - Design System
 * Spacing, Border Radius, Shadows, and Elevations
 */

/**
 * Border Radius System
 * Uso consistente de bordes redondeados en toda la app
 */
export const borderRadius = {
  none: 0,
  xs: 8,      // Elementos pequeños (badges, tags)
  sm: 12,     // Botones pequeños, inputs
  md: 16,     // Botones normales, chips, small cards
  lg: 20,     // Cards, modales
  xl: 24,     // Cards grandes
  xxl: 28,    // Hero cards
  full: 9999, // Circular (pills, avatars)
} as const;

/**
 * Spacing System
 * Sistema de espaciado consistente basado en múltiplos de 4
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  huge: 48,
} as const;

/**
 * Shadow System
 * Sombras consistentes para elevación
 */
export const shadows = {
  none: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  // Sombra suave para cards normales
  sm: {
    shadowColor: '#030027',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  // Sombra media para cards importantes
  md: {
    shadowColor: '#030027',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },

  // Sombra grande para modales y elementos flotantes
  lg: {
    shadowColor: '#030027',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },

  // Sombra con color (para botones primarios)
  primary: {
    shadowColor: '#5465ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },

  // Sombra con color (para elementos success)
  success: {
    shadowColor: '#87ff65',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
} as const;

/**
 * Typography Weights
 * Pesos de fuente consistentes
 */
export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

/**
 * Typography Sizes
 * Tamaños de fuente consistentes
 */
export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
  huge: 34,
  massive: 42,
};

/**
 * Icon Sizes
 * Tamaños consistentes para iconos
 */
export const iconSize = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
  xxl: 48,
};

/**
 * Container Padding
 * Padding consistente para contenedores
 */
export const containerPadding = {
  sm: 16,
  md: 20,
  lg: 24,
};

/**
 * Utilities
 */
export const getSpacing = (...values: Array<keyof typeof spacing>): number[] => {
  return values.map(key => spacing[key]);
};

export const getBorderRadius = (key: keyof typeof borderRadius): number => {
  return borderRadius[key];
};
