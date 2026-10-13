import React, { useState } from 'react';
import { 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    console.log('Mencoba login dengan username:', username);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      className="flex-1 bg-[#8ad6bfa8] items-center justify-center p-5"
    >
      <View className="bg-[#ebd0d0] rounded-[24px] p-7 w-full max-w-[400px] shadow-xl elevation-10">
        
        <View className="items-center mb-8">
          <Ionicons name="school" size={64} color="#e4c309" />
          <Text className="text-[28px] font-extrabold text-[#e69a0d] mt-4">Education Login</Text>
          <Text className="text-[14px] text-[#ca6608] mt-2 text-center leading-5">
            Login untuk dapatkan materi yang mantap JIWA ASIK!!!!!!
          </Text>
        </View>

        <View className="flex-row items-center bg-[#fdfeff] rounded-xl mb-4 px-4 border border-[#022346]">
          <Ionicons name="person-outline" size={20} color="#666" style={{ marginRight: 12 }} />
          <TextInput
            className="flex-1 h-[55px] text-[16px] text-[#333]"
            placeholder="Username Mahasiswa/Siswa"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
        </View>

        <View className="flex-row items-center bg-[#fdfeff] rounded-xl mb-4 px-4 border border-[#022346]">
          <Ionicons name="lock-closed-outline" size={20} color="#666" style={{ marginRight: 12 }} />
          <TextInput
            className="flex-1 h-[55px] text-[16px] text-[#333]"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity 
          className="bg-[#718aaf] rounded-xl h-[55px] items-center justify-center mt-5 shadow-md elevation-5" 
          onPress={handleLogin}
        >
          <Text className="text-white text-[18px] font-bold">JUMP IN</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}