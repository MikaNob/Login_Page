import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Icon } from '../components/Icon';

// TODO: read from the signed-in account once accounts are stored
const USER_NAME = 'Nama Pengguna';

export default function ProfilScreen() {
  // A page opened directly (web refresh, deep link) has no history to go back to
  const back = () => (router.canGoBack() ? router.back() : router.replace('/homepage'));

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

      <View className="-mt-12 w-full max-w-[560px] items-center self-center px-5">
        <View
          accessibilityRole="image"
          accessibilityLabel="Foto profil"
          className="h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-blue-50"
        >
          <Icon name="person" className="text-5xl text-blue-700" />
        </View>
        <Text className="mt-3 text-xl font-bold text-slate-900">{USER_NAME}</Text>
      </View>
    </View>
  );
}
