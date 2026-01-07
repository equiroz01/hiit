# 🚀 IAP Quick Start - Revenue Cat

Guía rápida para implementar IAP con RevenueCat en 30 minutos.

---

## ✅ Checklist Rápido

### 1. Configurar RevenueCat (10 min)

```bash
# 1. Crear cuenta en https://app.revenuecat.com/
# 2. Crear proyecto "Pulse HIIT"
# 3. Copiar API keys

# 4. Configurar .env
cp .env.example .env

# Editar .env:
EXPO_PUBLIC_REVENUECAT_IOS_KEY=appl_xxxxx
EXPO_PUBLIC_REVENUECAT_ANDROID_KEY=goog_xxxxx
```

### 2. Configurar Productos iOS (10 min)

**App Store Connect** → In-App Purchases → Create:

| Product ID | Type | Price |
|-----------|------|-------|
| `com.equiroz.pulsehiit.premium.monthly` | Auto-Renewable | $3.99 |
| `com.equiroz.pulsehiit.premium.annual` | Auto-Renewable | $29.99 |
| `com.equiroz.pulsehiit.premium.lifetime` | Non-Consumable | $79.99 |

### 3. Configurar Productos Android (10 min)

**Google Play Console** → In-app products → Create:

| Product ID | Type | Price |
|-----------|------|-------|
| `premium_monthly` | Subscription | $3.99 |
| `premium_annual` | Subscription | $29.99 |
| `premium_lifetime` | Managed Product | $79.99 |

### 4. Conectar RevenueCat (5 min)

**RevenueCat Dashboard**:

1. **Apps** → Add iOS app (bundle: `com.equiroz.pulsehiit`)
2. **Apps** → Add Android app (package: `com.equiroz.pulsehiit`)
3. **Entitlements** → Create "premium"
4. **Offerings** → Create "Current" con 3 packages:
   - Monthly (`$rc_monthly`)
   - Annual (`$rc_annual`)
   - Lifetime (`$rc_lifetime`)

### 5. Probar (5 min)

```bash
# Build la app
eas build --platform ios --profile development

# Instalar en dispositivo
# Ir a Settings → Development Only → Unlock Premium (Test)
# Verificar que funcionen las features premium
```

---

## 🧪 Testing en Sandbox

### iOS:
```
1. App Store Connect → Users → Sandbox Testers → Create
2. iOS Settings → App Store → Sandbox Account → Sign in
3. Abrir app → PaywallScreen → Comprar
4. Usar password de sandbox tester
```

### Android:
```
1. Play Console → Internal Testing → Create release
2. Upload build from EAS
3. Add testers
4. Install from Play Store link
5. Comprar (será simulado)
```

---

## 📝 Código Ejemplo

### Verificar Premium:
```typescript
const { isPremium } = usePremium();

if (!isPremium) {
  navigation.navigate('Paywall', { source: 'feature_name' });
  return;
}

// Feature premium aquí
```

### Comprar:
```typescript
const { getPackage, purchasePackage, purchasing } = usePremium();

const handleBuy = async () => {
  const annual = getPackage('annual');
  if (annual) {
    await purchasePackage(annual);
  }
};
```

### Restaurar:
```typescript
const { restorePurchases } = usePremium();

<Button title="Restore" onPress={restorePurchases} />
```

---

## 🚨 Troubleshooting Rápido

### "No offerings found"
- Espera 24h después de crear productos (iOS)
- Verifica Product IDs coincidan exactamente
- Verifica productos estén **Active**

### "Purchase failed"
- iOS: Sign in con sandbox tester
- Android: Instala desde Internal Testing track
- Verifica shared secret / service account

### "Premium not unlocking"
- Verifica entitlement "premium" esté asignado a packages
- Force refresh: close y reabrir app
- Check RevenueCat Dashboard → Customers

---

## 📚 Documentación Completa

Ver `/docs/REVENUECAT_IAP_GUIDE.md` para guía detallada paso a paso.

---

## ✅ Production Checklist

Antes de launch:

- [ ] Productos **Approved** (iOS) / **Active** (Android)
- [ ] Banking info configurada en ambas stores
- [ ] Tested en sandbox/internal testing
- [ ] RevenueCat offerings configurados
- [ ] Helpers de testing removidos de producción
- [ ] `.env` con keys reales (no placeholders)

---

*Quick Start Guide - Enero 2026*
