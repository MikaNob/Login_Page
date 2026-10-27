import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { AuthLayout, ErrorText, GMAIL_PATTERN, LabeledInput, PasswordToggle, PrimaryButton } from '../components/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!email.trim() || !password) {
      setError('Email dan password wajib diisi.');
      return;
    }
    if (!GMAIL_PATTERN.test(email.trim())) {
      setError('Gunakan alamat email @gmail.com.');
      return;
    }
    setError('');
    router.replace('/homepage');
  };

  return (
    <AuthLayout title="Masuk ke MathCode" subtitle="Lanjutkan latihan matematika dan coding kamu.">
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

      <ErrorText message={error} />
      <PrimaryButton label="Masuk" onPress={handleSubmit} />

      <View className="mt-6 flex-row flex-wrap justify-center">
        <Text className="text-slate-600">Belum punya akun? </Text>
        <TouchableOpacity onPress={() => router.push('/daftar')} hitSlop={12}>
          <Text className="font-semibold text-blue-700">Daftar di sini</Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
}
