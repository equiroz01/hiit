/**
 * Script para generar variantes del logo de Pulse HIIT
 * con la paleta de colores del tema
 *
 * Uso: node scripts/generateLogoVariants.js
 *
 * Genera 4 variantes en assets/logo-variants/
 */

const fs = require('fs');
const path = require('path');

// Colores del tema Pulse HIIT
const colors = {
  primary: '#5465ff',
  dark: '#030027',
  accent: '#87ff65',
  secondary: '#aceb98',
};

// Directorio de salida
const outputDir = path.join(__dirname, '..', 'assets', 'logo-variants');

// Crear directorio si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

/**
 * Genera SVG del logo base (pulso + flecha circular)
 */
function generateLogoSVG(variant) {
  const configs = {
    variant1: {
      name: 'gradient-primary-accent',
      description: 'Gradiente Primary → Accent (Moderno)',
      background: colors.dark,
      useGradient: true,
      gradientStart: colors.primary,
      gradientEnd: colors.accent,
    },
    variant2: {
      name: 'dual-work-rest',
      description: 'WORK (verde) + REST (verde pastel)',
      background: colors.dark,
      pulseColor: colors.accent,
      arrowColor: colors.secondary,
    },
    variant3: {
      name: 'primary-glow',
      description: 'Primary con Glow Accent (Premium)',
      background: colors.dark,
      mainColor: colors.primary,
      glowColor: colors.accent,
      useGlow: true,
    },
    variant4: {
      name: 'accent-shadow',
      description: 'Accent con sombra Primary (Energético)',
      background: colors.dark,
      mainColor: colors.accent,
      shadowColor: colors.primary,
      useShadow: true,
    },
  };

  const config = configs[variant];

  let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>`;

  // Gradiente si se usa
  if (config.useGradient) {
    svg += `
    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${config.gradientStart};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${config.gradientEnd};stop-opacity:1" />
    </linearGradient>`;
  }

  // Filtro de glow si se usa
  if (config.useGlow) {
    svg += `
    <filter id="glow">
      <feGaussianBlur stdDeviation="12" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>`;
  }

  // Sombra si se usa
  if (config.useShadow) {
    svg += `
    <filter id="shadow">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="${config.shadowColor}" flood-opacity="0.5"/>
    </filter>`;
  }

  svg += `
  </defs>

  <!-- Fondo con esquinas redondeadas (1024x1024 para icon.png) -->
  <rect width="1024" height="1024" rx="226" ry="226" fill="${config.background}"/>

  <!-- Grupo del logo -->
  <g transform="translate(512, 512)">`;

  // Aplicar filtros según configuración
  let filterAttr = '';
  if (config.useGlow) filterAttr = ' filter="url(#glow)"';
  if (config.useShadow) filterAttr = ' filter="url(#shadow)"';

  // Determinar color del stroke
  let strokeColor;
  if (config.useGradient) {
    strokeColor = 'url(#logoGradient)';
  } else if (config.pulseColor) {
    // Dual color - pulse usa un color
    strokeColor = config.pulseColor;
  } else {
    strokeColor = config.mainColor;
  }

  // Pulso cardíaco (heartbeat)
  svg += `
    <!-- Pulso cardíaco -->
    <path d="M -200 0 L -80 0 L -20 -80 L 40 80 L 100 -40 L 160 0 L 280 0"
          stroke="${strokeColor}"
          stroke-width="32"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="none"${filterAttr}/>`;

  // Flecha circular (puede ser diferente color en dual-color)
  let arrowStroke = strokeColor;
  if (config.arrowColor) {
    arrowStroke = config.arrowColor;
  }

  svg += `

    <!-- Círculo con flecha (representa ciclo HIIT) -->
    <path d="M 0 -320 A 320 320 0 1 1 -8 -320"
          stroke="${arrowStroke}"
          stroke-width="32"
          stroke-linecap="round"
          fill="none"${filterAttr}/>

    <!-- Punta de flecha -->
    <path d="M -8 -320 L 40 -280 L -8 -240"
          fill="${arrowStroke}"${filterAttr}/>
  </g>
</svg>`;

  return { svg, config };
}

/**
 * Guarda SVG y genera preview README
 */
function saveVariant(variant) {
  const { svg, config } = generateLogoSVG(variant);

  // Guardar SVG
  const svgPath = path.join(outputDir, `${config.name}.svg`);
  fs.writeFileSync(svgPath, svg);

  console.log(`✅ Generado: ${config.name}.svg`);
  console.log(`   ${config.description}`);

  return config;
}

// Generar todas las variantes
console.log('\n🎨 Generando variantes del logo de Pulse HIIT...\n');

const variants = ['variant1', 'variant2', 'variant3', 'variant4'];
const configs = variants.map(saveVariant);

// Crear README con previews
const readmeContent = `# 🎨 Logo Variants - Pulse HIIT

Variantes del logo generadas con la paleta de colores del tema.

## Colores del Tema

- **Primary:** \`${colors.primary}\` (Azul violeta)
- **Dark:** \`${colors.dark}\` (Azul oscuro profundo)
- **Accent:** \`${colors.accent}\` (Verde neón energético)
- **Secondary:** \`${colors.secondary}\` (Verde pastel relajante)

---

## Variantes Generadas

${configs.map((config, i) => `
### ${i + 1}. ${config.description}

**Archivo:** \`${config.name}.svg\`

**Configuración:**
\`\`\`
Fondo: ${config.background}
${config.useGradient ? `Gradiente: ${config.gradientStart} → ${config.gradientEnd}` : ''}
${config.pulseColor ? `Pulso: ${config.pulseColor}` : ''}
${config.arrowColor ? `Flecha: ${config.arrowColor}` : ''}
${config.mainColor ? `Color principal: ${config.mainColor}` : ''}
${config.glowColor ? `Glow: ${config.glowColor}` : ''}
${config.shadowColor ? `Sombra: ${config.shadowColor}` : ''}
\`\`\`

**Mejor para:** ${getUsageRecommendation(config)}

---
`).join('\n')}

