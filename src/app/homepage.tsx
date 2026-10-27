import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '../components/Icon';

type Subject = 'Matematika' | 'Coding';
type IconName = React.ComponentProps<typeof Icon>['name'];

const SUBJECTS: { name: Subject; description: string; icon: IconName; tile: string; iconColor: string }[] = [
  { name: 'Matematika', description: 'Soal matematika dasar', icon: 'calculator-outline', tile: 'bg-blue-50', iconColor: 'text-blue-700' },
  { name: 'Coding', description: 'Soal coding sederhana', icon: 'code-slash', tile: 'bg-amber-50', iconColor: 'text-amber-700' },
];

const QUESTION_TYPES: { title: string; description: string; icon: IconName }[] = [
  { title: 'Isian', description: 'Lengkapi bagian yang kosong', icon: 'create-outline' },
  { title: 'Pilihan ganda', description: 'Pilih satu jawaban yang benar', icon: 'list-outline' },
];

export default function HomePage() {
  const [subject, setSubject] = useState<Subject>('Matematika');
  const [notice, setNotice] = useState('');

  // TODO: replace with real navigation once settings, profile and quiz screens exist
  const comingSoon = (feature: string) => setNotice(`${feature} segera hadir.`);

  const pickSubject = (next: Subject) => {
    setSubject(next);
    setNotice('');
  };

  return (
    <View className="flex-1 bg-slate-100">
      <View className="bg-blue-700 pt-safe">
        <View className="w-full max-w-[560px] self-center px-5 pb-8 pt-2">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Pengaturan"
              onPress={() => comingSoon('Pengaturan')}
              className="h-11 w-11 items-center justify-center rounded-full bg-blue-600"
            >
              <Icon name="settings-outline" className="text-xl text-white" />
            </TouchableOpacity>
            <Text className="text-lg font-bold text-white">MathCode</Text>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Profil"
              onPress={() => comingSoon('Profil')}
              className="h-11 w-11 items-center justify-center rounded-full bg-blue-600"
            >
              <Icon name="person-outline" className="text-xl text-white" />
            </TouchableOpacity>
          </View>
          <Text className="mt-6 text-2xl font-bold text-white">Mau belajar apa hari ini?</Text>
          <Text className="mt-1 text-blue-100">Pilih materi, lalu pilih jenis soalnya.</Text>
        </View>
      </View>

      <ScrollView contentContainerClassName="w-full max-w-[560px] self-center px-5 pb-8 pt-5">
        {notice ? (
          <View className="mb-4 flex-row items-center rounded-xl border border-amber-300 bg-amber-100 p-3">
            <Icon name="time-outline" className="text-lg text-amber-900" />
            <Text className="ml-2 flex-1 text-amber-900" accessibilityLiveRegion="polite">
              {notice}
            </Text>
          </View>
        ) : null}

        <Text className="mb-3 text-base font-bold text-slate-900">Materi</Text>
        <View className="flex-row gap-3">
          {SUBJECTS.map((s) => {
            const selected = subject === s.name;
            return (
              <TouchableOpacity
                key={s.name}
                accessibilityRole="radio"
                accessibilityState={{ checked: selected }}
                onPress={() => pickSubject(s.name)}
                className={`flex-1 rounded-2xl border-2 bg-white p-4 ${selected ? 'border-blue-600' : 'border-transparent'}`}
              >
                <View className="flex-row items-start justify-between">
                  <View className={`h-12 w-12 items-center justify-center rounded-xl ${s.tile}`}>
                    <Icon name={s.icon} className={`text-2xl ${s.iconColor}`} />
                  </View>
                  {selected ? <Icon name="checkmark-circle" className="text-2xl text-blue-600" /> : null}
                </View>
                <Text className="mt-3 text-base font-bold text-slate-900">{s.name}</Text>
                <Text className="mt-0.5 text-xs text-slate-600">{s.description}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text className="mb-3 mt-6 text-base font-bold text-slate-900">Jenis soal {subject}</Text>
        <View className="overflow-hidden rounded-2xl bg-white">
          {QUESTION_TYPES.map((q, i) => (
            <TouchableOpacity
              key={q.title}
              accessibilityRole="button"
              onPress={() => comingSoon(`Soal ${q.title} ${subject}`)}
              className={`flex-row items-center p-4 ${i > 0 ? 'border-t border-slate-100' : ''}`}
            >
              <View className="h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <Icon name={q.icon} className="text-xl text-blue-700" />
              </View>
              <View className="ml-3 flex-1">
                <Text className="font-semibold text-slate-900">{q.title}</Text>
                <Text className="text-sm text-slate-600">{q.description}</Text>
              </View>
              <Icon name="chevron-forward" className="text-lg text-slate-500" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
