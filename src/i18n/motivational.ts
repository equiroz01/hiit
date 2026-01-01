import { SupportedLanguage } from './translations';

export interface MotivationalPhrases {
  work: string[];      // Durante trabajo
  rest: string[];      // Durante descanso
  lastRound: string[]; // Ultima ronda
  halfway: string[];   // Mitad del entreno
  almostDone: string[];// Ultimos segundos
  completed: string[]; // Al terminar
}

export const motivationalPhrases: Record<SupportedLanguage, MotivationalPhrases> = {
  en: {
    work: [
      "Push harder!",
      "You got this!",
      "Stay strong!",
      "Keep moving!",
      "No limits!",
      "Beast mode!",
      "Feel the burn!",
      "Own it!",
      "Unstoppable!",
      "All in!",
    ],
    rest: [
      "Breathe deep",
      "Recover fast",
      "Stay focused",
      "Next round ready",
      "You're doing great",
      "Almost there",
      "Stay in the zone",
      "Quick recovery",
    ],
    lastRound: [
      "Last one! Give it all!",
      "Final push!",
      "Finish strong!",
      "This is it!",
      "Leave nothing!",
      "All or nothing!",
    ],
    halfway: [
      "Halfway there!",
      "You're crushing it!",
      "Keep the pace!",
      "Strong halfway!",
    ],
    almostDone: [
      "3... 2... 1...",
      "Almost!",
      "Keep going!",
    ],
    completed: [
      "Workout complete!",
      "You crushed it!",
      "Champion!",
      "Incredible work!",
      "New personal best!",
      "Unstoppable!",
    ],
  },

  es: {
    work: [
      "Dale mas!",
      "Tu puedes!",
      "Aguanta!",
      "Sigue asi!",
      "Sin limites!",
      "Modo bestia!",
      "Siente el fuego!",
      "Es tuyo!",
      "Imparable!",
      "A tope!",
    ],
    rest: [
      "Respira hondo",
      "Recupera rapido",
      "Enfocate",
      "Siguiente ronda",
      "Lo estas haciendo genial",
      "Ya casi",
      "Mantente en la zona",
      "Recuperacion express",
    ],
    lastRound: [
      "Ultima! Dalo todo!",
      "Empujon final!",
      "Termina fuerte!",
      "Es ahora!",
      "No dejes nada!",
      "Todo o nada!",
    ],
    halfway: [
      "Mitad del camino!",
      "La estas rompiendo!",
      "Mantén el ritmo!",
      "Fuerte a la mitad!",
    ],
    almostDone: [
      "3... 2... 1...",
      "Ya casi!",
      "Sigue!",
    ],
    completed: [
      "Entreno completado!",
      "Lo lograste!",
      "Campeon!",
      "Trabajo increible!",
      "Nueva marca personal!",
      "Imparable!",
    ],
  },

  it: {
    work: [
      "Dai di piu!",
      "Ce la fai!",
      "Resisti!",
      "Continua cosi!",
      "Senza limiti!",
      "Modalita bestia!",
      "Senti il fuoco!",
      "E tuo!",
      "Inarrestabile!",
      "Al massimo!",
    ],
    rest: [
      "Respira profondo",
      "Recupera veloce",
      "Resta concentrato",
      "Prossimo round",
      "Stai andando alla grande",
      "Quasi finito",
      "Resta nella zona",
      "Recupero rapido",
    ],
    lastRound: [
      "Ultimo! Dai tutto!",
      "Spinta finale!",
      "Finisci forte!",
      "E adesso!",
      "Non lasciare nulla!",
      "Tutto o niente!",
    ],
    halfway: [
      "A meta strada!",
      "Stai spaccando!",
      "Mantieni il ritmo!",
      "Forte a meta!",
    ],
    almostDone: [
      "3... 2... 1...",
      "Quasi!",
      "Continua!",
    ],
    completed: [
      "Allenamento completato!",
      "Ce l'hai fatta!",
      "Campione!",
      "Lavoro incredibile!",
      "Nuovo record personale!",
      "Inarrestabile!",
    ],
  },

  fr: {
    work: [
      "Pousse plus fort!",
      "Tu peux le faire!",
      "Tiens bon!",
      "Continue!",
      "Sans limites!",
      "Mode bete!",
      "Sens la brulure!",
      "C'est a toi!",
      "Inarretable!",
      "A fond!",
    ],
    rest: [
      "Respire profond",
      "Recupere vite",
      "Reste concentre",
      "Prochain round",
      "Tu geres!",
      "Presque fini",
      "Reste dans la zone",
      "Recuperation rapide",
    ],
    lastRound: [
      "Dernier! Donne tout!",
      "Poussee finale!",
      "Finis fort!",
      "C'est maintenant!",
      "Ne laisse rien!",
      "Tout ou rien!",
    ],
    halfway: [
      "A mi-chemin!",
      "Tu dechires!",
      "Garde le rythme!",
      "Fort a mi-parcours!",
    ],
    almostDone: [
      "3... 2... 1...",
      "Presque!",
      "Continue!",
    ],
    completed: [
      "Entrainement termine!",
      "Tu l'as fait!",
      "Champion!",
      "Travail incroyable!",
      "Nouveau record!",
      "Inarretable!",
    ],
  },

  zh: {
    work: [
      "加油！",
      "你可以的！",
      "坚持住！",
      "继续！",
      "没有极限！",
      "野兽模式！",
      "感受燃烧！",
      "拿下它！",
      "势不可挡！",
      "全力以赴！",
    ],
    rest: [
      "深呼吸",
      "快速恢复",
      "保持专注",
      "准备下一轮",
      "你做得很好",
      "马上就好",
      "保持状态",
      "快速休息",
    ],
    lastRound: [
      "最后一轮！全力冲刺！",
      "最后一搏！",
      "强势结束！",
      "就是现在！",
      "不留遗憾！",
      "孤注一掷！",
    ],
    halfway: [
      "已经一半了！",
      "你太棒了！",
      "保持节奏！",
      "中场强势！",
    ],
    almostDone: [
      "3... 2... 1...",
      "马上！",
      "继续！",
    ],
    completed: [
      "训练完成！",
      "你做到了！",
      "冠军！",
      "难以置信！",
      "新的个人记录！",
      "势不可挡！",
    ],
  },
};

export const getRandomPhrase = (
  language: SupportedLanguage,
  category: keyof MotivationalPhrases
): string => {
  const phrases = motivationalPhrases[language][category];
  return phrases[Math.floor(Math.random() * phrases.length)];
};
