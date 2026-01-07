# 💳 RevenueCat IAP Implementation Guide

## ✅ Estado: Implementado - Listo para Configuración

La integración completa de In-App Purchases (IAP) con RevenueCat ha sido implementada en Pulse HIIT.

---

## 📦 Archivos Implementados

### Nuevos Archivos:
1. **`/src/services/revenueCat.ts`** - Service layer para RevenueCat
   - Inicialización del SDK
   - Funciones de compra y restauración
   - Verificación de premium status
   - Manejo de entitlements

2. **`/docs/REVENUECAT_IAP_GUIDE.md`** - Esta guía completa

### Archivos Modificados:
1. **`/src/hooks/usePremium.ts`** - Actualizado para usar RevenueCat
2. **`/package.json`** - Agregado `react-native-purchases@^9.6.13`
3. **`/.env.example`** - Agregadas keys de RevenueCat

---

## 🎯 ¿Por qué RevenueCat?

### Ventajas sobre react-native-iap directo:

✅ **Backend serverless** - No necesitas crear tu propio servidor
✅ **Cross-platform** - Mismo código para iOS y Android
✅ **Webhooks** - Notificaciones automáticas de eventos
✅ **Analytics** - Dashboard con métricas de revenue
✅ **A/B Testing** - Test de precios sin actualizar la app
✅ **Subscriber management** - Gestión fácil de usuarios
✅ **Free tier** - Gratis hasta $10k/mes en revenue
✅ **Trial ofertas** - Manejo automático de free trials

---

## 🚀 Paso 1: Configurar RevenueCat

### 1.1 Crear Cuenta

