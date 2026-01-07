# Guía de Build con EAS - Pulse HIIT

## ✅ Pre-requisitos Completados

- [x] EAS CLI instalado
- [x] Proyecto configurado con EAS (`eas.json`)
- [x] Archivos nativos generados (`ios/` y `android/`)
- [x] Permisos de HealthKit configurados
- [x] Proyecto conectado a Expo (proyecto ID: c6976de9-006d-401c-ad3d-176f3acb0084)

## 🎯 Opciones de Build

### Opción 1: Build con EAS (Recomendado) ☁️

**Ventajas:**
- No requiere Xcode ni macOS para Android
- Builds en la nube de Expo
- Más fácil de configurar
- Funciona desde cualquier sistema operativo

**Desventajas:**
- Requiere cuenta de Expo (gratis para desarrollo)
- Puede tardar más (cola de builds)
- Límite de builds en plan gratuito

### Opción 2: Build Local (Avanzado) 💻

**Ventajas:**
- Builds instantáneos
- Sin límites
- Control total

**Desventajas:**
- Requiere Xcode (macOS) para iOS
- Requiere Android Studio para Android
- Configuración más compleja

---

## 📱 Opción 1: Build con EAS (Paso a Paso)

### 1. Verificar Login en Expo

```bash
# Ver si estás logueado
eas whoami

# Si no estás logueado
eas login
```

### 2. Elegir Plataforma

#### Para iOS (iPhone/iPad)

```bash
# Build de desarrollo (para testing con Health APIs)
eas build --platform ios --profile development
```

**Durante el build te preguntará:**

1. **"Would you like to automatically create an App Store Connect API key?"**
   - Responde: `Yes` (si tienes cuenta de Apple Developer)
   - O: `No` (y sigue el flujo manual)

2. **"Select a device for development"**
   - Conecta tu iPhone físico por USB
   - O registra el UDID manualmente

3. **"Generate a new Apple Distribution Certificate?"**
   - Responde: `Yes` (EAS lo manejará automáticamente)

#### Para Android

```bash
# Build de desarrollo (APK)
eas build --platform android --profile development
```

**Más simple que iOS:**
- No requiere certificados complejos
- Genera un APK que puedes instalar directamente

### 3. Esperar el Build

```
⏳ Build en progreso...
📦 Descargará dependencias
🔨 Compilará el código nativo
📱 Generará el archivo instalable
```

**Tiempo estimado:**
- iOS: 15-25 minutos
- Android: 10-20 minutos

### 4. Descargar e Instalar

Una vez completado, EAS te dará un **link de descarga**.

**iOS:**
1. Abre el link en tu iPhone
2. Descarga el perfil de instalación
3. Ve a Ajustes → General → VPN y Administración de Dispositivos
4. Confía en el perfil
5. Instala la app

**Android:**
1. Descarga el APK desde el link
2. Habilita "Instalar apps desconocidas" para tu navegador
3. Abre el APK y instala

---

## 💻 Opción 2: Build Local (Si tienes Xcode)

### Para iOS (solo macOS)

```bash
# 1. Asegúrate de tener CocoaPods instalado
sudo gem install cocoapods

# 2. Instala las dependencias de iOS
cd ios
pod install
cd ..

# 3. Abre el proyecto en Xcode
open ios/PulseHIIT.xcworkspace

# 4. En Xcode:
# - Conecta tu iPhone por USB
# - Selecciona tu iPhone como destino
# - Ve a Signing & Capabilities
# - Selecciona tu Team (cuenta de Apple Developer)
# - Presiona ▶️ Run
```

**Importante en Xcode:**
- Verifica que "HealthKit" aparezca en Capabilities
- Asegúrate que el Bundle ID sea único: `com.equiroz.pulsehiit`
- Confía en el certificado en tu iPhone (Ajustes → General → Gestión de dispositivos)

### Para Android (cualquier OS)

```bash
# 1. Asegúrate de tener Android Studio instalado

# 2. Conecta tu dispositivo Android por USB
# Habilita Depuración USB en Configuración → Opciones de desarrollador

# 3. Ejecuta el build
npx react-native run-android

# O si prefieres desde Android Studio:
# - Abre la carpeta /android en Android Studio
# - Sync Gradle
# - Presiona Run
```

---

## 🧪 Verificación Post-Build

### 1. Primera ejecución

Al abrir la app por primera vez:

