import type { ComponentProps } from 'react';
import type { Icon } from '../components/Icon';

export type Subject = 'Matematika' | 'Coding';
type IconName = ComponentProps<typeof Icon>['name'];

export const SUBJECTS: { name: Subject; description: string; icon: IconName; tile: string; iconColor: string }[] = [
  { name: 'Matematika', description: 'Soal matematika dasar', icon: 'calculator-outline', tile: 'bg-blue-50', iconColor: 'text-blue-700' },
  { name: 'Coding', description: 'Soal coding sederhana', icon: 'code-slash', tile: 'bg-amber-50', iconColor: 'text-amber-700' },
];

export const QUESTION_TYPES: { title: string; description: string; icon: IconName }[] = [
  { title: 'Isian', description: 'Lengkapi bagian yang kosong', icon: 'create-outline' },
  { title: 'Pilihan ganda', description: 'Pilih satu jawaban yang benar', icon: 'list-outline' },
];
