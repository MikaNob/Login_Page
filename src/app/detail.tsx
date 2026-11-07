import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '../components/Icon';
import { PrimaryButton } from '../components/auth';
import { GUIDES } from '../data/guides';

const LETTERS = ['A', 'B', 'C', 'D'];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="rounded-2xl bg-white p-4">
      <Text className="text-base font-bold text-slate-900">{title}</Text>
      {children}
    </View>
  );
}

export default function DetailScreen() {
  const { subject, type } = useLocalSearchParams<{ subject: string; type: string }>();
  const guide = GUIDES[subject]?.[type];
  const [notice, setNotice] = useState('');
  const back = () => (router.canGoBack() ? router.back() : router.replace('/homepage'));

  return (
    <View className="flex-1 bg-slate-100">
      <View className="bg-blue-700 pt-safe">
        <View className="w-full max-w-[560px] self-center px-5 pb-6 pt-2">
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Kembali"
            onPress={back}
            className="h-11 w-11 items-center justify-center rounded-full bg-blue-600"
          >
            <Icon name="arrow-back" className="text-xl text-white" />
          </TouchableOpacity>
          {guide ? <Text className="mt-4 text-sm font-semibold text-blue-100">{subject}</Text> : null}
          <Text className={`${guide ? '' : 'mt-4 '}text-2xl font-bold text-white`}>
            {guide ? `Soal ${type}` : 'Panduan tidak ditemukan'}
          </Text>
        </View>
      </View>

      {guide ? (
        <ScrollView contentContainerClassName="w-full max-w-[560px] gap-4 self-center px-5 pb-8 pt-5">
          <Section title="Cara bermain">
            {guide.steps.map((step, i) => (
              <View key={step} className="mt-3 flex-row">
                <View className="h-7 w-7 items-center justify-center rounded-full bg-blue-50">
                  <Text className="text-sm font-bold text-blue-700">{i + 1}</Text>
                </View>
                <Text className="ml-3 flex-1 text-slate-700">{step}</Text>
              </View>
            ))}
          </Section>

          <Section title="Peraturan">
            {guide.rules.map((rule) => (
              <View key={rule} className="mt-3 flex-row">
                <Icon name="checkmark-circle-outline" className="text-xl text-blue-700" />
                <Text className="ml-3 flex-1 text-slate-700">{rule}</Text>
              </View>
            ))}
          </Section>

          <Section title="Contoh soal">
            <Text className="mt-3 text-base font-semibold text-slate-900">{guide.example.question}</Text>
            {guide.example.code ? (
              <View className="mt-3 rounded-lg bg-slate-900 p-3">
                <Text className="font-mono text-sm text-slate-100">{guide.example.code}</Text>
              </View>
            ) : null}
            {guide.example.options ? (
              guide.example.options.map((option, i) => {
                const correct = option === guide.example.answer;
                return (
                  <View
                    key={option}
                    className={`mt-2 flex-row items-center rounded-xl border px-4 py-3 ${correct ? 'border-blue-600 bg-blue-50' : 'border-slate-200'}`}
                  >
                    <Text className="w-6 font-bold text-slate-600">{LETTERS[i]}</Text>
                    <Text className="flex-1 text-slate-900">{option}</Text>
                    {correct ? <Text className="text-sm font-semibold text-blue-700">Jawaban benar</Text> : null}
                  </View>
                );
              })
            ) : (
              <View className="mt-3 rounded-xl border border-blue-600 bg-blue-50 px-4 py-3">
                <Text className="text-sm text-slate-600">Jawaban</Text>
                <Text className="text-base font-bold text-slate-900">{guide.example.answer}</Text>
              </View>
            )}
            <View className="mt-4 rounded-lg bg-slate-100 p-3">
              <Text className="font-semibold text-slate-900">Pembahasan</Text>
              <Text className="mt-1 text-slate-700">{guide.example.explanation}</Text>
            </View>
          </Section>

          {notice ? (
            <View className="flex-row items-center rounded-xl border border-amber-300 bg-amber-100 p-3">
              <Icon name="time-outline" className="text-lg text-amber-900" />
              <Text className="ml-2 flex-1 text-amber-900" accessibilityLiveRegion="polite">
                {notice}
              </Text>
            </View>
          ) : null}
          <PrimaryButton label="Mulai latihan" onPress={() => setNotice('Latihan soal segera hadir.')} />
        </ScrollView>
      ) : (
        <Text className="px-5 pt-8 text-center text-slate-600">
          Materi atau jenis soal ini belum ada. Kembali ke beranda lalu pilih lagi.
        </Text>
      )}
    </View>
  );
}
