import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '../components/Icon';
import { ErrorText, LabeledInput, PrimaryButton } from '../components/auth';

type Level = 'Pelajar' | 'Mahasiswa';
type Profile = { name: string; level: Level; detail: string };

let savedProfile: Profile = { name: '', level: 'Pelajar', detail: '' };

const detailLabel = (level: Level) => (level === 'Pelajar' ? 'Kelas' : 'Jurusan');

export default function ProfilScreen() {
  const [profile, setProfile] = useState(savedProfile);
  const [draft, setDraft] = useState(savedProfile);
  const [editing, setEditing] = useState(!savedProfile.name);
  const [error, setError] = useState('');
  const back = () => (router.canGoBack() ? router.back() : router.replace('/homepage'));

  const save = () => {
    const next = { ...draft, name: draft.name.trim(), detail: draft.detail.trim() };
    if (!next.name || !next.detail) {
      setError('Nama dan ' + detailLabel(next.level).toLowerCase() + ' wajib diisi.');
      return;
    }
    const grade = Number(next.detail);
    if (next.level === 'Pelajar' && !(Number.isInteger(grade) && grade >= 1 && grade <= 12)) {
      setError('Kelas harus angka 1 sampai 12.');
      return;
    }
    savedProfile = next;
    setProfile(next);
    setError('');
    setEditing(false);
  };

  const startEdit = () => {
    setDraft(profile);
    setEditing(true);
  };

  return (
    <View className="flex-1 bg-slate-100">
      <View className="bg-blue-700 pt-safe">
        <View className="w-full max-w-[560px] flex-row items-center self-center px-5 pb-16 pt-2">
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Kembali"
            onPress={back}
            className="h-11 w-11 items-center justify-center rounded-full bg-blue-600"
          >
            <Icon name="arrow-back" className="text-xl text-white" />
          </TouchableOpacity>
          <Text className="ml-3 text-lg font-bold text-white">Profil</Text>
        </View>
      </View>

      <ScrollView
        className="-mt-12"
        contentContainerClassName="w-full max-w-[560px] items-center self-center px-5 pb-8"
        keyboardShouldPersistTaps="handled"
      >
        <View
          accessibilityRole="image"
          accessibilityLabel="Foto profil"
          className="h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-blue-50"
        >
          <Icon name="person" className="text-5xl text-blue-700" />
        </View>
        <Text className="mt-3 text-xl font-bold text-slate-900">{profile.name || 'Nama belum diisi'}</Text>

        <View className="mt-5 w-full rounded-2xl bg-white p-4">
          {editing ? (
            <>
              <LabeledInput
                label="Nama lengkap"
                autoCapitalize="words"
                value={draft.name}
                onChangeText={(name) => setDraft({ ...draft, name })}
              />
              <Text className="mb-1.5 text-sm font-semibold text-slate-700">Status</Text>
              <View className="mb-4 flex-row gap-3">
                {(['Pelajar', 'Mahasiswa'] as Level[]).map((level) => {
                  const selected = draft.level === level;
                  return (
                    <TouchableOpacity
                      key={level}
                      accessibilityRole="radio"
                      accessibilityState={{ checked: selected }}
                      onPress={() => setDraft({ ...draft, level, detail: '' })}
                      className={`h-12 flex-1 flex-row items-center justify-center rounded-xl border ${selected ? 'border-blue-600 bg-blue-50' : 'border-slate-500'}`}
                    >
                      {selected ? <Icon name="checkmark-circle" className="mr-1.5 text-lg text-blue-600" /> : null}
                      <Text className={`font-semibold ${selected ? 'text-blue-700' : 'text-slate-700'}`}>{level}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <LabeledInput
                label={draft.level === 'Pelajar' ? 'Kelas (1-12)' : 'Jurusan'}
                keyboardType={draft.level === 'Pelajar' ? 'number-pad' : 'default'}
                autoCapitalize="words"
                value={draft.detail}
                onChangeText={(detail) => setDraft({ ...draft, detail })}
              />
              <ErrorText message={error} />
              <PrimaryButton label="Simpan" onPress={save} />
              {profile.name ? (
                <TouchableOpacity
                  accessibilityRole="button"
                  onPress={() => {
                    setEditing(false);
                    setError('');
                  }}
                  className="mt-2 h-11 items-center justify-center"
                >
                  <Text className="font-semibold text-blue-700">Batal</Text>
                </TouchableOpacity>
              ) : null}
            </>
          ) : (
            <>
              <View className="flex-row justify-between py-2">
                <Text className="text-slate-600">Status</Text>
                <Text className="font-semibold text-slate-900">{profile.level}</Text>
              </View>
              <View className="flex-row justify-between border-t border-slate-100 py-2">
                <Text className="text-slate-600">{detailLabel(profile.level)}</Text>
                <Text className="font-semibold text-slate-900">{profile.detail}</Text>
              </View>
              <TouchableOpacity
                accessibilityRole="button"
                onPress={startEdit}
                className="mt-3 h-11 flex-row items-center justify-center rounded-xl border border-blue-600"
              >
                <Icon name="create-outline" className="mr-1.5 text-lg text-blue-700" />
                <Text className="font-semibold text-blue-700">Ubah profil</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
