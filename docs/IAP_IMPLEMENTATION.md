# 💎 In-App Purchase (IAP) - Guía de Implementación

## ✅ Estado Actual: INFRAESTRUCTURA COMPLETA

### Implementado

1. **✅ react-native-iap instalado**
2. **✅ Tipos TypeScript creados** (`src/types/index.ts`)
3. **✅ Hook `usePremium` completo** (`src/hooks/usePremium.ts`)
4. **✅ Navegación configurada** (Paywall route agregada)

### Pendiente (Próximos pasos)

1. **Traducciones IAP** - Agregar strings del paywall
2. **PaywallScreen** - Crear UI hermosa
3. **Integrar checks premium** - Limitar features
4. **Configurar stores** - App Store Connect + Play Console

---

## 📱 Product IDs Configurados

```typescript
iOS:
- com.equiroz.pulsehiit.premium.monthly
- com.equiroz.pulsehiit.premium.annual
- com.equiroz.pulsehiit.premium.lifetime

Android:
- premium_monthly
- premium_annual
- premium_lifetime
```

---

## 🎨 Traducciones Necesarias

Agregar a `src/i18n/translations.ts`:

```typescript
// Premium / Paywall
premium: string;
upgradeToPremium: string;
unlockAllFeatures: string;
startFreeTrial: string;
restorePurchases: string;
month: string;
year: string;
oneTime: string;
bestValue: string;
mostPopular: string;
save: string;
perMonth: string;
perYear: string;

// Features
unlimitedPresets: string;
advancedStats: string;
trainingPrograms: string;
exportData: string;
aiCoach: string;
customThemes: string;
communityChallenges: string;
watchIntegration: string;

// Paywall messages
presetLimitTitle: string;
presetLimitMessage: string;
statsLimitTitle: string;
statsLimitMessage: string;

// Subscription status
activeTrial: string;
subscriptionActive: string;
subscriptionExpires: string;
daysRemaining: string;
```

---

## 🚀 Próximos Pasos Detallados

### Paso 1: Completar Traducciones (15 min)

Editar `src/i18n/translations.ts` y agregar los strings arriba en los 5 idiomas.

### Paso 2: Crear PaywallScreen (2-3 horas)

```bash
# Archivo: src/screens/PaywallScreen.tsx
```

**UI debe incluir:**
- ✨ Hero section con valor claro
- 💎 Lista de features premium
- 📊 Pricing cards (Monthly, Annual, Lifetime)
- ✅ Botón CTA grande
- 🔄 Restore purchases link
- ❌ Botón cerrar

**Mockup:**
```
┌─────────────────────────┐
│         [×]             │
│                         │
│  ⭐ Unlock Premium      │
│                         │
│  Get access to:         │
│  ✓ Unlimited presets    │
│  ✓ Full workout history │
│  ✓ Training programs    │
│  ✓ AI Coach             │
│  ✓ Apple Watch app      │
│                         │
│ ┌─────────────────────┐ │
│ │ ⭐ BEST VALUE       │ │
│ │ Annual              │ │
│ │ $29.99/year         │ │
│ │ Save 37%            │ │
│ └─────────────────────┘ │
│                         │
│ ┌─────────────────────┐ │
│ │ Monthly             │ │
│ │ $3.99/month         │ │
│ └─────────────────────┘ │
│                         │
│ ┌─────────────────────┐ │
│ │ Lifetime            │ │
│ │ $79.99 one-time     │ │
│ └─────────────────────┘ │
│                         │
│ [ Start Free Trial ]    │
│   7 days, cancel anytime│
│                         │
│   Restore Purchases     │
└─────────────────────────┘
```

### Paso 3: Integrar en AppNavigator (5 min)

```typescript
// Ya está agregado en tipos!
import { PaywallScreen } from '../screens/PaywallScreen';

<Stack.Screen
  name="Paywall"
  component={PaywallScreen}
  options={{
    presentation: 'modal', // iOS modal
    animation: 'slide_from_bottom',
  }}
/>
```

### Paso 4: Limitar Custom Presets (30 min)

En `PresetsScreen.tsx`:

