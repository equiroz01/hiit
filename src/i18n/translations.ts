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
  },
};
