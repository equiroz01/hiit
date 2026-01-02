export const colors = {
  // Fondos
  background: '#F5F5F7',
  backgroundDark: '#1A1A1A',

  // Texto - mejor contraste
  text: '#1A1A1A',
  textSecondary: '#5A5A5A',
  textLight: '#FFFFFF',
  textMuted: '#8A8A8A',

  // Acentos - colores más balanceados
  primary: '#34C759',        // Verde iOS - excelente contraste
  primaryDark: '#248A3D',    // Verde oscuro para texto sobre primary
  secondary: '#007AFF',      // Azul iOS
  accent: '#FF9500',         // Naranja iOS

  // UI
  border: '#E5E5E7',
  cardBackground: '#FFFFFF',
  cardBackgroundAlt: '#F9F9FB',

  // Estados del timer - colores vibrantes pero legibles
  work: '#34C759',           // Verde para trabajo
  workDark: '#1E7A34',       // Verde oscuro para texto
  rest: '#FF9500',           // Naranja para descanso
  restDark: '#C45D00',       // Naranja oscuro para texto

  // Tints para fondos durante sesión
  workTint: 'rgba(52, 199, 89, 0.12)',
  restTint: 'rgba(255, 149, 0, 0.12)',

  // Estados adicionales
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
};

export type ColorKeys = keyof typeof colors;