1. La app iniciará normalmente
2. Ve a **Ajustes** (Settings)
3. Activa el toggle **"Sincronización de Salud"**
4. iOS: Aparecerá diálogo de permisos de Health
5. Android: Te redirigirá a Health Connect

### 2. Otorgar Permisos

**iOS - Apple Health:**
```
Pulse HIIT quiere acceder a datos de Health
└─ High Intensity Interval Training ✓
└─ Active Energy Burned ✓
└─ Workouts ✓
```
Presiona **"Permitir"**

**Android - Health Connect:**
```
Pulse HIIT necesita permisos
└─ Leer sesiones de ejercicio ✓
└─ Escribir sesiones de ejercicio ✓
└─ Calorías activas quemadas ✓
```
Presiona **"Permitir"**

### 3. Probar un Workout

1. Vuelve a **Home**
2. Inicia un workout (puede ser corto, 1-2 rounds)
3. Complétalo
4. Abre **Apple Health** o **Health Connect**
5. Busca en **Workouts** o **Ejercicio**
6. ✅ Deberías ver tu sesión HIIT

---

## 🐛 Troubleshooting

### Error: "No devices registered"

**iOS:**
```bash
# Registrar tu iPhone manualmente
eas device:create
```

Sigue las instrucciones para registrar el UDID de tu dispositivo.

### Error: "HealthKit capability not found"

Solución:
1. Abre `ios/PulseHIIT.xcworkspace` en Xcode
2. Ve a tu target → Signing & Capabilities
3. Click en `+ Capability`
4. Busca y agrega **HealthKit**
5. Guarda y haz rebuild

### Error: "Health sync not available"

- **iOS:** Solo funciona en dispositivos físicos (no simulador)
- **Android:** Verifica que Health Connect esté instalado
  ```bash
  # Instalar Health Connect desde Play Store
  adb shell am start -a android.intent.action.VIEW \
    -d 'market://details?id=com.google.android.apps.healthdata'
  ```

### Error de Compilación

```bash
# Limpiar todo y empezar de nuevo
rm -rf node_modules ios/Pods ios/build android/build
npm install
cd ios && pod install && cd ..
npx expo prebuild --clean
```

Luego intenta el build nuevamente.

---

## 📊 Costos y Límites

### Expo EAS (Plan Gratuito)
- **iOS:** 1 build concurrente, ~30 builds/mes
- **Android:** 1 build concurrente, ~30 builds/mes
- **Storage:** 1GB para artifacts

### Apple Developer Program
- **Costo:** $99 USD/año
- **Necesario para:** Distribución en App Store, TestFlight
- **NO necesario para:** Testing en tu propio dispositivo (cuenta gratuita de Apple ID funciona)

### Google Play Developer
- **Costo:** $25 USD (pago único)
- **Necesario para:** Publicar en Play Store
- **NO necesario para:** Testing (APK directa)

---

## 🚀 Comandos Rápidos de Referencia

```bash
# Build iOS con EAS
eas build --platform ios --profile development

# Build Android con EAS
eas build --platform android --profile development

# Ver estado de builds
eas build:list

# Cancelar build en curso
eas build:cancel

# Ver builds en dashboard
eas build:view

# Build local iOS (requiere macOS + Xcode)
open ios/PulseHIIT.xcworkspace

# Build local Android
npx react-native run-android
```

---

## 📞 Ayuda Adicional

### Documentación Oficial
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [Configurar iOS](https://docs.expo.dev/build/setup/)
- [Configurar Android](https://docs.expo.dev/build-reference/android-builds/)

### Logs y Debug
```bash
# Ver logs del build
eas build:view --logs

# Ver todos tus builds
eas build:list --limit 20
```

### Dashboard
https://expo.dev/accounts/equiroz/projects/pulse-hiit/builds

---

## ✅ Checklist Final

Antes de considerar el build exitoso:

- [ ] App se instala correctamente en el dispositivo
- [ ] App abre sin crashes
- [ ] Puedes navegar entre pantallas
- [ ] Toggle de Health Sync aparece en Settings
- [ ] Al activar Health Sync, aparece diálogo de permisos
- [ ] Puedes completar un workout
- [ ] El workout aparece en Apple Health / Health Connect
- [ ] Los datos del workout son correctos (duración, tipo, fecha)

---

**¿Listo para hacer el build?** Ejecuta:

```bash
eas build --platform ios --profile development
```

¡Buena suerte! 🚀
