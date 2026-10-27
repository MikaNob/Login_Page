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

const GMAIL_PATTERN = /^[^\s@]+@gmail\.com$/i;

function Field({ icon, ...props }: TextInputProps & { icon: keyof typeof Ionicons.glyphMap }) {
  return (
    <View className="mb-3 flex-row items-center rounded-xl border border-slate-200 bg-slate-50 px-4">
      <Ionicons name={icon} size={20} color="#64748b" />
      <TextInput
        className="ml-3 h-12 flex-1 text-base text-slate-800"
        placeholderTextColor="#64748b"
        autoCapitalize="none"
        {...props}
      />
    </View>
  );
}

export default function LoginScreen() {
  const [mode, setMode] = useState<Mode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const isLogin = mode === 'login';

  const switchMode = (next: Mode) => {
    setMode(next);
    setPassword('');
    setConfirm('');
    setError('');
  };

  const handleSubmit = () => {
    if (!email.trim() || !password || (!isLogin && !name.trim())) {
      setError('Semua kolom wajib diisi.');
      return;
    }
    if (!GMAIL_PATTERN.test(email.trim())) {
      setError('Gunakan alamat email @gmail.com.');
      return;
    }
    if (!isLogin && password !== confirm) {
      setError('Konfirmasi password tidak sama.');
      return;
    }
    setError('');
    router.replace('/homepage');
  };

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
                onPress={() => switchMode(m)}
                className={`flex-1 items-center rounded-lg py-2 ${mode === m ? 'bg-white shadow-sm' : ''}`}
              >
                <Text className={`font-semibold ${mode === m ? 'text-sky-700' : 'text-slate-500'}`}>
                  {m === 'login' ? 'Masuk' : 'Daftar'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {!isLogin && (
            <Field icon="id-card-outline" placeholder="Nama lengkap" autoCapitalize="words" value={name} onChangeText={setName} />
          )}
          <Field
            icon="mail-outline"
            placeholder="nama@gmail.com"
            keyboardType="email-address"
            autoComplete="email"
            value={email}
            onChangeText={setEmail}
          />

          <View className="mb-3 flex-row items-center rounded-xl border border-slate-200 bg-slate-50 px-4">
            <Ionicons name="lock-closed-outline" size={20} color="#64748b" />
            <TextInput
              className="ml-3 h-12 flex-1 text-base text-slate-800"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#64748b"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowPassword((v) => !v)} hitSlop={8}>
              <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#64748b" />
            </TouchableOpacity>
          </View>

          {!isLogin && (
            <Field
              icon="lock-closed-outline"
              placeholder="Konfirmasi password"
              secureTextEntry={!showPassword}
              value={confirm}
              onChangeText={setConfirm}
            />
          )}

          {error ? (
            <Text className="mb-2 text-sm text-red-600" accessibilityLiveRegion="polite">
              {error}
            </Text>
          ) : null}

          <TouchableOpacity
            onPress={handleSubmit}
            className="mt-2 h-12 items-center justify-center rounded-xl bg-sky-700"
          >
            <Text className="text-base font-bold text-white">{isLogin ? 'Masuk' : 'Buat Akun'}</Text>
          </TouchableOpacity>

          <View className="mt-5 flex-row justify-center">
            <Text className="text-sm text-slate-500">
              {isLogin ? 'Belum punya akun? ' : 'Sudah punya akun? '}
            </Text>
            <TouchableOpacity onPress={() => switchMode(isLogin ? 'register' : 'login')}>
              <Text className="text-sm font-semibold text-sky-700">{isLogin ? 'Daftar' : 'Masuk'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
