const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ASSETS_DIR = path.join(__dirname, '..', 'assets');

// Colores de Pulse HIIT
const COLORS = {
  background: '#F7F8FA',
  primary: '#7CFF4F',
  text: '#1E2227',
  dark: '#1E2227',
};

// Crear SVG del icono (timer con pulso)
const createIconSVG = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${COLORS.dark};stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2A2F36;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="url(#bgGrad)"/>

  <!-- Timer circle -->
  <circle
    cx="${size / 2}"
    cy="${size / 2}"
    r="${size * 0.32}"
    fill="none"
    stroke="${COLORS.primary}"
    stroke-width="${size * 0.04}"
    stroke-linecap="round"
    stroke-dasharray="${size * 1.6} ${size * 0.5}"
    transform="rotate(-90 ${size / 2} ${size / 2})"
  />

  <!-- Inner pulse/heart beat line -->
  <polyline
    points="${size * 0.28},${size / 2} ${size * 0.38},${size / 2} ${size * 0.44},${size * 0.35} ${size * 0.50},${size * 0.65} ${size * 0.56},${size * 0.42} ${size * 0.62},${size / 2} ${size * 0.72},${size / 2}"
    fill="none"
    stroke="${COLORS.primary}"
    stroke-width="${size * 0.035}"
    stroke-linecap="round"
    stroke-linejoin="round"
  />

  <!-- Play triangle accent -->
  <polygon
    points="${size * 0.42},${size * 0.70} ${size * 0.42},${size * 0.82} ${size * 0.54},${size * 0.76}"
    fill="${COLORS.primary}"
  />
</svg>
`;

// Crear SVG del splash screen
const createSplashSVG = (width, height) => `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="${width}" height="${height}" fill="${COLORS.background}"/>

  <!-- Timer icon (smaller, centered above text) -->
  <g transform="translate(${width / 2 - 60}, ${height / 2 - 140})">
    <circle
      cx="60"
      cy="60"
      r="50"
      fill="none"
      stroke="${COLORS.primary}"
      stroke-width="6"
      stroke-linecap="round"
      stroke-dasharray="250 80"
      transform="rotate(-90 60 60)"
    />
    <polyline
      points="30,60 42,60 50,40 60,80 70,50 78,60 90,60"
      fill="none"
      stroke="${COLORS.primary}"
      stroke-width="5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </g>

  <!-- App name -->
  <text
    x="${width / 2}"
    y="${height / 2 + 20}"
    font-family="system-ui, -apple-system, sans-serif"
    font-size="48"
    font-weight="800"
    fill="${COLORS.text}"
    text-anchor="middle"
  >Pulse HIIT</text>

  <!-- Tagline -->
  <text
    x="${width / 2}"
    y="${height / 2 + 60}"
    font-family="system-ui, -apple-system, sans-serif"
    font-size="18"
    font-weight="500"
    fill="#6B7280"
    text-anchor="middle"
  >Interval Timer</text>
</svg>
`;

// Crear SVG del adaptive icon (foreground)
const createAdaptiveIconSVG = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- Transparent background for adaptive icon -->
  <rect width="${size}" height="${size}" fill="transparent"/>

  <!-- Timer circle - centered with safe zone padding -->
  <circle
    cx="${size / 2}"
    cy="${size / 2}"
    r="${size * 0.28}"
    fill="none"
    stroke="${COLORS.primary}"
    stroke-width="${size * 0.035}"
    stroke-linecap="round"
    stroke-dasharray="${size * 1.4} ${size * 0.45}"
    transform="rotate(-90 ${size / 2} ${size / 2})"
  />

  <!-- Inner pulse/heart beat line -->
  <polyline
    points="${size * 0.32},${size / 2} ${size * 0.40},${size / 2} ${size * 0.45},${size * 0.38} ${size * 0.50},${size * 0.62} ${size * 0.55},${size * 0.44} ${size * 0.60},${size / 2} ${size * 0.68},${size / 2}"
    fill="none"
    stroke="${COLORS.primary}"
    stroke-width="${size * 0.03}"
    stroke-linecap="round"
    stroke-linejoin="round"
  />

  <!-- Play triangle accent -->
  <polygon
    points="${size * 0.44},${size * 0.66} ${size * 0.44},${size * 0.76} ${size * 0.54},${size * 0.71}"
    fill="${COLORS.primary}"
  />
</svg>
`;

async function generateAssets() {
  console.log('Generating Pulse HIIT assets...\n');

  // Ensure assets directory exists
  if (!fs.existsSync(ASSETS_DIR)) {
    fs.mkdirSync(ASSETS_DIR, { recursive: true });
  }

  try {
    // Generate main icon (1024x1024)
    console.log('Creating icon.png (1024x1024)...');
    await sharp(Buffer.from(createIconSVG(1024)))
      .png()
      .toFile(path.join(ASSETS_DIR, 'icon.png'));

    // Generate adaptive icon foreground (1024x1024)
    console.log('Creating adaptive-icon.png (1024x1024)...');
    await sharp(Buffer.from(createAdaptiveIconSVG(1024)))
      .png()
      .toFile(path.join(ASSETS_DIR, 'adaptive-icon.png'));

    // Generate splash screen (1284x2778 - iPhone 14 Pro Max size)
    console.log('Creating splash-icon.png (1284x2778)...');
    await sharp(Buffer.from(createSplashSVG(1284, 2778)))
      .png()
      .toFile(path.join(ASSETS_DIR, 'splash-icon.png'));

    // Generate favicon (48x48)
    console.log('Creating favicon.png (48x48)...');
    await sharp(Buffer.from(createIconSVG(192)))
      .resize(48, 48)
      .png()
      .toFile(path.join(ASSETS_DIR, 'favicon.png'));

    console.log('\n✅ All assets generated successfully!');
    console.log(`   Location: ${ASSETS_DIR}`);

  } catch (error) {
    console.error('Error generating assets:', error);
    process.exit(1);
  }
}

generateAssets();
