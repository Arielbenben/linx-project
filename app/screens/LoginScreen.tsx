import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './LoginScreen.styles';
import { useRouter } from 'expo-router';

I18nManager.allowRTL(true);

// קריאת API אמיתית
async function loginWithAPI(username: string, password: string): Promise<boolean> {
  try {
    const url = `https://render-d9ko.onrender.com/api/auth/${encodeURIComponent(username)}/${encodeURIComponent(password)}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data['is_password_correct'] === true;
  } catch (error) {
    console.error('API login error:', error);
    return false;
  }
}


export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    setErrorMessage('');

    const success = await loginWithAPI(username, password);

    if (success) {
      router.replace('../(tabs)/dashboard');
    } else {
      setErrorMessage('שם המשתמש או הסיסמה שגויים');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>BI By Linx</Text>
      <Text style={styles.title}>Sign In</Text>
      <View style={styles.line} />
      <Text style={styles.subtext}>
        שם משתמש וסיסמא מובאים באפליקציה המרכזית של לינקס
      </Text>

      {/* שם משתמש */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="User Name"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          textAlign="left"
        />
      </View>

      {/* סיסמה */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          textAlign="left"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <MaterialCommunityIcons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color="#999"
          />
        </TouchableOpacity>
      </View>

      {/* הודעת שגיאה */}
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      {/* כפתור התחברות */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}
