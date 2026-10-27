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
import { Icon } from './Icon';

export const GMAIL_PATTERN = /^[^\s@]+@gmail\.com$/i;

export function AuthLayout({
  title,
  subtitle,
  onBack,
  children,
}: {
  title: string;
  subtitle: string;
  onBack?: () => void;
  children: React.ReactNode;
}) {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 bg-blue-700">
      <View className="pt-safe">
        <View className="w-full max-w-[420px] self-center px-6 pb-8 pt-4">
          {onBack ? (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Kembali"
              onPress={onBack}
              className="mb-4 h-11 w-11 items-center justify-center rounded-full bg-blue-600"
            >
              <Icon name="arrow-back" className="text-xl text-white" />
            </TouchableOpacity>
          ) : (
            <View className="mb-4 h-14 w-14 items-center justify-center rounded-2xl bg-blue-600">
              <Icon name="school" className="text-3xl text-white" />
            </View>
          )}
          <Text className="text-3xl font-bold text-white">{title}</Text>
          <Text className="mt-1 text-base text-blue-100">{subtitle}</Text>
        </View>
      </View>

      <ScrollView
        className="flex-1 rounded-t-3xl bg-white"
        contentContainerClassName="w-full max-w-[420px] self-center px-6 pb-10 pt-8"
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export function LabeledInput({
  label,
  children,
  onFocus,
  onBlur,
  ...props
}: TextInputProps & { label: string; children?: React.ReactNode }) {
  const [focused, setFocused] = useState(false);

  return (
    <View className="mb-4">
      <Text className="mb-1.5 text-sm font-semibold text-slate-700">{label}</Text>
      <View
        className={`flex-row items-center rounded-xl border px-4 ${focused ? 'border-blue-600 bg-white' : 'border-slate-500 bg-slate-50'}`}
      >
        <TextInput
          accessibilityLabel={label}
          className="h-12 flex-1 text-base text-slate-900"
          autoCapitalize="none"
          {...props}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
        />
        {children}
      </View>
    </View>
  );
}

export function PasswordToggle({ shown, onToggle }: { shown: boolean; onToggle: () => void }) {
  return (
    <TouchableOpacity accessibilityRole="button" onPress={onToggle} className="py-3 pl-3">
      <Text className="text-sm font-semibold text-blue-700">{shown ? 'Sembunyikan' : 'Lihat'}</Text>
    </TouchableOpacity>
  );
}

export function ErrorText({ message }: { message: string }) {
  if (!message) return null;
  return (
    <View className="mb-4 flex-row items-center rounded-lg bg-red-50 px-3 py-2.5">
      <Icon name="alert-circle" className="text-lg text-red-700" />
      <Text className="ml-2 flex-1 text-sm text-red-700" accessibilityLiveRegion="polite">
        {message}
      </Text>
    </View>
  );
}

export function PrimaryButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={onPress}
      className="h-12 items-center justify-center rounded-xl bg-blue-700"
    >
      <Text className="text-base font-bold text-white">{label}</Text>
    </TouchableOpacity>
  );
}
