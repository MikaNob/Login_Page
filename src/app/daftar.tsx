import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { AuthLayout, ErrorText, GMAIL_PATTERN, LabeledInput, PasswordToggle, PrimaryButton } from '../components/auth';

export default function DaftarScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // A page opened directly (web refresh, deep link) has no history to go back to
  const backToLogin = () => (router.canGoBack() ? router.back() : router.replace('/'));

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !password || !confirm) {
      setError('Semua kolom wajib diisi.');
      return;
    }
    if (!GMAIL_PATTERN.test(email.trim())) {
      setError('Gunakan alamat email @gmail.com.');
      return;
    }
    if (password !== confirm) {
      setError('Konfirmasi password tidak sama.');
      return;
    }
    setError('');
    router.replace('/homepage');
  };

  return (
    <AuthLayout
      title="Buat akun baru"
      subtitle="Daftar pakai email @gmail.com, lalu langsung mulai latihan."
      onBack={backToLogin}
    >
      <LabeledInput label="Nama lengkap" autoCapitalize="words" value={name} onChangeText={setName} />
      <LabeledInput
        label="Email (@gmail.com)"
        keyboardType="email-address"
        autoComplete="email"
        value={email}
        onChangeText={setEmail}
      />
      <LabeledInput label="Password" secureTextEntry={!showPassword} value={password} onChangeText={setPassword}>
        <PasswordToggle shown={showPassword} onToggle={() => setShowPassword((v) => !v)} />
      </LabeledInput>
      <LabeledInput label="Ulangi password" secureTextEntry={!showPassword} value={confirm} onChangeText={setConfirm} />

      <ErrorText message={error} />
      <PrimaryButton label="Daftar" onPress={handleSubmit} />

      <View className="mt-6 flex-row flex-wrap justify-center">
        <Text className="text-slate-600">Sudah punya akun? </Text>
        <TouchableOpacity onPress={backToLogin} hitSlop={12}>
          <Text className="font-semibold text-blue-700">Masuk di sini</Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
}