```typescript
import { usePremium } from '../hooks/usePremium';

const { isPremium } = usePremium();
const customPresets = presets.filter(p => !p.isDefault);
const canAddMore = isPremium || customPresets.length < 3;

const handleAddPreset = () => {
  if (!canAddMore) {
    navigation.navigate('Paywall', { source: 'custom_presets' });
    return;
  }
  // ... crear preset
};

// En UI, mostrar límite
{!isPremium && (
  <Text>{customPresets.length}/3 custom presets</Text>
)}
```

### Paso 5: Limitar Stats (30 min)

En `StatsScreen.tsx`:

```typescript
const { isPremium } = usePremium();
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

const visibleSessions = isPremium
  ? sessions
  : sessions.filter(s => new Date(s.date) >= sevenDaysAgo);

// Mostrar banner
{!isPremium && (
  <TouchableOpacity
    onPress={() => navigation.navigate('Paywall', { source: 'stats_history' })}
  >
    <Text>🔒 Unlock full history with Premium</Text>
  </TouchableOpacity>
)}
```

### Paso 6: Botón Upgrade en Settings (15 min)

En `SettingsScreen.tsx`:

```typescript
const { isPremium, premiumState } = usePremium();

// Arriba de todo
{!isPremium && (
  <TouchableOpacity
    style={styles.premiumBanner}
    onPress={() => navigation.navigate('Paywall', { source: 'settings' })}
  >
    <Text style={styles.premiumTitle}>⭐ Upgrade to Premium</Text>
    <Text style={styles.premiumSubtitle}>
      Unlock all features
    </Text>
  </TouchableOpacity>
)}

// Si es premium, mostrar status
{isPremium && (
  <View style={styles.premiumStatus}>
    <Text>✓ Premium Active</Text>
    {!premiumState.isLifetime && (
      <Text>Expires: {premiumState.expirationDate}</Text>
    )}
  </View>
)}
```

### Paso 7: Configurar App Store Connect (2-3 horas)

**iOS - App Store Connect:**

1. Ir a https://appstoreconnect.apple.com
2. Select Your App → Features → In-App Purchases
3. Crear 3 productos:

**Monthly Subscription:**
- Product ID: `com.equiroz.pulsehiit.premium.monthly`
- Reference Name: "Premium Monthly"
- Subscription Group: "Premium"
- Duration: 1 month
- Price: $3.99
- Localized Title/Description

**Annual Subscription:**
- Product ID: `com.equiroz.pulsehiit.premium.annual`
- Reference Name: "Premium Annual"
- Subscription Group: "Premium"
- Duration: 1 year
- Price: $29.99
- Free Trial: 7 days (opcional)

**Lifetime Purchase:**
- Type: Non-Consumable
- Product ID: `com.equiroz.pulsehiit.premium.lifetime`
- Reference Name: "Premium Lifetime"
- Price: $79.99

4. Submit for review junto con app

### Paso 8: Configurar Google Play Console (2-3 horas)

**Android - Play Console:**

1. Ir a https://play.google.com/console
2. Select Your App → Monetize → Products → Subscriptions
3. Crear 2 suscripciones:

**Monthly:**
- Product ID: `premium_monthly`
- Name: "Premium Monthly"
- Billing period: 1 month
- Price: $3.99
- Free trial: 7 days (opcional)

**Annual:**
- Product ID: `premium_annual`
- Name: "Premium Annual"
- Billing period: 1 year
- Price: $29.99

4. Crear compra única en "In-app products":

**Lifetime:**
- Product ID: `premium_lifetime`
- Name: "Premium Lifetime"
- Price: $79.99

---

## 🧪 Testing

### Testing en Desarrollo

El hook `usePremium` incluye funciones de testing:

```typescript
const {
  unlockPremiumForTesting,
  resetPremiumForTesting
} = usePremium();

// En código temporal o dev menu:
<Button onPress={unlockPremiumForTesting}>
  Unlock Premium (Dev)
</Button>

<Button onPress={resetPremiumForTesting}>
  Reset to Free (Dev)
</Button>
```

### Testing IAP Real

**iOS:**
1. Crear Sandbox Tester en App Store Connect
2. Sign out de App Store en iPhone
3. Run app, intenta comprar
4. Login con sandbox tester cuando pida
5. Compra es gratis en sandbox

**Android:**
1. Agregar cuenta de testing en Play Console
2. Install internal/closed testing build
3. Usar cuenta de testing
4. Compras son gratis para testers

---

## 🔐 Seguridad - Receipt Validation

