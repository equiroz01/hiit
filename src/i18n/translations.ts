export type SupportedLanguage = 'en' | 'es' | 'it' | 'fr' | 'zh';

export interface Translations {
  // App
  appName: string;

  // Home
  quickWorkout: string;
  custom: string;
  work: string;
  rest: string;
  rounds: string;
  totalTime: string;
  start: string;
  seeAll: string;
  stats: string;
  days: string;
  thisWeek: string;
  workouts: string;
  min: string;

  // Timer
  prepare: string;
  working: string;
  resting: string;
  completed: string;
  roundOf: string;
  pause: string;
  resume: string;
  reset: string;
  finish: string;
  back: string;
  excellent: string;
  roundsCompleted: string;

  // Presets
  presets: string;
  deletePreset: string;
  deleteConfirm: string;
  cancel: string;
  delete: string;
  defaultPresetInfo: string;
  holdToDelete: string;
  workLabel: string;
  restLabel: string;
  roundsLabel: string;

  // Settings
  settings: string;
  language: string;
  healthSync: string;
  healthSyncDescription: string;
  enableHealthSync: string;
  healthSyncEnabled: string;
  healthSyncDisabled: string;
  healthNotAvailable: string;

  // Stats
  statistics: string;
  streakDays: string;
  todayWorkouts: string;
  thisWeekLabel: string;
  workMinutes: string;
  recentWorkouts: string;
  noWorkoutsYet: string;
  completeFirst: string;
  today: string;
  yesterday: string;

  // Profile
  profile: string;
  userProfile: string;
  weight: string;
  height: string;
  age: string;
  sex: string;
  male: string;
  female: string;
  other: string;
  save: string;
  kg: string;
  cm: string;
  years: string;
  profileIncomplete: string;
  profileIncompleteDescription: string;
  calories: string;
  caloriesBurned: string;
  estimatedCalories: string;

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
  savePercent: string;
  perMonth: string;
  perYear: string;
  getAccess: string;
  tryFree: string;
  premiumFeatures: string;
  unlimitedPresets: string;
  fullHistory: string;
  trainingPrograms: string;
  exportDataFeature: string;
  aiCoach: string;
  customThemes: string;
  watchIntegration: string;
  limitReached: string;
  upgradeToUnlock: string;
  prioritySupport: string;
  joinThousands: string;
  cancelAnytime: string;
  freeDaysThen: string;
  billedMonthly: string;
  billedAnnually: string;
  oneTimePayment: string;
  bestLongTermValue: string;
  justPerMonth: string;
  annual: string;
  monthly: string;
  lifetime: string;
  // Preset Limits
  presetsUsed: string;
  unlimited: string;
  presetLimitReached: string;
  presetLimitMessage: string;
  upgradeForUnlimited: string;
  createPreset: string;
  // Stats Limits
  last7Days: string;
  completeHistory: string;
  statsLimitReached: string;
  statsLimitMessage: string;
  upgradeForFullHistory: string;
  workoutsHidden: string;
  unlockFullHistory: string;
  // Advanced Stats
  advancedStats: string;
  progressCharts: string;
  weeklyProgress: string;
  monthlyProgress: string;
  yearlyProgress: string;
  exportData: string;
  exportCSV: string;
  totalCaloriesBurned: string;
  averageWorkoutTime: string;
  longestStreak: string;
  totalWorkouts: string;
  thisMonth: string;
  thisYear: string;
  allTime: string;
  noDataAvailable: string;
  workoutsPerWeek: string;
  caloriesPerWeek: string;
  viewAdvancedStats: string;

  // Training Programs
  programs: string;
  myPrograms: string;
  browsePrograms: string;
  startProgram: string;
  continueProgram: string;
  programDetails: string;
  weeks: string;
  workoutsPerWeekShort: string;
  difficulty: string;
  beginner: string;
  intermediate: string;
  advanced: string;
  goal: string;
  weightLoss: string;
  endurance: string;
  strength: string;
  muscleGain: string;
  generalFitness: string;
  dayOfWeeks: string;
  workoutCompleted: string;
  notStarted: string;
  inProgress: string;
  premiumProgram: string;
  freeProgram: string;
  unlockProgram: string;
  programLocked: string;
  upgradeForPrograms: string;
  currentDay: string;
  nextWorkout: string;
  startThisWorkout: string;
  markComplete: string;
  programProgress: string;

  // Sync & Cloud
  syncing: string;
  synced: string;
  syncError: string;
  lastSync: string;
  pendingChanges: string;
  tapToSync: string;
  cloudSync: string;
  enableCloudSync: string;
  syncDescription: string;

  // Authentication
  signIn: string;
  signUp: string;
  signOut: string;
  email: string;
  password: string;
  confirmPassword: string;
  forgotPassword: string;
  resetPassword: string;
  createAccount: string;
  alreadyHaveAccount: string;
  dontHaveAccount: string;
  continueAsGuest: string;
  syncBenefits: string;

  // Motivational Phrases
  motivationalWork: string;
  motivationalRest: string;
  motivationalHalfway: string;
  motivationalLastRound: string;
  motivationalAlmostDone: string;
  motivationalCompleted: string;
}

