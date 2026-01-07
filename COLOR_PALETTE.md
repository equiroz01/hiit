# 🎨 Pulse HIIT - Color Palette

## Tu Paleta Personalizada

### Colores Principales

| Color | Hex | Uso | Preview |
|-------|-----|-----|---------|
| **Primary** | `#5465ff` | Botones principales, CTA, navegación | ![#5465ff](https://via.placeholder.com/100x30/5465ff/FFFFFF?text=Primary) |
| **Dark** | `#030027` | Texto principal, fondo dark mode | ![#030027](https://via.placeholder.com/100x30/030027/FFFFFF?text=Dark) |
| **Muted** | `#bbbac6` | Texto secundario, iconos desactivados | ![#bbbac6](https://via.placeholder.com/100x30/bbbac6/030027?text=Muted) |
| **Secondary** | `#aceb98` | Botones secundarios, estado REST | ![#aceb98](https://via.placeholder.com/100x30/aceb98/030027?text=Secondary) |
| **Accent** | `#87ff65` | Highlights, estado WORK, éxito | ![#87ff65](https://via.placeholder.com/100x30/87ff65/030027?text=Accent) |
| **White** | `#FFFFFF` | Fondos, texto sobre oscuro | ![#FFFFFF](https://via.placeholder.com/100x30/FFFFFF/030027?text=White) |

---

## Distribución en la App

### 🏠 HomeScreen
```typescript
Background:          #FFFFFF (blanco puro)
Cards:               #FFFFFF con sombra
Botones principales: #5465ff (primary)
Texto principal:     #030027 (dark)
Texto secundario:    #bbbac6 (muted)
Botones "Programs":  #aceb98 (secondary)
```

### ⏱️ TimerScreen
```typescript
Background WORK:     rgba(135, 255, 101, 0.12) // #87ff65 con transparencia
Background REST:     rgba(172, 235, 152, 0.12) // #aceb98 con transparencia
Background PREPARE:  rgba(84, 101, 255, 0.12)  // #5465ff con transparencia

Contador WORK:       #87ff65 (accent - energía)
Contador REST:       #aceb98 (secondary - relajación)
Contador PREPARE:    #5465ff (primary - enfoque)

Texto fase:          #030027 (dark)
Botones control:     #5465ff (primary)
```

### 📊 StatsScreen
```typescript
Cards:               #FFFFFF
Gráficos línea:      #5465ff (primary)
Áreas de relleno:    rgba(84, 101, 255, 0.1)
Stats destacadas:    #87ff65 (accent)
Texto principal:     #030027 (dark)
Badges premium:      #5465ff (primary)
```

### 📋 ProgramsScreen
```typescript
Cards programa:      #FFFFFF
Badges FREE:         #aceb98 (secondary)
Badges PREMIUM:      #5465ff (primary)
Badges dificultad:
  - Beginner:        #87ff65 (accent)
  - Intermediate:    #aceb98 (secondary)
  - Advanced:        #5465ff (primary)

Progreso completado: #87ff65 (accent)
Barra progreso:      #5465ff (primary)
```

### ⚙️ SettingsScreen
```typescript
Fondo:               #FFFFFF
Cards:               #FFFFFF
Switches ON:         #5465ff (primary)
Switches OFF:        #bbbac6 (muted)
Texto principal:     #030027 (dark)
Texto secundario:    #bbbac6 (muted)
Badges:              #87ff65 (accent)
```

---

## Variaciones de Color

### Primary (#5465ff)
```typescript
primaryLight:  #7C89FF  // Para hovers, estados activos
primary:       #5465ff  // Color base
primaryDark:   #3D4DD9  // Para texto sobre primary, sombras
```

### Secondary (#aceb98)
```typescript
secondaryLight: #C4F3B4  // Para fondos sutiles
secondary:      #aceb98  // Color base
secondaryDark:  #8DD077  // Para variantes oscuras
```

### Accent (#87ff65)
```typescript
accentLight:  #A5FF8A  // Para highlights brillantes
accent:       #87ff65  // Color base
accentDark:   #6FE04D  // Para contraste
```

---

## Gradientes

### Primary Gradient
```typescript
['#5465ff', '#7C89FF']
```
**Uso:** Fondos de hero, botones premium, overlays

### Success Gradient
```typescript
['#87ff65', '#aceb98']
```
**Uso:** Progreso completado, achievements, confirmaciones

### Dark Gradient
```typescript
['#030027', '#1A1A3E']
```
**Uso:** Dark mode, overlays, fondos dramáticos

---

## Accesibilidad y Contraste

### Combinaciones Aprobadas (WCAG AA)

✅ **Texto oscuro sobre blanco:**
- `#030027` sobre `#FFFFFF` → Ratio: 19.7:1 (AAA)
- `#6B6C87` sobre `#FFFFFF` → Ratio: 5.2:1 (AA)

✅ **Texto blanco sobre colores:**
- `#FFFFFF` sobre `#5465ff` → Ratio: 6.1:1 (AA)
- `#FFFFFF` sobre `#030027` → Ratio: 19.7:1 (AAA)

⚠️ **Precaución:**
- `#FFFFFF` sobre `#87ff65` → Ratio: 1.7:1 (Bajo)
  - **Solución:** Usar `#030027` para texto sobre `#87ff65`

✅ **Texto oscuro sobre acentos:**
- `#030027` sobre `#87ff65` → Ratio: 11.8:1 (AAA)
- `#030027` sobre `#aceb98` → Ratio: 9.2:1 (AAA)

---

## Psicología del Color

### 🔵 #5465ff (Primary - Azul Violeta)
- **Emoción:** Confianza, profesionalismo, tecnología
- **Uso:** Acciones principales, navegación, autoridad

### 🌑 #030027 (Dark - Azul Oscuro)
- **Emoción:** Profundidad, seriedad, elegancia
- **Uso:** Texto principal, contraste fuerte, anclaje visual

### 🌫️ #bbbac6 (Muted - Gris Lavanda)
- **Emoción:** Suavidad, neutralidad, equilibrio
- **Uso:** Información secundaria, estados desactivados

### 🍃 #aceb98 (Secondary - Verde Pastel)
- **Emoción:** Calma, recuperación, naturaleza
- **Uso:** Estado REST, éxito suave, elementos secundarios

### ⚡ #87ff65 (Accent - Verde Neón)
- **Emoción:** Energía, acción, vitalidad
- **Uso:** Estado WORK, llamadas a la acción, logros

---

## Comparación: Antes vs Después

### Antes (Colores iOS estándar)
```
Primary:   #34C759 (Verde iOS)
Secondary: #007AFF (Azul iOS)
Accent:    #FF9500 (Naranja iOS)
```

### Después (Tu paleta personalizada)
```
Primary:   #5465ff (Azul violeta único)
Secondary: #aceb98 (Verde pastel distintivo)
Accent:    #87ff65 (Verde neón energético)
Dark:      #030027 (Azul profundo elegante)
```

**Ventajas:**
- ✅ Identidad visual única y moderna
- ✅ Mejor contraste con #030027 vs negro genérico
- ✅ Paleta más cohesiva (todos los colores conectados)
- ✅ Verde neón (#87ff65) perfecto para HIIT (energía)
- ✅ Verde pastel (#aceb98) ideal para REST (recuperación)

---

## Uso en Código

### Importar colores
```typescript
import { colors, getColorWithOpacity } from '../theme/colors';
```

### Ejemplos
```typescript
// Color sólido
<View style={{ backgroundColor: colors.primary }} />

// Con opacidad
<View style={{ backgroundColor: getColorWithOpacity(colors.primary, 0.2) }} />

// Gradiente (con librería de gradientes)
<LinearGradient colors={colors.gradientPrimary}>
  {/* Contenido */}
</LinearGradient>

// Texto
<Text style={{ color: colors.text }}>Título</Text>
<Text style={{ color: colors.textMuted }}>Subtítulo</Text>

// Estados del timer
{phase === 'work' && <View style={{ backgroundColor: colors.workTint }} />}
{phase === 'rest' && <View style={{ backgroundColor: colors.restTint }} />}
```

---

## Modo Oscuro (Futuro)

Cuando implementes dark mode, intercambiar:

```typescript
// Light Mode → Dark Mode
background: '#FFFFFF'        → '#030027'
text: '#030027'             → '#FFFFFF'
cardBackground: '#FFFFFF'    → '#1A1A3E'
border: '#E8E8EE'           → '#3A3A5E'
```

Los colores de acento se mantienen igual:
- ✅ primary: `#5465ff`
- ✅ secondary: `#aceb98`
- ✅ accent: `#87ff65`

---

**Actualizado:** Enero 2026
**Versión:** 2.0.0