⚠️ **IMPORTANTE:** Implementación actual NO valida receipts del servidor.

### Producción Requiere:

1. **Backend para validar receipts:**
   ```
   User compra → iOS/Android receipt
   → Enviar a tu servidor
   → Validar con Apple/Google
   → Activar premium en DB
   → Retornar a app
   ```

2. **Servicios recomendados:**
   - RevenueCat (más fácil)
   - Qonversion
   - Custom backend con Apple/Google APIs

3. **Por ahora (MVP):**
   - Confiar en el receipt local
   - Agregar validación server-side después

---

## 📊 Analytics Recomendados

Track estos eventos:

```typescript
// Al mostrar paywall
analytics.track('paywall_viewed', {
  source: 'custom_presets' | 'stats_history' | ...
});

// Al comprar
analytics.track('purchase_completed', {
  product_id: 'premium_monthly',
  price: 3.99,
  currency: 'USD',
});

// Al convertir desde trial
analytics.track('trial_converted', {
  product_id: 'premium_annual',
});

// Al cancelar
analytics.track('subscription_cancelled', {
  reason: '...',
});
```

---

## 🎯 Checklist Pre-Launch

### Código
- [ ] PaywallScreen creada y bonita
- [ ] Traducciones completas (5 idiomas)
- [ ] Custom presets limitados a 3
- [ ] Stats limitadas a 7 días
- [ ] Upgrade button en Settings
- [ ] Paywalls en puntos estratégicos
- [ ] Loading states en compras
- [ ] Error handling robusto

### Stores
- [ ] Productos creados en App Store Connect
- [ ] Productos creados en Google Play Console
- [ ] Precios correctos
- [ ] Descripciones localizadas
- [ ] Screenshots del paywall
- [ ] Privacy policy actualizada (mencionar IAP)

### Testing
- [ ] Sandbox testing iOS exitoso
- [ ] Testing testing Android exitoso
- [ ] Restore purchases funciona
- [ ] Free trial se activa correctamente
- [ ] Subscription renewal automático
- [ ] Lifetime unlock permanente

### Legal
- [ ] Terms of Service actualizados
- [ ] Privacy Policy actualizada
- [ ] Subscription terms claros
- [ ] Refund policy explícita

---

## 🚨 Troubleshooting Común

### "No products available"
- Verifica Product IDs match exactamente
- Espera 2-4 horas después de crear en store
- Signed agreement in App Store Connect
- App version submitted (iOS)

### "Purchase failed"
- Testear con sandbox account
- Verificar permisos en Info.plist
- Check console logs

### "Cannot connect to iTunes Store"
- Solo en simulator, usa device
- Logout/login de App Store
- Restart app

---

## 💡 Tips de Conversión

### Mejores momentos para paywall:

1. **Después de 3er custom preset:**
   - Usuario ya comprometido
   - Entiende el valor

2. **Después de 5 workouts:**
   - Ya formó hábito
   - Quiere ver progreso histórico

3. **Al intentar ver stats antiguas:**
   - Contexto claro
   - Valor obvio

### Mensajes efectivos:

❌ **Malo:** "Upgrade to premium"
✅ **Bueno:** "See your full progress"

❌ **Malo:** "Only $3.99/month"
✅ **Bueno:** "Less than a coffee per month"

❌ **Malo:** "Unlock features"
✅ **Bueno:** "Crush your goals with AI Coach"

---

## 📚 Recursos

- [react-native-iap docs](https://github.com/dooboolab-community/react-native-iap)
- [App Store Review Guidelines - IAP](https://developer.apple.com/app-store/review/guidelines/#in-app-purchase)
- [Google Play Billing](https://developer.android.com/google/play/billing)
- [Revenue Cat](https://www.revenuecat.com/) (backend alternativo)

---

## ✅ Siguiente Acción

Elige uno:

**Opción A: UI First**
→ Crear PaywallScreen hermosa
→ Agregar traducciones
→ Integrar paywalls

**Opción B: Limits First**
→ Limitar custom presets
→ Limitar stats
→ Agregar upgrade CTAs
→ Luego crear PaywallScreen

**Opción C: Stores First**
→ Configurar App Store Connect
→ Configurar Play Console
→ Testing real con sandbox

**Recomendación:** Opción A (UI First) - Da visual del producto final
