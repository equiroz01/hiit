/**
 * Pulse HIIT - Color Palette
 *
 * Palette:
 * - Primary:   #5465ff (Azul violeta vibrante)
 * - Dark:      #030027 (Azul oscuro profundo)
 * - Muted:     #bbbac6 (Gris lavanda claro)
 * - Secondary: #aceb98 (Verde pastel suave)
 * - Accent:    #87ff65 (Verde neón brillante)
 * - White:     #FFFFFF
 */

export const colors = {
  // ===== Fondos =====
  background: '#FFFFFF',           // Blanco puro para fondo principal
  backgroundAlt: '#F8F8FA',        // Blanco con tinte muy suave
  backgroundDark: '#030027',       // Azul oscuro profundo (dark mode)

  // ===== Texto =====
  text: '#030027',                 // Azul oscuro para texto principal
  textSecondary: '#6B6C87',        // Intermedio (mezcla #030027 + #bbbac6)
  textMuted: '#bbbac6',            // Gris lavanda claro para texto secundario
  textLight: '#FFFFFF',            // Blanco para texto sobre fondos oscuros

  // ===== Acentos Principales =====
  primary: '#5465ff',              // Azul violeta vibrante
  primaryLight: '#7C89FF',         // Versión clara del primary
  primaryDark: '#3D4DD9',          // Versión oscura del primary

  secondary: '#aceb98',            // Verde pastel suave
  secondaryLight: '#C4F3B4',       // Versión clara del secondary
  secondaryDark: '#8DD077',        // Versión oscura del secondary

  accent: '#87ff65',               // Verde neón brillante
  accentLight: '#A5FF8A',          // Versión clara del accent
  accentDark: '#6FE04D',           // Versión oscura del accent

  // ===== UI Elements =====
  border: '#E8E8EE',               // Borde suave neutral (tinte de #bbbac6)
  borderMuted: '#bbbac6',          // Borde más visible
  cardBackground: '#FFFFFF',       // Blanco puro para cards
  cardBackgroundAlt: '#FAFAFA',    // Blanco alternativo

  // ===== Estados del Timer =====
  // WORK = Verde neón (energía, acción)
  work: '#87ff65',
  workDark: '#6FE04D',
  workTint: 'rgba(135, 255, 101, 0.12)',

  // REST = Verde pastel (relajación, recuperación)
  rest: '#aceb98',
  restDark: '#8DD077',
  restTint: 'rgba(172, 235, 152, 0.12)',

  // PREPARE = Azul violeta (preparación, enfoque)
  prepare: '#5465ff',
  prepareTint: 'rgba(84, 101, 255, 0.12)',

  // ===== Estados Generales =====
  success: '#87ff65',              // Verde neón para éxito
  warning: '#aceb98',              // Verde pastel para advertencias
  error: '#FF6B8A',                // Rosa/rojo suave para errores
  info: '#5465ff',                 // Azul violeta para información

  // ===== Gradientes =====
  gradientPrimary: ['#5465ff', '#7C89FF'],
  gradientSuccess: ['#87ff65', '#aceb98'],
  gradientDark: ['#030027', '#1A1A3E'],
};

export type ColorKeys = keyof typeof colors;

/**
 * Utilidades de color
 */
export const getColorWithOpacity = (color: string, opacity: number): string => {
  // Convierte hex a rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
