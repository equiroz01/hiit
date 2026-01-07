# Traducciones Pendientes

## Instrucciones

Agregar estas traducciones al final de cada idioma en `src/i18n/translations.ts`, justo antes del cierre `},`

---

## Español (es) - Agregar después de `programProgress: 'Progreso',`:

```typescript
    // Sync & Cloud
    syncing: 'Sincronizando...',
    synced: 'Sincronizado',
    syncError: 'Error de Sincronización',
    lastSync: 'Última sincronización',
    pendingChanges: 'cambios pendientes',
    tapToSync: 'Toca para sincronizar',
    cloudSync: 'Sincronización en la Nube',
    enableCloudSync: 'Activar Sincronización',
    syncDescription: 'Sincroniza tus datos en todos tus dispositivos',

    // Authentication
    signIn: 'Iniciar Sesión',
    signUp: 'Registrarse',
    signOut: 'Cerrar Sesión',
    email: 'Email',
    password: 'Contraseña',
    confirmPassword: 'Confirmar Contraseña',
    forgotPassword: '¿Olvidaste tu contraseña?',
    resetPassword: 'Restablecer Contraseña',
    createAccount: 'Crear Cuenta',
    alreadyHaveAccount: '¿Ya tienes una cuenta?',
    dontHaveAccount: '¿No tienes una cuenta?',
    continueAsGuest: 'Continuar como Invitado',
    syncBenefits: 'Inicia sesión para sincronizar tus entrenos en todos tus dispositivos',
```

---

## Italiano (it) - Agregar después de `programProgress: 'Progresso',`:

```typescript
    // Sync & Cloud
    syncing: 'Sincronizzazione...',
    synced: 'Sincronizzato',
    syncError: 'Errore di Sincronizzazione',
    lastSync: 'Ultima sincronizzazione',
    pendingChanges: 'modifiche in attesa',
    tapToSync: 'Tocca per sincronizzare',
    cloudSync: 'Sincronizzazione Cloud',
    enableCloudSync: 'Abilita Sincronizzazione',
    syncDescription: 'Sincronizza i tuoi dati su tutti i dispositivi',

    // Authentication
    signIn: 'Accedi',
    signUp: 'Registrati',
    signOut: 'Esci',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Conferma Password',
    forgotPassword: 'Password dimenticata?',
    resetPassword: 'Reimposta Password',
    createAccount: 'Crea Account',
    alreadyHaveAccount: 'Hai già un account?',
    dontHaveAccount: 'Non hai un account?',
    continueAsGuest: 'Continua come Ospite',
    syncBenefits: 'Accedi per sincronizzare i tuoi allenamenti su tutti i tuoi dispositivi',
```

---

## Français (fr) - Agregar después de `programProgress: 'Progrès',`:

```typescript
    // Sync & Cloud
    syncing: 'Synchronisation...',
    synced: 'Synchronisé',
    syncError: 'Erreur de Synchronisation',
    lastSync: 'Dernière synchronisation',
    pendingChanges: 'modifications en attente',
    tapToSync: 'Toucher pour synchroniser',
    cloudSync: 'Synchronisation Cloud',
    enableCloudSync: 'Activer la Synchronisation',
    syncDescription: 'Synchronisez vos données sur tous vos appareils',

    // Authentication
    signIn: 'Se Connecter',
    signUp: "S'inscrire",
    signOut: 'Se Déconnecter',
    email: 'Email',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    forgotPassword: 'Mot de passe oublié?',
    resetPassword: 'Réinitialiser le mot de passe',
    createAccount: 'Créer un compte',
    alreadyHaveAccount: 'Vous avez déjà un compte?',
    dontHaveAccount: "Vous n'avez pas de compte?",
    continueAsGuest: 'Continuer en tant qu\'invité',
    syncBenefits: 'Connectez-vous pour synchroniser vos entraînements sur tous vos appareils',
```

---

## 中文 (zh) - Agregar después de `programProgress: '进度',`:

```typescript
    // Sync & Cloud
    syncing: '同步中...',
    synced: '已同步',
    syncError: '同步错误',
    lastSync: '上次同步',
    pendingChanges: '待处理更改',
    tapToSync: '点击同步',
    cloudSync: '云同步',
    enableCloudSync: '启用云同步',
    syncDescription: '在所有设备上同步您的数据',

    // Authentication
    signIn: '登录',
    signUp: '注册',
    signOut: '退出',
    email: '电子邮件',
    password: '密码',
    confirmPassword: '确认密码',
    forgotPassword: '忘记密码？',
    resetPassword: '重置密码',
    createAccount: '创建账户',
    alreadyHaveAccount: '已有账户？',
    dontHaveAccount: '还没有账户？',
    continueAsGuest: '以访客身份继续',
    syncBenefits: '登录以在所有设备上同步您的训练',
```

---

## Nota

El inglés (en) ya está completo. Solo faltan los otros 4 idiomas.

Después de agregar estas traducciones, ejecutar:
```bash
npx tsc --noEmit
```

Para verificar que no haya errores de TypeScript.