export const translations: Record<SupportedLanguage, Translations> = {
  en: {
    appName: 'Pulse HIIT',
    quickWorkout: 'Quick Workout',
    custom: 'Custom',
    work: 'Work',
    rest: 'Rest',
    rounds: 'Rounds',
    totalTime: 'Total time',
    start: 'START',
    seeAll: 'See all',
    stats: 'Stats',
    days: 'days',
    thisWeek: 'This week',
    workouts: 'workouts',
    min: 'min',
    prepare: 'GET READY',
    working: 'WORK',
    resting: 'REST',
    completed: 'COMPLETED',
    roundOf: 'Round {current} of {total}',
    pause: 'PAUSE',
    resume: 'RESUME',
    reset: 'Reset',
    finish: 'Finish',
    back: 'Back',
    excellent: 'Excellent!',
    roundsCompleted: '{rounds} rounds completed',
    presets: 'Presets',
    deletePreset: 'Delete preset',
    deleteConfirm: 'Are you sure you want to delete "{name}"?',
    cancel: 'Cancel',
    delete: 'Delete',
    defaultPresetInfo: 'Default presets cannot be deleted',
    holdToDelete: 'Hold to delete custom presets',
    workLabel: 'work',
    restLabel: 'rest',
    roundsLabel: 'rounds',
    settings: 'Settings',
    language: 'Language',
    healthSync: 'Health Sync',
    healthSyncDescription: 'Sync your workouts to Apple Health or Google Fit',
    enableHealthSync: 'Enable Health Sync',
    healthSyncEnabled: 'Health sync is enabled',
    healthSyncDisabled: 'Health sync is disabled',
    healthNotAvailable: 'Health sync not available on this device',
    statistics: 'Statistics',
    streakDays: 'Day streak',
    todayWorkouts: 'Today',
    thisWeekLabel: 'This week',
    workMinutes: 'Work min',
    recentWorkouts: 'Recent workouts',
    noWorkoutsYet: 'No workouts yet',
    completeFirst: 'Complete your first workout to see your stats',
    today: 'Today',
    yesterday: 'Yesterday',
    profile: 'Profile',
    userProfile: 'User Profile',
    weight: 'Weight',
    height: 'Height',
    age: 'Age',
    sex: 'Sex',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    save: 'Save',
    kg: 'kg',
    cm: 'cm',
    years: 'years',
    profileIncomplete: 'Complete your profile',
    profileIncompleteDescription: 'Add your weight, height, age and sex to calculate calories burned',
    calories: 'Calories',
    caloriesBurned: 'Calories burned',
    estimatedCalories: 'Est. calories',

    // Premium / Paywall
    premium: 'Premium',
    upgradeToPremium: 'Upgrade to Premium',
    unlockAllFeatures: 'Unlock all premium features',
    startFreeTrial: 'Start 7-Day Free Trial',
    restorePurchases: 'Restore Purchases',
    month: 'Month',
    year: 'Year',
    oneTime: 'One-time',
    bestValue: 'BEST VALUE',
    mostPopular: 'Most Popular',
    savePercent: 'Save {percent}%',
    perMonth: '/month',
    perYear: '/year',
    getAccess: 'Get Lifetime Access',
    tryFree: 'Try Free for 7 Days',
    premiumFeatures: 'Premium Features',
    unlimitedPresets: 'Unlimited custom presets',
    fullHistory: 'Full workout history & analytics',
    trainingPrograms: 'Training programs & challenges',
    exportDataFeature: 'Export your data anytime',
    aiCoach: 'AI-powered coaching',
    customThemes: 'Custom themes',
    watchIntegration: 'Apple Watch & Wear OS apps',
    limitReached: 'Limit Reached',
    upgradeToUnlock: 'Upgrade to Premium to unlock this feature',
    prioritySupport: 'Priority support',
    joinThousands: 'Join thousands crushing their fitness goals',
    cancelAnytime: 'Cancel anytime. No commitment.',
    freeDaysThen: 'Free for 7 days, then ',
    billedMonthly: 'Billed monthly',
    billedAnnually: 'Billed annually',
    oneTimePayment: 'One-time payment',
    bestLongTermValue: 'Best long-term value',
    justPerMonth: 'Just ${amount}/mo',
    annual: 'Annual',
    monthly: 'Monthly',
    lifetime: 'Lifetime',
    // Preset Limits
    presetsUsed: '{current}/{limit} custom presets',
    unlimited: '∞ Unlimited',
    presetLimitReached: 'Preset Limit Reached',
    presetLimitMessage: 'You\'ve reached the limit of {limit} custom presets in the free plan.',
    upgradeForUnlimited: 'Upgrade to Premium for unlimited custom presets',
    createPreset: 'Create Preset',
    // Stats Limits
    last7Days: 'Last 7 days',
    completeHistory: 'Complete history',
    statsLimitReached: 'Stats Limit',
    statsLimitMessage: 'Free plan shows only the last 7 days of workouts.',
    upgradeForFullHistory: 'Upgrade to Premium to see your complete workout history',
    workoutsHidden: '{count} older workouts hidden',
    unlockFullHistory: '🔒 Unlock Full History',
    // Advanced Stats
    advancedStats: 'Advanced Stats',
    progressCharts: 'Progress Charts',
    weeklyProgress: 'Weekly Progress',
    monthlyProgress: 'Monthly Progress',
    yearlyProgress: 'Yearly Progress',
    exportData: 'Export Data',
    exportCSV: 'Export as CSV',
    totalCaloriesBurned: 'Total Calories Burned',
    averageWorkoutTime: 'Avg Workout Time',
    longestStreak: 'Longest Streak',
    totalWorkouts: 'Total Workouts',
    thisMonth: 'This Month',
    thisYear: 'This Year',
    allTime: 'All Time',
    noDataAvailable: 'No data available',
    workoutsPerWeek: 'Workouts per Week',
    caloriesPerWeek: 'Calories per Week',
    viewAdvancedStats: '📊 View Advanced Stats',

    // Training Programs
    programs: 'Programs',
    myPrograms: 'My Programs',
    browsePrograms: 'Browse Programs',
    startProgram: 'Start Program',
    continueProgram: 'Continue Program',
    programDetails: 'Program Details',
    weeks: 'weeks',
    workoutsPerWeekShort: 'x/week',
    difficulty: 'Difficulty',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    goal: 'Goal',
    weightLoss: 'Weight Loss',
    endurance: 'Endurance',
    strength: 'Strength',
    muscleGain: 'Muscle Gain',
    generalFitness: 'General Fitness',
    dayOfWeeks: 'Day {day} of {total}',
    workoutCompleted: 'Completed',
    notStarted: 'Not Started',
    inProgress: 'In Progress',
    premiumProgram: '⭐ Premium',
    freeProgram: 'Free',
    unlockProgram: 'Unlock This Program',
    programLocked: 'This program is locked',
    upgradeForPrograms: 'Upgrade to Premium to access all training programs',
    currentDay: 'Current Day',
    nextWorkout: 'Next Workout',
    startThisWorkout: 'Start This Workout',
    markComplete: 'Mark as Complete',
    programProgress: 'Progress',

    // Sync & Cloud
    syncing: 'Syncing...',
    synced: 'Synced',
    syncError: 'Sync error',
    lastSync: 'Last sync',
    pendingChanges: 'Pending changes',
    tapToSync: 'Tap to sync',
    cloudSync: 'Cloud Sync',
    enableCloudSync: 'Enable Cloud Sync',
    syncDescription: 'Backup and sync your workouts across all devices',

    // Authentication
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signOut: 'Sign Out',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    forgotPassword: 'Forgot Password?',
    resetPassword: 'Reset Password',
    createAccount: 'Create Account',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: 'Don\'t have an account?',
    continueAsGuest: 'Continue as Guest',
    syncBenefits: 'Benefits of signing up:',

    // Motivational Phrases
    motivationalWork: 'Push it!',
    motivationalRest: 'Breathe',
    motivationalHalfway: 'Halfway there!',
    motivationalLastRound: 'Final push!',
    motivationalAlmostDone: 'Almost done!',
    motivationalCompleted: 'You crushed it!',
  },

  es: {
    appName: 'Pulse HIIT',
    quickWorkout: 'Entreno rapido',
    custom: 'Personalizado',
    work: 'Trabajo',
    rest: 'Descanso',
    rounds: 'Rondas',
    totalTime: 'Tiempo total',
    start: 'INICIAR',
    seeAll: 'Ver todos',
    stats: 'Stats',
    days: 'dias',
    thisWeek: 'Esta semana',
    workouts: 'entrenos',
    min: 'min',
    prepare: 'PREPARATE',
    working: 'TRABAJO',
    resting: 'DESCANSO',
    completed: 'COMPLETADO',
    roundOf: 'Ronda {current} de {total}',
    pause: 'PAUSAR',
    resume: 'CONTINUAR',
    reset: 'Reiniciar',
    finish: 'Terminar',
    back: 'Volver',
    excellent: 'Excelente!',
    roundsCompleted: '{rounds} rondas completadas',
    presets: 'Presets',
    deletePreset: 'Eliminar preset',
    deleteConfirm: 'Seguro que quieres eliminar "{name}"?',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    defaultPresetInfo: 'Los presets por defecto no se pueden eliminar',
    holdToDelete: 'Manten presionado para eliminar',
    workLabel: 'trabajo',
    restLabel: 'descanso',
    roundsLabel: 'rondas',
    settings: 'Ajustes',
    language: 'Idioma',
    healthSync: 'Sincronización de Salud',
    healthSyncDescription: 'Sincroniza tus entrenamientos con Apple Health o Google Fit',
    enableHealthSync: 'Habilitar sincronización',
    healthSyncEnabled: 'Sincronización habilitada',
    healthSyncDisabled: 'Sincronización deshabilitada',
    healthNotAvailable: 'Sincronización no disponible en este dispositivo',
    statistics: 'Estadisticas',
    streakDays: 'Racha de dias',
    todayWorkouts: 'Hoy',
    thisWeekLabel: 'Esta semana',
    workMinutes: 'Min trabajo',
    recentWorkouts: 'Entrenos recientes',
    noWorkoutsYet: 'Sin entrenos aun',
    completeFirst: 'Completa tu primer entreno para ver tus estadisticas',
    today: 'Hoy',
    yesterday: 'Ayer',
    profile: 'Perfil',
    userProfile: 'Perfil de Usuario',
    weight: 'Peso',
    height: 'Altura',
    age: 'Edad',
    sex: 'Sexo',
    male: 'Masculino',
    female: 'Femenino',
    other: 'Otro',
    save: 'Guardar',
    kg: 'kg',
    cm: 'cm',
    years: 'años',
    profileIncomplete: 'Completa tu perfil',
    profileIncompleteDescription: 'Agrega tu peso, altura, edad y sexo para calcular calorías quemadas',
    calories: 'Calorías',
    caloriesBurned: 'Calorías quemadas',
    estimatedCalories: 'Calorías est.',

    // Premium / Paywall
    premium: 'Premium',
    upgradeToPremium: 'Actualizar a Premium',
    unlockAllFeatures: 'Desbloquea todas las funciones premium',
    startFreeTrial: 'Comenzar prueba gratis de 7 días',
    restorePurchases: 'Restaurar compras',
    month: 'Mes',
    year: 'Año',
    oneTime: 'Pago único',
    bestValue: 'MEJOR VALOR',
    mostPopular: 'Más popular',
    savePercent: 'Ahorra {percent}%',
    perMonth: '/mes',
    perYear: '/año',
    getAccess: 'Acceso de por vida',
    tryFree: 'Prueba gratis 7 días',
    premiumFeatures: 'Funciones Premium',
    unlimitedPresets: 'Presets personalizados ilimitados',
    fullHistory: 'Historial completo y análisis',
    trainingPrograms: 'Programas de entrenamiento y desafíos',
    exportDataFeature: 'Exporta tus datos cuando quieras',
    aiCoach: 'Entrenamiento con IA',
    customThemes: 'Temas personalizados',
    watchIntegration: 'Apps para Apple Watch y Wear OS',
    limitReached: 'Límite alcanzado',
    upgradeToUnlock: 'Actualiza a Premium para desbloquear esta función',
    prioritySupport: 'Soporte prioritario',
    joinThousands: 'Únete a miles alcanzando sus metas fitness',
    cancelAnytime: 'Cancela cuando quieras. Sin compromiso.',
    freeDaysThen: 'Gratis por 7 días, luego ',
    billedMonthly: 'Facturado mensualmente',
    billedAnnually: 'Facturado anualmente',
    oneTimePayment: 'Pago único',
    bestLongTermValue: 'Mejor valor a largo plazo',
    justPerMonth: 'Solo ${amount}/mes',
    annual: 'Anual',
    monthly: 'Mensual',
    lifetime: 'De por vida',
    // Preset Limits
    presetsUsed: '{current}/{limit} presets personalizados',
    unlimited: '∞ Ilimitado',
    presetLimitReached: 'Límite de Presets Alcanzado',
    presetLimitMessage: 'Has alcanzado el límite de {limit} presets personalizados en el plan gratuito.',
    upgradeForUnlimited: 'Actualiza a Premium para presets personalizados ilimitados',
    createPreset: 'Crear Preset',
    // Stats Limits
    last7Days: 'Últimos 7 días',
    completeHistory: 'Historial completo',
    statsLimitReached: 'Límite de Estadísticas',
    statsLimitMessage: 'El plan gratuito muestra solo los últimos 7 días de entrenos.',
    upgradeForFullHistory: 'Actualiza a Premium para ver tu historial completo de entrenos',
    workoutsHidden: '{count} entrenos antiguos ocultos',
    unlockFullHistory: '🔒 Desbloquear Historial Completo',
    // Advanced Stats
    advancedStats: 'Estadísticas Avanzadas',
    progressCharts: 'Gráficas de Progreso',
    weeklyProgress: 'Progreso Semanal',
    monthlyProgress: 'Progreso Mensual',
    yearlyProgress: 'Progreso Anual',
    exportData: 'Exportar Datos',
    exportCSV: 'Exportar como CSV',
    totalCaloriesBurned: 'Calorías Totales Quemadas',
    averageWorkoutTime: 'Tiempo Promedio',
    longestStreak: 'Racha Más Larga',
    totalWorkouts: 'Entrenos Totales',
    thisMonth: 'Este Mes',
    thisYear: 'Este Año',
    allTime: 'Todo el Tiempo',
    noDataAvailable: 'No hay datos disponibles',
    workoutsPerWeek: 'Entrenos por Semana',
    caloriesPerWeek: 'Calorías por Semana',
    viewAdvancedStats: '📊 Ver Estadísticas Avanzadas',

    // Training Programs
    programs: 'Programas',
    myPrograms: 'Mis Programas',
    browsePrograms: 'Explorar Programas',
    startProgram: 'Comenzar Programa',
    continueProgram: 'Continuar Programa',
    programDetails: 'Detalles del Programa',
    weeks: 'semanas',
    workoutsPerWeekShort: 'x/semana',
    difficulty: 'Dificultad',
    beginner: 'Principiante',
    intermediate: 'Intermedio',
    advanced: 'Avanzado',
    goal: 'Objetivo',
    weightLoss: 'Pérdida de Peso',
    endurance: 'Resistencia',
    strength: 'Fuerza',
    muscleGain: 'Ganancia Muscular',
    generalFitness: 'Fitness General',
    dayOfWeeks: 'Día {day} de {total}',
    workoutCompleted: 'Completado',
    notStarted: 'No Iniciado',
    inProgress: 'En Progreso',
    premiumProgram: '⭐ Premium',
    freeProgram: 'Gratis',
    unlockProgram: 'Desbloquear Este Programa',
    programLocked: 'Este programa está bloqueado',
    upgradeForPrograms: 'Actualiza a Premium para acceder a todos los programas de entrenamiento',
    currentDay: 'Día Actual',
    nextWorkout: 'Próximo Entreno',
    startThisWorkout: 'Comenzar Este Entreno',
    markComplete: 'Marcar como Completado',
    programProgress: 'Progreso',

    // Sync & Cloud
    syncing: 'Sincronizando...',
    synced: 'Sincronizado',
    syncError: 'Error de sincronización',
    lastSync: 'Última sincronización',
    pendingChanges: 'Cambios pendientes',
    tapToSync: 'Toca para sincronizar',
    cloudSync: 'Sincronización en la Nube',
    enableCloudSync: 'Habilitar Sincronización en la Nube',
    syncDescription: 'Respalda y sincroniza tus entrenos en todos tus dispositivos',

    // Authentication
    signIn: 'Iniciar Sesión',
    signUp: 'Registrarse',
    signOut: 'Cerrar Sesión',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    confirmPassword: 'Confirmar Contraseña',
    forgotPassword: '¿Olvidaste tu contraseña?',
    resetPassword: 'Restablecer Contraseña',
    createAccount: 'Crear Cuenta',
    alreadyHaveAccount: '¿Ya tienes una cuenta?',
    dontHaveAccount: '¿No tienes una cuenta?',
    continueAsGuest: 'Continuar como Invitado',
    syncBenefits: 'Beneficios de registrarse:',

    // Motivational Phrases
    motivationalWork: '¡Dale!',
    motivationalRest: 'Respira',
    motivationalHalfway: '¡A mitad de camino!',
    motivationalLastRound: '¡Último esfuerzo!',
    motivationalAlmostDone: '¡Casi listo!',
    motivationalCompleted: '¡Lo lograste!',
  },

  it: {
    appName: 'Pulse HIIT',
    quickWorkout: 'Allenamento veloce',
    custom: 'Personalizzato',
    work: 'Lavoro',
    rest: 'Riposo',
    rounds: 'Round',
    totalTime: 'Tempo totale',
    start: 'INIZIA',
    seeAll: 'Vedi tutti',
    stats: 'Stats',
    days: 'giorni',
    thisWeek: 'Questa settimana',
    workouts: 'allenamenti',
    min: 'min',
    prepare: 'PREPARATI',
    working: 'LAVORO',
    resting: 'RIPOSO',
    completed: 'COMPLETATO',
    roundOf: 'Round {current} di {total}',
    pause: 'PAUSA',
    resume: 'RIPRENDI',
    reset: 'Ricomincia',
    finish: 'Termina',
    back: 'Indietro',
    excellent: 'Eccellente!',
    roundsCompleted: '{rounds} round completati',
    presets: 'Preset',
    deletePreset: 'Elimina preset',
    deleteConfirm: 'Sei sicuro di voler eliminare "{name}"?',
    cancel: 'Annulla',
    delete: 'Elimina',
    defaultPresetInfo: 'I preset predefiniti non possono essere eliminati',
    holdToDelete: 'Tieni premuto per eliminare',
    workLabel: 'lavoro',
    restLabel: 'riposo',
    roundsLabel: 'round',
    settings: 'Impostazioni',
    language: 'Lingua',
    healthSync: 'Sincronizzazione Salute',
    healthSyncDescription: 'Sincronizza i tuoi allenamenti con Apple Health o Google Fit',
    enableHealthSync: 'Abilita sincronizzazione',
    healthSyncEnabled: 'Sincronizzazione abilitata',
    healthSyncDisabled: 'Sincronizzazione disabilitata',
    healthNotAvailable: 'Sincronizzazione non disponibile su questo dispositivo',
    statistics: 'Statistiche',
    streakDays: 'Giorni di fila',
    todayWorkouts: 'Oggi',
    thisWeekLabel: 'Questa settimana',
    workMinutes: 'Min lavoro',
    recentWorkouts: 'Allenamenti recenti',
    noWorkoutsYet: 'Nessun allenamento',
    completeFirst: 'Completa il primo allenamento per vedere le statistiche',
    today: 'Oggi',
    yesterday: 'Ieri',
    profile: 'Profilo',
    userProfile: 'Profilo Utente',
    weight: 'Peso',
    height: 'Altezza',
    age: 'Età',
    sex: 'Sesso',
    male: 'Maschio',
    female: 'Femmina',
    other: 'Altro',
    save: 'Salva',
    kg: 'kg',
    cm: 'cm',
    years: 'anni',
    profileIncomplete: 'Completa il tuo profilo',
    profileIncompleteDescription: 'Aggiungi peso, altezza, età e sesso per calcolare le calorie bruciate',
    calories: 'Calorie',
    caloriesBurned: 'Calorie bruciate',
    estimatedCalories: 'Calorie stimate',

    // Premium / Paywall
    premium: 'Premium',
    upgradeToPremium: 'Passa a Premium',
    unlockAllFeatures: 'Sblocca tutte le funzionalità premium',
    startFreeTrial: 'Inizia prova gratuita di 7 giorni',
    restorePurchases: 'Ripristina acquisti',
    month: 'Mese',
    year: 'Anno',
    oneTime: 'Pagamento unico',
    bestValue: 'MIGLIOR VALORE',
    mostPopular: 'Più popolare',
    savePercent: 'Risparmia {percent}%',
    perMonth: '/mese',
    perYear: '/anno',
    getAccess: 'Accesso a vita',
    tryFree: 'Prova gratis 7 giorni',
    premiumFeatures: 'Funzionalità Premium',
    unlimitedPresets: 'Preset personalizzati illimitati',
    fullHistory: 'Cronologia completa e analisi',
    trainingPrograms: 'Programmi di allenamento e sfide',
    exportDataFeature: 'Esporta i tuoi dati quando vuoi',
    aiCoach: 'Coaching basato su IA',
    customThemes: 'Temi personalizzati',
    watchIntegration: 'App per Apple Watch e Wear OS',
    limitReached: 'Limite raggiunto',
    upgradeToUnlock: 'Passa a Premium per sbloccare questa funzione',
    prioritySupport: 'Supporto prioritario',
    joinThousands: 'Unisciti a migliaia che raggiungono i loro obiettivi fitness',
    cancelAnytime: 'Cancella quando vuoi. Nessun impegno.',
    freeDaysThen: 'Gratis per 7 giorni, poi ',
    billedMonthly: 'Fatturato mensilmente',
    billedAnnually: 'Fatturato annualmente',
    oneTimePayment: 'Pagamento unico',
    bestLongTermValue: 'Miglior valore a lungo termine',
    justPerMonth: 'Solo ${amount}/mese',
    annual: 'Annuale',
    monthly: 'Mensile',
    lifetime: 'A vita',
    // Preset Limits
    presetsUsed: '{current}/{limit} preset personalizzati',
    unlimited: '∞ Illimitato',
    presetLimitReached: 'Limite Preset Raggiunto',
    presetLimitMessage: 'Hai raggiunto il limite di {limit} preset personalizzati nel piano gratuito.',
    upgradeForUnlimited: 'Passa a Premium per preset personalizzati illimitati',
    createPreset: 'Crea Preset',
    // Stats Limits
    last7Days: 'Ultimi 7 giorni',
    completeHistory: 'Cronologia completa',
    statsLimitReached: 'Limite Statistiche',
    statsLimitMessage: 'Il piano gratuito mostra solo gli ultimi 7 giorni di allenamenti.',
    upgradeForFullHistory: 'Passa a Premium per vedere la cronologia completa degli allenamenti',
    workoutsHidden: '{count} allenamenti precedenti nascosti',
    unlockFullHistory: '🔒 Sblocca Cronologia Completa',
    // Advanced Stats
    advancedStats: 'Statistiche Avanzate',
    progressCharts: 'Grafici di Progresso',
    weeklyProgress: 'Progresso Settimanale',
    monthlyProgress: 'Progresso Mensile',
    yearlyProgress: 'Progresso Annuale',
    exportData: 'Esporta Dati',
    exportCSV: 'Esporta come CSV',
    totalCaloriesBurned: 'Calorie Totali Bruciate',
    averageWorkoutTime: 'Tempo Medio',
    longestStreak: 'Serie Più Lunga',
    totalWorkouts: 'Allenamenti Totali',
    thisMonth: 'Questo Mese',
    thisYear: 'Quest\'Anno',
    allTime: 'Sempre',
    noDataAvailable: 'Nessun dato disponibile',
    workoutsPerWeek: 'Allenamenti per Settimana',
    caloriesPerWeek: 'Calorie per Settimana',
    viewAdvancedStats: '📊 Visualizza Statistiche Avanzate',

    // Training Programs
    programs: 'Programmi',
    myPrograms: 'I Miei Programmi',
    browsePrograms: 'Esplora Programmi',
    startProgram: 'Inizia Programma',
    continueProgram: 'Continua Programma',
    programDetails: 'Dettagli del Programma',
    weeks: 'settimane',
    workoutsPerWeekShort: 'x/settimana',
    difficulty: 'Difficoltà',
    beginner: 'Principiante',
    intermediate: 'Intermedio',
    advanced: 'Avanzato',
    goal: 'Obiettivo',
    weightLoss: 'Perdita di Peso',
    endurance: 'Resistenza',
    strength: 'Forza',
    muscleGain: 'Guadagno Muscolare',
    generalFitness: 'Fitness Generale',
    dayOfWeeks: 'Giorno {day} di {total}',
    workoutCompleted: 'Completato',
    notStarted: 'Non Iniziato',
    inProgress: 'In Corso',
    premiumProgram: '⭐ Premium',
    freeProgram: 'Gratuito',
    unlockProgram: 'Sblocca Questo Programma',
    programLocked: 'Questo programma è bloccato',
    upgradeForPrograms: 'Passa a Premium per accedere a tutti i programmi di allenamento',
    currentDay: 'Giorno Corrente',
    nextWorkout: 'Prossimo Allenamento',
    startThisWorkout: 'Inizia Questo Allenamento',
    markComplete: 'Segna come Completato',
    programProgress: 'Progresso',

    // Sync & Cloud
    syncing: 'Sincronizzazione...',
    synced: 'Sincronizzato',
    syncError: 'Errore di sincronizzazione',
    lastSync: 'Ultima sincronizzazione',
    pendingChanges: 'Modifiche in sospeso',
    tapToSync: 'Tocca per sincronizzare',
    cloudSync: 'Sincronizzazione Cloud',
    enableCloudSync: 'Abilita Sincronizzazione Cloud',
    syncDescription: 'Backup e sincronizza i tuoi allenamenti su tutti i dispositivi',

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
    syncBenefits: 'Vantaggi della registrazione:',

    // Motivational Phrases
    motivationalWork: 'Spingi!',
    motivationalRest: 'Respira',
    motivationalHalfway: 'A metà strada!',
    motivationalLastRound: 'Ultimo sforzo!',
    motivationalAlmostDone: 'Quasi fatto!',
    motivationalCompleted: 'Ce l\'hai fatta!',
  },

  fr: {
    appName: 'Pulse HIIT',
    quickWorkout: 'Entrainement rapide',
    custom: 'Personnalise',
    work: 'Travail',
    rest: 'Repos',
    rounds: 'Rounds',
    totalTime: 'Temps total',
    start: 'DEMARRER',
    seeAll: 'Voir tout',
    stats: 'Stats',
    days: 'jours',
    thisWeek: 'Cette semaine',
    workouts: 'entrainements',
    min: 'min',
    prepare: 'PREPAREZ-VOUS',
    working: 'TRAVAIL',
    resting: 'REPOS',
    completed: 'TERMINE',
    roundOf: 'Round {current} sur {total}',
    pause: 'PAUSE',
    resume: 'REPRENDRE',
    reset: 'Recommencer',
    finish: 'Terminer',
    back: 'Retour',
    excellent: 'Excellent!',
    roundsCompleted: '{rounds} rounds completes',
    presets: 'Presets',
    deletePreset: 'Supprimer preset',
    deleteConfirm: 'Voulez-vous vraiment supprimer "{name}"?',
    cancel: 'Annuler',
    delete: 'Supprimer',
    defaultPresetInfo: 'Les presets par defaut ne peuvent pas etre supprimes',
    holdToDelete: 'Maintenez pour supprimer',
    workLabel: 'travail',
    restLabel: 'repos',
    roundsLabel: 'rounds',
    settings: 'Parametres',
    language: 'Langue',
    healthSync: 'Synchronisation Sante',
    healthSyncDescription: 'Synchronisez vos entrainements avec Apple Health ou Google Fit',
    enableHealthSync: 'Activer la synchronisation',
    healthSyncEnabled: 'Synchronisation activee',
    healthSyncDisabled: 'Synchronisation desactivee',
    healthNotAvailable: 'Synchronisation non disponible sur cet appareil',
    statistics: 'Statistiques',
    streakDays: 'Jours de suite',
    todayWorkouts: 'Aujourd\'hui',
    thisWeekLabel: 'Cette semaine',
    workMinutes: 'Min travail',
    recentWorkouts: 'Entrainements recents',
    noWorkoutsYet: 'Pas d\'entrainements',
    completeFirst: 'Completez votre premier entrainement pour voir vos stats',
    today: 'Aujourd\'hui',
    yesterday: 'Hier',
    profile: 'Profil',
    userProfile: 'Profil Utilisateur',
    weight: 'Poids',
    height: 'Taille',
    age: 'Age',
    sex: 'Sexe',
    male: 'Homme',
    female: 'Femme',
    other: 'Autre',
    save: 'Enregistrer',
    kg: 'kg',
    cm: 'cm',
    years: 'ans',
    profileIncomplete: 'Completez votre profil',
    profileIncompleteDescription: 'Ajoutez votre poids, taille, age et sexe pour calculer les calories brulees',
    calories: 'Calories',
    caloriesBurned: 'Calories brulees',
    estimatedCalories: 'Calories est.',

    // Premium / Paywall
    premium: 'Premium',
    upgradeToPremium: 'Passer à Premium',
    unlockAllFeatures: 'Débloquez toutes les fonctionnalités premium',
    startFreeTrial: 'Commencer l\'essai gratuit de 7 jours',
    restorePurchases: 'Restaurer les achats',
    month: 'Mois',
    year: 'An',
    oneTime: 'Paiement unique',
    bestValue: 'MEILLEUR RAPPORT',
    mostPopular: 'Plus populaire',
    savePercent: 'Économisez {percent}%',
    perMonth: '/mois',
    perYear: '/an',
    getAccess: 'Accès à vie',
    tryFree: 'Essai gratuit 7 jours',
    premiumFeatures: 'Fonctionnalités Premium',
    unlimitedPresets: 'Presets personnalisés illimités',
    fullHistory: 'Historique complet et analyses',
    trainingPrograms: 'Programmes d\'entraînement et défis',
    exportDataFeature: 'Exportez vos données à tout moment',
    aiCoach: 'Coaching basé sur IA',
    customThemes: 'Thèmes personnalisés',
    watchIntegration: 'Apps pour Apple Watch et Wear OS',
    limitReached: 'Limite atteinte',
    upgradeToUnlock: 'Passez à Premium pour débloquer cette fonctionnalité',
    prioritySupport: 'Support prioritaire',
    joinThousands: 'Rejoignez des milliers atteignant leurs objectifs fitness',
    cancelAnytime: 'Annulez à tout moment. Aucun engagement.',
    freeDaysThen: 'Gratuit pendant 7 jours, puis ',
    billedMonthly: 'Facturé mensuellement',
    billedAnnually: 'Facturé annuellement',
    oneTimePayment: 'Paiement unique',
    bestLongTermValue: 'Meilleur rapport à long terme',
    justPerMonth: 'Seulement ${amount}/mois',
    annual: 'Annuel',
    monthly: 'Mensuel',
    lifetime: 'À vie',
    // Preset Limits
    presetsUsed: '{current}/{limit} presets personnalisés',
    unlimited: '∞ Illimité',
    presetLimitReached: 'Limite de Presets Atteinte',
    presetLimitMessage: 'Vous avez atteint la limite de {limit} presets personnalisés dans le plan gratuit.',
    upgradeForUnlimited: 'Passez à Premium pour des presets personnalisés illimités',
    createPreset: 'Créer un Preset',
    // Stats Limits
    last7Days: 'Les 7 derniers jours',
    completeHistory: 'Historique complet',
    statsLimitReached: 'Limite de Statistiques',
    statsLimitMessage: 'Le plan gratuit affiche uniquement les 7 derniers jours d\'entraînements.',
    upgradeForFullHistory: 'Passez à Premium pour voir votre historique complet d\'entraînements',
    workoutsHidden: '{count} entraînements antérieurs masqués',
    unlockFullHistory: '🔒 Débloquer l\'Historique Complet',
    // Advanced Stats
    advancedStats: 'Statistiques Avancées',
    progressCharts: 'Graphiques de Progrès',
    weeklyProgress: 'Progrès Hebdomadaire',
    monthlyProgress: 'Progrès Mensuel',
    yearlyProgress: 'Progrès Annuel',
    exportData: 'Exporter les Données',
    exportCSV: 'Exporter en CSV',
    totalCaloriesBurned: 'Calories Totales Brûlées',
    averageWorkoutTime: 'Temps Moyen',
    longestStreak: 'Plus Longue Série',
    totalWorkouts: 'Entraînements Totaux',
    thisMonth: 'Ce Mois',
    thisYear: 'Cette Année',
    allTime: 'Depuis Toujours',
    noDataAvailable: 'Aucune donnée disponible',
    workoutsPerWeek: 'Entraînements par Semaine',
    caloriesPerWeek: 'Calories par Semaine',
    viewAdvancedStats: '📊 Voir Statistiques Avancées',

    // Training Programs
    programs: 'Programmes',
    myPrograms: 'Mes Programmes',
    browsePrograms: 'Explorer les Programmes',
    startProgram: 'Commencer le Programme',
    continueProgram: 'Continuer le Programme',
    programDetails: 'Détails du Programme',
    weeks: 'semaines',
    workoutsPerWeekShort: 'x/semaine',
    difficulty: 'Difficulté',
    beginner: 'Débutant',
    intermediate: 'Intermédiaire',
    advanced: 'Avancé',
    goal: 'Objectif',
    weightLoss: 'Perte de Poids',
    endurance: 'Endurance',
    strength: 'Force',
    muscleGain: 'Gain Musculaire',
    generalFitness: 'Fitness Général',
    dayOfWeeks: 'Jour {day} sur {total}',
    workoutCompleted: 'Complété',
    notStarted: 'Non Commencé',
    inProgress: 'En Cours',
    premiumProgram: '⭐ Premium',
    freeProgram: 'Gratuit',
    unlockProgram: 'Débloquer ce Programme',
    programLocked: 'Ce programme est verrouillé',
    upgradeForPrograms: 'Passez à Premium pour accéder à tous les programmes d\'entraînement',
    currentDay: 'Jour Actuel',
    nextWorkout: 'Prochain Entraînement',
    startThisWorkout: 'Commencer cet Entraînement',
    markComplete: 'Marquer comme Complété',
    programProgress: 'Progrès',

    // Sync & Cloud
    syncing: 'Synchronisation...',
    synced: 'Synchronisé',
    syncError: 'Erreur de synchronisation',
    lastSync: 'Dernière synchronisation',
    pendingChanges: 'Modifications en attente',
    tapToSync: 'Toucher pour synchroniser',
    cloudSync: 'Synchronisation Cloud',
    enableCloudSync: 'Activer la Synchronisation Cloud',
    syncDescription: 'Sauvegardez et synchronisez vos entraînements sur tous vos appareils',

    // Authentication
    signIn: 'Se Connecter',
    signUp: 'S\'Inscrire',
    signOut: 'Se Déconnecter',
    email: 'Email',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    forgotPassword: 'Mot de passe oublié?',
    resetPassword: 'Réinitialiser le mot de passe',
    createAccount: 'Créer un compte',
    alreadyHaveAccount: 'Vous avez déjà un compte?',
    dontHaveAccount: 'Vous n\'avez pas de compte?',
    continueAsGuest: 'Continuer en tant qu\'Invité',
    syncBenefits: 'Avantages de l\'inscription:',

    // Motivational Phrases
    motivationalWork: 'Allez!',
    motivationalRest: 'Respirez',
    motivationalHalfway: 'À mi-chemin!',
    motivationalLastRound: 'Dernier effort!',
    motivationalAlmostDone: 'Presque fini!',
    motivationalCompleted: 'Vous l\'avez fait!',
  },

  zh: {
    appName: 'Pulse HIIT',
    quickWorkout: '快速训练',
    custom: '自定义',
    work: '运动',
    rest: '休息',
    rounds: '回合',
    totalTime: '总时间',
    start: '开始',
    seeAll: '查看全部',
    stats: '统计',
    days: '天',
    thisWeek: '本周',
    workouts: '次训练',
    min: '分钟',
    prepare: '准备',
    working: '运动',
    resting: '休息',
    completed: '完成',
    roundOf: '第 {current} 回合，共 {total} 回合',
    pause: '暂停',
    resume: '继续',
    reset: '重置',
    finish: '结束',
    back: '返回',
    excellent: '太棒了！',
    roundsCompleted: '完成 {rounds} 回合',
    presets: '预设',
    deletePreset: '删除预设',
    deleteConfirm: '确定要删除 "{name}" 吗？',
    cancel: '取消',
    delete: '删除',
    defaultPresetInfo: '默认预设无法删除',
    holdToDelete: '长按删除自定义预设',
    workLabel: '运动',
    restLabel: '休息',
    roundsLabel: '回合',
    settings: '设置',
    language: '语言',
    healthSync: '健康同步',
    healthSyncDescription: '将训练同步到 Apple Health 或 Google Fit',
    enableHealthSync: '启用健康同步',
    healthSyncEnabled: '健康同步已启用',
    healthSyncDisabled: '健康同步已禁用',
    healthNotAvailable: '此设备不支持健康同步',
    statistics: '统计数据',
    streakDays: '连续天数',
    todayWorkouts: '今日',
    thisWeekLabel: '本周',
    workMinutes: '运动分钟',
    recentWorkouts: '最近训练',
    noWorkoutsYet: '暂无训练',
    completeFirst: '完成第一次训练后查看统计数据',
    today: '今天',
    yesterday: '昨天',
    profile: '个人资料',
    userProfile: '用户资料',
    weight: '体重',
    height: '身高',
    age: '年龄',
    sex: '性别',
    male: '男',
    female: '女',
    other: '其他',
    save: '保存',
    kg: '公斤',
    cm: '厘米',
    years: '岁',
    profileIncomplete: '完善您的资料',
    profileIncompleteDescription: '添加体重、身高、年龄和性别以计算消耗的卡路里',
    calories: '卡路里',
    caloriesBurned: '消耗卡路里',
    estimatedCalories: '预计卡路里',

    // Premium / Paywall
    premium: '高级版',
    upgradeToPremium: '升级到高级版',
    unlockAllFeatures: '解锁所有高级功能',
    startFreeTrial: '开始7天免费试用',
    restorePurchases: '恢复购买',
    month: '月',
    year: '年',
    oneTime: '一次性付款',
    bestValue: '最超值',
    mostPopular: '最受欢迎',
    savePercent: '节省 {percent}%',
    perMonth: '/月',
    perYear: '/年',
    getAccess: '获取终身访问权限',
    tryFree: '免费试用7天',
    premiumFeatures: '高级功能',
    unlimitedPresets: '无限自定义预设',
    fullHistory: '完整训练历史和分析',
    trainingPrograms: '训练计划和挑战',
    exportDataFeature: '随时导出您的数据',
    aiCoach: 'AI 智能指导',
    customThemes: '自定义主题',
    watchIntegration: 'Apple Watch 和 Wear OS 应用',
    limitReached: '已达限制',
    upgradeToUnlock: '升级到高级版以解锁此功能',
    prioritySupport: '优先支持',
    joinThousands: '加入数千人实现健身目标',
    cancelAnytime: '随时取消。无需承诺。',
    freeDaysThen: '免费7天，然后 ',
    billedMonthly: '按月计费',
    billedAnnually: '按年计费',
    oneTimePayment: '一次性付款',
    bestLongTermValue: '最佳长期价值',
    justPerMonth: '仅 ${amount}/月',
    annual: '年度',
    monthly: '月度',
    lifetime: '终身',
    // Preset Limits
    presetsUsed: '{current}/{limit} 个自定义预设',
    unlimited: '∞ 无限制',
    presetLimitReached: '已达预设限制',
    presetLimitMessage: '您已达到免费版 {limit} 个自定义预设的限制。',
    upgradeForUnlimited: '升级到高级版以获得无限自定义预设',
    createPreset: '创建预设',
    // Stats Limits
    last7Days: '最近7天',
    completeHistory: '完整历史',
    statsLimitReached: '统计限制',
    statsLimitMessage: '免费版仅显示最近7天的训练记录。',
    upgradeForFullHistory: '升级到高级版以查看完整的训练历史记录',
    workoutsHidden: '{count} 个较早的训练已隐藏',
    unlockFullHistory: '🔒 解锁完整历史',
    // Advanced Stats
    advancedStats: '高级统计',
    progressCharts: '进度图表',
    weeklyProgress: '每周进度',
    monthlyProgress: '每月进度',
    yearlyProgress: '年度进度',
    exportData: '导出数据',
    exportCSV: '导出为 CSV',
    totalCaloriesBurned: '总消耗卡路里',
    averageWorkoutTime: '平均训练时间',
    longestStreak: '最长连续天数',
    totalWorkouts: '总训练次数',
    thisMonth: '本月',
    thisYear: '今年',
    allTime: '全部时间',
    noDataAvailable: '无可用数据',
    workoutsPerWeek: '每周训练次数',
    caloriesPerWeek: '每周卡路里',
    viewAdvancedStats: '📊 查看高级统计',

    // Training Programs
    programs: '训练计划',
    myPrograms: '我的计划',
    browsePrograms: '浏览计划',
    startProgram: '开始计划',
    continueProgram: '继续计划',
    programDetails: '计划详情',
    weeks: '周',
    workoutsPerWeekShort: '次/周',
    difficulty: '难度',
    beginner: '初级',
    intermediate: '中级',
    advanced: '高级',
    goal: '目标',
    weightLoss: '减肥',
    endurance: '耐力',
    strength: '力量',
    muscleGain: '增肌',
    generalFitness: '综合健身',
    dayOfWeeks: '第 {day} 天，共 {total} 天',
    workoutCompleted: '已完成',
    notStarted: '未开始',
    inProgress: '进行中',
    premiumProgram: '⭐ 高级版',
    freeProgram: '免费',
    unlockProgram: '解锁此计划',
    programLocked: '此计划已锁定',
    upgradeForPrograms: '升级到高级版以访问所有训练计划',
    currentDay: '当前天',
    nextWorkout: '下一次训练',
    startThisWorkout: '开始此训练',
    markComplete: '标记为完成',
    programProgress: '进度',

    // Sync & Cloud
    syncing: '同步中...',
    synced: '已同步',
    syncError: '同步错误',
    lastSync: '上次同步',
    pendingChanges: '待处理的更改',
    tapToSync: '点击同步',
    cloudSync: '云同步',
    enableCloudSync: '启用云同步',
    syncDescription: '备份并在所有设备上同步您的训练数据',

    // Authentication
    signIn: '登录',
    signUp: '注册',
    signOut: '退出登录',
    email: '电子邮件',
    password: '密码',
    confirmPassword: '确认密码',
    forgotPassword: '忘记密码？',
    resetPassword: '重置密码',
    createAccount: '创建账户',
    alreadyHaveAccount: '已有账户？',
    dontHaveAccount: '还没有账户？',
    continueAsGuest: '以访客身份继续',
    syncBenefits: '注册的好处：',

    // Motivational Phrases
    motivationalWork: '加油！',
    motivationalRest: '呼吸',
    motivationalHalfway: '已完成一半！',
    motivationalLastRound: '最后冲刺！',
    motivationalAlmostDone: '快完成了！',
    motivationalCompleted: '你做到了！',
  },
};