1. Ve a [app.revenuecat.com](https://app.revenuecat.com/)
2. Sign up (es gratis)
3. Crea un nuevo proyecto "Pulse HIIT"

### 1.2 Obtener API Keys

1. En RevenueCat Dashboard → **Project Settings** → **API Keys**
2. Copia las keys:
   - **iOS**: Apple App Store key
   - **Android**: Google Play Store key

3. Agrégalas a tu `.env`:
```bash
cp .env.example .env

# Editar .env
EXPO_PUBLIC_REVENUECAT_IOS_KEY=appl_xxxxxxxxxxxxx
EXPO_PUBLIC_REVENUECAT_ANDROID_KEY=goog_xxxxxxxxxxxxx
```

---

## 📱 Paso 2: Configurar App Store Connect (iOS)

### 2.1 Crear App en App Store Connect

1. Ve a [appstoreconnect.apple.com](https://appstoreconnect.apple.com/)
2. **My Apps** → **+** → **New App**
3. Información básica:
   - **Platform**: iOS
   - **Name**: Pulse HIIT
   - **Primary Language**: English
   - **Bundle ID**: `com.equiroz.pulsehiit` (debe coincidir con app.json)
   - **SKU**: `pulse-hiit` (cualquier ID único)
   - **User Access**: Full Access

### 2.2 Crear In-App Purchases

1. En tu app → **In-App Purchases** → **+**
2. Crear 3 productos:

#### Producto 1: Monthly Subscription
```
Type: Auto-Renewable Subscription
Reference Name: Premium Monthly
Product ID: com.equiroz.pulsehiit.premium.monthly
Subscription Group: Premium Access

Subscription Duration: 1 Month
Price: $3.99 USD

Localization (English):
- Display Name: Premium Monthly
- Description: Unlock all premium features with monthly billing
```

#### Producto 2: Annual Subscription
```
Type: Auto-Renewable Subscription
Reference Name: Premium Annual
Product ID: com.equiroz.pulsehiit.premium.annual
Subscription Group: Premium Access

Subscription Duration: 1 Year
Price: $29.99 USD

Localization (English):
- Display Name: Premium Annual
- Description: Save 37%! Unlock all premium features with annual billing
```

#### Producto 3: Lifetime Purchase
```
Type: Non-Consumable
Reference Name: Premium Lifetime
Product ID: com.equiroz.pulsehiit.premium.lifetime

Price: $79.99 USD

Localization (English):
- Display Name: Premium Lifetime
- Description: One-time payment for lifetime access to all premium features
```

### 2.3 Configurar Paid Applications Agreement

1. **Agreements, Tax, and Banking**
2. Complete el **Paid Applications Agreement**
3. Agregar información bancaria
4. Agregar información de impuestos

### 2.4 Configurar Subscription Group (solo para subscriptions)

1. En **Subscription Groups** → **Premium Access**
2. Configurar **Subscription Management**:
   - Upgrade/Downgrade behavior
   - Grace period (opcional)
   - Free trial eligibility

---

## 🤖 Paso 3: Configurar Google Play Console (Android)

### 3.1 Crear App en Play Console

1. Ve a [play.google.com/console](https://play.google.com/console/)
2. **Create app**
3. Información básica:
   - **App name**: Pulse HIIT
   - **Default language**: English (United States)
   - **App or game**: App
   - **Free or paid**: Free
   - **Developer Program Policies**: Accept

### 3.2 Crear In-App Products

1. **Monetize** → **In-app products** → **Create product**
2. Crear 3 productos:

#### Producto 1: Monthly Subscription
```
Product ID: premium_monthly
Name: Premium Monthly
Description: Unlock all premium features with monthly billing
Status: Active

Pricing:
- United States: $3.99
- (Copiar a otros países)

Subscription options:
- Billing period: 1 month
- Free trial: 7 days (opcional)
- Grace period: 3 days (recomendado)
```

#### Producto 2: Annual Subscription
```
Product ID: premium_annual
Name: Premium Annual
Description: Save 37%! Unlock all premium features with annual billing
Status: Active

Pricing:
- United States: $29.99
- (Copiar a otros países)

Subscription options:
- Billing period: 1 year
- Free trial: 7 days (opcional)
- Grace period: 3 days (recomendado)
```

#### Producto 3: Lifetime Purchase
```
Type: Managed product (one-time purchase)
Product ID: premium_lifetime
Name: Premium Lifetime
Description: One-time payment for lifetime access to all premium features
Status: Active

Pricing:
- United States: $79.99
- (Copiar a otros países)
```

### 3.3 Configurar Merchant Account

1. **Monetize** → **Setup** → **Payments profile**
2. Vincular cuenta de Google Merchant
3. Completar información bancaria

---

## 🔗 Paso 4: Conectar RevenueCat con las Stores

### 4.1 Conectar App Store (iOS)

1. RevenueCat Dashboard → **Project Settings** → **Apps**
2. **+ New** → **App Store**
3. Configurar:
   - **App Name**: Pulse HIIT iOS
   - **Bundle ID**: `com.equiroz.pulsehiit`
   - **Shared Secret**: (desde App Store Connect)

#### Obtener Shared Secret:
1. App Store Connect → Tu App → **App Information**
2. Scroll down → **App-Specific Shared Secret** → **Manage**
3. **Generate** (si no existe)
4. Copiar y pegar en RevenueCat

### 4.2 Conectar Google Play (Android)

1. RevenueCat Dashboard → **Project Settings** → **Apps**
2. **+ New** → **Google Play Store**
3. Configurar:
   - **App Name**: Pulse HIIT Android
   - **Package Name**: `com.equiroz.pulsehiit`
   - **Service Account Credentials**: (JSON file)

#### Obtener Service Account Credentials:
1. Google Play Console → **Setup** → **API access**
2. **Create new service account** → Follow Google Cloud link
3. Create service account → Download JSON key
4. Upload JSON en RevenueCat

---

## 🎁 Paso 5: Configurar Productos en RevenueCat

### 5.1 Crear Entitlement

1. RevenueCat Dashboard → **Entitlements**
2. **+ New Entitlement**
3. Configurar:
   - **Identifier**: `premium`
   - **Display Name**: Premium Access
   - **Description**: Access to all premium features

### 5.2 Crear Offerings

1. RevenueCat Dashboard → **Offerings**
2. **+ New Offering** → **Current Offering**
3. Configurar paquetes:

#### Package 1: Monthly
```
Identifier: $rc_monthly
Attached Products:
- iOS: com.equiroz.pulsehiit.premium.monthly
- Android: premium_monthly
```

#### Package 2: Annual
```
Identifier: $rc_annual
Attached Products:
- iOS: com.equiroz.pulsehiit.premium.annual
- Android: premium_annual
```

#### Package 3: Lifetime
```
Identifier: $rc_lifetime
Attached Products:
- iOS: com.equiroz.pulsehiit.premium.lifetime
- Android: premium_lifetime
```

### 5.3 Asignar Entitlements

Para cada package, asignar el entitlement `premium`.

---

## 💻 Paso 6: Código de la App (Ya Implementado)

### 6.1 Estructura de Archivos

```
src/
├── services/
│   └── revenueCat.ts          ← Service layer
├── hooks/
│   └── usePremium.ts          ← React hook (actualizado)
└── screens/
    └── PaywallScreen.tsx       ← UI (ya funciona)
```

### 6.2 Uso del Hook

```typescript
import { usePremium } from '../hooks/usePremium';

const MyComponent = () => {
  const {
    isPremium,           // boolean - user has premium?
    loading,             // boolean - loading state
    purchasing,          // boolean - purchase in progress
    offerings,           // PurchasesOffering | null
    purchasePackage,     // (pkg: PurchasesPackage) => Promise
    restorePurchases,    // () => Promise
    getPackage,          // (type) => PurchasesPackage | null
  } = usePremium();

  const handlePurchase = async () => {
    const annualPkg = getPackage('annual');
    if (annualPkg) {
      await purchasePackage(annualPkg);
    }
  };

  return (
    <View>
      {isPremium ? (
        <Text>You are premium!</Text>
      ) : (
        <Button title="Buy Premium" onPress={handlePurchase} />
      )}
    </View>
  );
};
```

### 6.3 Integración con Auth

Cuando un usuario inicia sesión, identifica el usuario en RevenueCat:

```typescript
import { useAuth } from '../hooks/useAuth';
import { usePremium } from '../hooks/usePremium';

const { user } = useAuth();
const { identifyUser } = usePremium();

useEffect(() => {
  if (user?.id) {
    identifyUser(user.id);
  }
}, [user]);
```

---

## 🧪 Paso 7: Testing

### 7.1 Sandbox Testing (iOS)

1. **Crear Sandbox Tester**:
   - App Store Connect → **Users and Access** → **Sandbox Testers**
   - **+** → Crear tester con email único
   - **NO** uses un email real que tenga Apple ID

2. **Configurar dispositivo**:
   - iOS Settings → **App Store** → **Sandbox Account**
   - Sign in con sandbox tester

3. **Probar compra**:
   - Build la app con EAS
   - Abrir PaywallScreen
   - Comprar producto
   - Usar password del sandbox tester

### 7.2 Test Tracks (Android)

1. **Crear Internal Testing Track**:
   - Play Console → **Testing** → **Internal testing**
   - **Create new release**
   - Upload APK/AAB (build con EAS)

2. **Agregar testers**:
   - **Testers** → **Create email list**
   - Agregar emails de testers

3. **License testing**:
   - Play Console → **Setup** → **License testing**
   - Agregar email de test → **License response**: Respond normally

4. **Probar compra**:
   - Instalar app desde Internal Testing track
   - Comprar producto
   - La compra será simulada (no se cobrará)

### 7.3 RevenueCat Sandbox

RevenueCat automáticamente detecta sandbox purchases y las muestra en el dashboard con etiqueta "Sandbox".

---

## 📊 Paso 8: Verificación en Dashboard

### 8.1 Verificar Compra en RevenueCat

1. RevenueCat Dashboard → **Customers**
2. Buscar por App User ID
3. Verificar:
   - **Entitlements**: debe mostrar "premium" activo
   - **Subscriptions**: debe mostrar el producto comprado
   - **Purchase history**: debe mostrar la transacción

### 8.2 Verificar en App Store Connect (iOS)

1. App Store Connect → Tu App → **TestFlight**
2. **Sandbox Testers** → Ver transacciones

### 8.3 Verificar en Play Console (Android)

1. Play Console → **Order management**
2. Ver transacciones de test

---

## 🚨 Troubleshooting

### Error: "No offerings found"

**Causa**: RevenueCat no puede cargar productos de las stores.

**Solución**:
1. Verificar que los productos estén **Approved** en App Store Connect
2. Verificar que los productos estén **Active** en Play Console
3. Verificar que los Product IDs coincidan exactamente
4. Wait 24 horas después de crear productos (Apple requirement)
5. Verificar shared secret / service account credentials

### Error: "Unable to purchase"

**Causa**: Múltiples causas posibles.

**Solución**:
1. Verificar que estás en sandbox mode (iOS)
2. Verificar que el tester está signed in (iOS Settings)
3. Verificar que la app está en Internal Testing (Android)
4. Verificar que el producto no está en grace period
5. Check RevenueCat logs en Dashboard

### Error: "Receipt validation failed"

**Causa**: Configuración incorrecta de shared secret o service account.

**Solución**:
1. Regenerar shared secret en App Store Connect
2. Actualizar en RevenueCat Dashboard
3. Re-upload service account JSON (Android)
4. Esperar 15 minutos para propagación

### "Premium not unlocking after purchase"

**Causa**: Entitlement no configurado correctamente.

**Solución**:
1. Verificar en RevenueCat → Offerings
2. Cada package debe tener el entitlement `premium` attached
3. Force refresh: call `checkPremiumStatus()` manually

---

## 🔐 Seguridad

### ✅ Buenas Prácticas Implementadas:

1. **Server-side validation**: RevenueCat valida receipts server-side
2. **No hardcoded keys**: API keys en .env
3. **Entitlements**: Lógica de acceso basada en entitlements, no productos
4. **Offline support**: Fallback a AsyncStorage si RevenueCat falla
5. **Error handling**: Try-catch en todas las operaciones

### 🚫 NO hacer:

1. ❌ No confiar solo en `isPremium` local
2. ❌ No exponer RevenueCat API secret key
3. ❌ No validar receipts en el cliente
4. ❌ No hardcodear productos en el código
5. ❌ No olvidar test en sandbox antes de production

---

## 📈 Analytics & Webhooks

### Webhooks de RevenueCat

RevenueCat puede enviar webhooks a tu backend (Supabase) cuando:
- Usuario compra/renueva subscription
- Usuario cancela subscription
- Subscription expira
- Trial comienza/termina
- Billing issue detected

**Configurar**:
1. RevenueCat → **Integrations** → **Webhooks**
2. URL: `https://your-project.supabase.co/functions/v1/revenuecat-webhook`
3. Events: Select all
4. Implementar Supabase Edge Function para recibir webhooks

### Métricas en Dashboard

RevenueCat Dashboard muestra:
- MRR (Monthly Recurring Revenue)
- Active subscriptions
- Churn rate
- Trial conversion rate
- LTV (Lifetime Value)
- Refund rate

---

## 🎯 Checklist de Pre-Launch

### iOS:
- [ ] Productos creados y **Ready to Submit** en App Store Connect
- [ ] Shared secret configurado en RevenueCat
- [ ] Offerings configuradas en RevenueCat
- [ ] Tested con Sandbox Tester
- [ ] Paid Applications Agreement firmado
- [ ] Banking info completada
- [ ] Build enviado para review

### Android:
- [ ] Productos **Active** en Play Console
- [ ] Service Account configurado en RevenueCat
- [ ] Offerings configuradas en RevenueCat
- [ ] Tested con Internal Testing track
- [ ] Merchant account configurado
- [ ] Banking info completada
- [ ] Build enviado para review

### RevenueCat:
- [ ] Entitlement "premium" creado
- [ ] Current offering configurado
- [ ] Todos los packages asignados a productos
- [ ] Webhooks configurados (opcional)
- [ ] Analytics verificados

### App:
- [ ] `.env` con API keys configurado
- [ ] RevenueCat inicializado en App.tsx
- [ ] PaywallScreen funcional
- [ ] Restore purchases funciona
- [ ] Premium features bloqueadas para free users
- [ ] Testing helpers removidos en producción

---

## 🚀 Despliegue a Producción

### 1. Build Production

```bash
# iOS
eas build --platform ios --profile production

# Android
eas build --platform android --profile production
```

### 2. Submit to Stores

```bash
# iOS
eas submit --platform ios

# Android
eas submit --platform android
```

### 3. Monitorear

1. RevenueCat Dashboard → **Charts**
2. App Store Connect → **Sales and Trends**
3. Play Console → **Statistics**

---

## 💡 Extras Opcionales

### Free Trial

Configurar en App Store Connect / Play Console:
- 7 days free trial típico
- Solo aplica a primera subscription
- Usuario puede cancelar antes del cobro

### Introductory Pricing

Ofrecer descuento a nuevos usuarios:
- "First month $0.99"
- "First 3 months 50% off"
- Configurar en store consoles

### Promotional Offers

Ofrecer descuentos a usuarios existentes:
- Win-back offers (usuarios que cancelaron)
- Upgrade offers (monthly → annual)
- Configurar en RevenueCat Experiments

---

## 📚 Recursos

### Documentación Oficial:
- [RevenueCat Docs](https://docs.revenuecat.com/)
- [React Native Purchases](https://docs.revenuecat.com/docs/reactnative)
- [App Store Connect Guide](https://developer.apple.com/app-store-connect/)
- [Play Console Guide](https://support.google.com/googleplay/android-developer/)

### Útiles:
- [RevenueCat Sandbox Testing](https://docs.revenuecat.com/docs/sandbox)
- [iOS Subscription Guide](https://developer.apple.com/app-store/subscriptions/)
- [Android Subscriptions](https://developer.android.com/google/play/billing/subscriptions)

---

## 🎉 Resumen

✅ **RevenueCat SDK instalado**: `react-native-purchases@^9.6.13`
✅ **Service layer creado**: `src/services/revenueCat.ts`
✅ **Hook actualizado**: `src/hooks/usePremium.ts`
✅ **PaywallScreen compatible**: Ya funciona con RevenueCat
✅ **Documentación completa**: Esta guía
✅ **Testing helpers**: `unlockPremiumForTesting()` disponible

**Estado**: ✅ **Listo para configurar productos y probar**

**Siguiente paso**: Seguir Paso 1 de esta guía para configurar RevenueCat Dashboard

---

*Documentación creada: Enero 2026*
*Versión: 1.0.0*
