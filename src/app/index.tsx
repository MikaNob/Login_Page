import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

type Mode = 'login' | 'register';

function Field({ icon, ...props }: TextInputProps & { icon: keyof typeof Ionicons.glyphMap }) {
  return (
    <View className="mb-3 flex-row items-center rounded-xl border border-slate-200 bg-slate-50 px-4">
      <Ionicons name={icon} size={20} color="#64748b" />
      <TextInput
        className="ml-3 h-12 flex-1 text-base text-slate-800"
        placeholderTextColor="#94a3b8"
        autoCapitalize="none"
        {...props}
      />
    </View>
  );
}

export default function LoginScreen() {
  const [mode, setMode] = useState<Mode>('login');
  const [showPassword, setShowPassword] = useState(false);

  const isLogin = mode === 'login';

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-sky-100"
    >
      <ScrollView
        contentContainerClassName="flex-grow items-center justify-center p-5"
        keyboardShouldPersistTaps="handled"
      >
        <View className="w-full max-w-[400px] rounded-3xl bg-white p-6 shadow-md">
          <View className="mb-6 items-center">
            <View className="flex-row gap-2">
              <View className="h-14 w-14 items-center justify-center rounded-2xl bg-sky-100">
                <Ionicons name="calculator" size={28} color="#0284c7" />
              </View>
              <View className="h-14 w-14 items-center justify-center rounded-2xl bg-amber-100">
                <Ionicons name="code-slash" size={28} color="#d97706" />
              </View>
            </View>
            <Text className="mt-4 text-2xl font-bold text-slate-800">MathCode</Text>
            <Text className="mt-1 text-center text-sm text-slate-500">
              Belajar matematika & coding lewat soal isian dan pilihan ganda
            </Text>
          </View>

          <View className="mb-5 flex-row rounded-xl bg-slate-100 p-1">
            {(['login', 'register'] as const).map((m) => (
              <TouchableOpacity
                key={m}
                onPress={() => setMode(m)}
                className={`flex-1 items-center rounded-lg py-2 ${mode === m ? 'bg-white shadow-sm' : ''}`}
              >
                <Text className={`font-semibold ${mode === m ? 'text-sky-600' : 'text-slate-500'}`}>
                  {m === 'login' ? 'Masuk' : 'Daftar'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {!isLogin && <Field icon="id-card-outline" placeholder="Nama lengkap" autoCapitalize="words" />}
          <Field icon="person-outline" placeholder="Username" />

          <View className="mb-3 flex-row items-center rounded-xl border border-slate-200 bg-slate-50 px-4">
            <Ionicons name="lock-closed-outline" size={20} color="#64748b" />
            <TextInput
              className="ml-3 h-12 flex-1 text-base text-slate-800"
              placeholder="Password"
              placeholderTextColor="#94a3b8"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowPassword((v) => !v)} hitSlop={8}>
              <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#64748b" />
            </TouchableOpacity>
          </View>

          {!isLogin && (
            <Field icon="lock-closed-outline" placeholder="Konfirmasi password" secureTextEntry={!showPassword} />
          )}

          <TouchableOpacity
            onPress={() => router.replace('/homepage')}
            className="mt-2 h-12 items-center justify-center rounded-xl bg-sky-600"
          >
            <Text className="text-base font-bold text-white">{isLogin ? 'Masuk' : 'Buat Akun'}</Text>
          </TouchableOpacity>

          <View className="mt-5 flex-row justify-center">
            <Text className="text-sm text-slate-500">
              {isLogin ? 'Belum punya akun? ' : 'Sudah punya akun? '}
            </Text>
            <TouchableOpacity onPress={() => setMode(isLogin ? 'register' : 'login')}>
              <Text className="text-sm font-semibold text-sky-600">{isLogin ? 'Daftar' : 'Masuk'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