## 🛠️ Uso

1. Revisa los archivos SVG en esta carpeta
2. Elige tu variante favorita
3. Convierte a PNG (1024x1024) usando:
   - [SVGOMG](https://jakearchibald.github.io/svgomg/)
   - [CloudConvert](https://cloudconvert.com/svg-to-png)
   - Photoshop/Figma/Sketch
4. Reemplaza \`assets/icon.png\` con tu variante elegida
5. Regenera los assets con \`npx expo prebuild --clean\`

## 📱 Adaptive Icon (Android)

Para el adaptive icon, usa la versión sin fondo:
- El símbolo debe ser transparente o blanco
- El fondo se configura en \`app.json\` → \`android.adaptiveIcon.backgroundColor\`
- Actualmente: \`${colors.dark}\`

## 🎨 Personalización

Para generar nuevas variantes, edita:
\`\`\`
scripts/generateLogoVariants.js
\`\`\`

Luego ejecuta:
\`\`\`bash
node scripts/generateLogoVariants.js
\`\`\`

---

**Generado:** ${new Date().toLocaleString('es-ES')}
**Script:** \`scripts/generateLogoVariants.js\`
`;

fs.writeFileSync(path.join(outputDir, 'README.md'), readmeContent);

console.log('\n📄 Generado: README.md con descripción de variantes');
console.log(`\n✨ Todas las variantes guardadas en: ${outputDir}\n`);

/**
 * Obtiene recomendación de uso para cada variante
 */
function getUsageRecommendation(config) {
  if (config.useGradient) {
    return 'App moderna y profesional, atrae usuarios jóvenes';
  }
  if (config.pulseColor && config.arrowColor) {
    return 'Representa visualmente el concepto HIIT (trabajo/descanso)';
  }
  if (config.useGlow) {
    return 'Premium, tech-forward, destaca en App Store';
  }
  if (config.useShadow) {
    return 'Máxima energía, fitness intenso, llamativo';
  }
  return 'Uso general';
}
