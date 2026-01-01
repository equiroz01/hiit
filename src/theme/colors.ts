export const colors = {
  // Fondos
  background: '#F7F8FA',
  backgroundDark: '#1E2227',

  // Texto
  text: '#1E2227',
  textSecondary: '#6B7280',
  textLight: '#FFFFFF',

  // Acentos
  primary: '#7CFF4F',      // Verde lima fuerte - WORK
  secondary: '#0047FF',     // Azul profundo
  warning: '#FF9F43',       // Naranja suave - REST

  // UI
  border: '#D9DFE5',
  cardBackground: '#FFFFFF',

  // Estados del timer
  work: '#7CFF4F',
  rest: '#FF9F43',

  // Tints para fondos durante sesión
  workTint: 'rgba(124, 255, 79, 0.15)',
  restTint: 'rgba(255, 159, 67, 0.15)',
};

export type ColorKeys = keyof typeof colors;
