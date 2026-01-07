# 🎨 Logo Variants - Pulse HIIT

Variantes del logo generadas con la paleta de colores del tema.

## Colores del Tema

- **Primary:** `#5465ff` (Azul violeta)
- **Dark:** `#030027` (Azul oscuro profundo)
- **Accent:** `#87ff65` (Verde neón energético)
- **Secondary:** `#aceb98` (Verde pastel relajante)

---

## Variantes Generadas


### 1. Gradiente Primary → Accent (Moderno)

**Archivo:** `gradient-primary-accent.svg`

**Configuración:**
```
Fondo: #030027
Gradiente: #5465ff → #87ff65





```

**Mejor para:** App moderna y profesional, atrae usuarios jóvenes

---


### 2. WORK (verde) + REST (verde pastel)

**Archivo:** `dual-work-rest.svg`

**Configuración:**
```
Fondo: #030027

Pulso: #87ff65
Flecha: #aceb98



```

**Mejor para:** Representa visualmente el concepto HIIT (trabajo/descanso)

---


### 3. Primary con Glow Accent (Premium)

**Archivo:** `primary-glow.svg`

**Configuración:**
```
Fondo: #030027



Color principal: #5465ff
Glow: #87ff65

```

**Mejor para:** Premium, tech-forward, destaca en App Store

---


### 4. Accent con sombra Primary (Energético)

**Archivo:** `accent-shadow.svg`

**Configuración:**
```
Fondo: #030027



Color principal: #87ff65

Sombra: #5465ff
```

**Mejor para:** Máxima energía, fitness intenso, llamativo

---


## 🛠️ Uso

1. Revisa los archivos SVG en esta carpeta
2. Elige tu variante favorita
3. Convierte a PNG (1024x1024) usando:
   - [SVGOMG](https://jakearchibald.github.io/svgomg/)
   - [CloudConvert](https://cloudconvert.com/svg-to-png)
   - Photoshop/Figma/Sketch
4. Reemplaza `assets/icon.png` con tu variante elegida
5. Regenera los assets con `npx expo prebuild --clean`

## 📱 Adaptive Icon (Android)

Para el adaptive icon, usa la versión sin fondo:
- El símbolo debe ser transparente o blanco
- El fondo se configura en `app.json` → `android.adaptiveIcon.backgroundColor`
- Actualmente: `#030027`

## 🎨 Personalización

Para generar nuevas variantes, edita:
```
scripts/generateLogoVariants.js
```

Luego ejecuta:
```bash
node scripts/generateLogoVariants.js
```

---

**Generado:** 3/1/2026, 14:53:50
**Script:** `scripts/generateLogoVariants.js`
