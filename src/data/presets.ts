import { Preset } from '../types';

export const defaultPresets: Preset[] = [
  {
    id: 'hiit-30-30',
    name: 'HIIT 30/30',
    workSeconds: 30,
    restSeconds: 30,
    rounds: 10,
    isFavorite: true,
    isDefault: true,
  },
  {
    id: 'tabata',
    name: 'TABATA',
    workSeconds: 20,
    restSeconds: 10,
    rounds: 8,
    isFavorite: true,
    isDefault: true,
  },
  {
    id: 'emom',
    name: 'EMOM',
    workSeconds: 40,
    restSeconds: 20,
    rounds: 10,
    isFavorite: true,
    isDefault: true,
  },
  {
    id: 'cardio-45-15',
    name: 'Cardio 45/15',
    workSeconds: 45,
    restSeconds: 15,
    rounds: 12,
    isFavorite: false,
    isDefault: true,
  },
  {
    id: 'intense-20-10',
    name: 'Intenso 20/10',
    workSeconds: 20,
    restSeconds: 10,
    rounds: 15,
    isFavorite: false,
    isDefault: true,
  },
];
