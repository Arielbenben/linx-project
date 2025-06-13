import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  I18nManager,
} from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useUser } from '../../context/UserContext';
import styles from './LoginScreen.styles';

I18nManager.allowRTL(true);

export default function LoginScreen() {
  const router = useRouter();
  const { setSmbId } = useUser();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setErrorMessage('');
    setLoading(true);

    const url = `https://render-d9ko.onrender.com/api/auth/${encodeURIComponent(
      username
    )}/${encodeURIComponent(password)}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok || !data['is_password_correct']) {
        setErrorMessage('שם המשתמש או הסיסמה שגויים');
      } else {
        setSmbId(data['smb_id']);
        router.replace('/(tabs)/dashboard');
      }
    } catch (error) {
      console.error('API login error:', error);
      setErrorMessage('אירעה שגיאה בשרת');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Linx BI</Text>
      <Text style={styles.title}>Sign In</Text>
      <View style={styles.line} />
      <Text style={styles.subtext}>
        שם משתמש וסיסמא מובאים באפליקציה המרכזית של לינקס
      </Text>

<View style={[styles.inputContainer, { flexDirection: 'row-reverse' }]}>
  <MaterialIcons name="person" size={24} color="#999" style={{ marginLeft: 10 }} />
  <TextInput
    style={styles.textInput}
    placeholder="User Name"
    placeholderTextColor="#999"
    value={username}
    onChangeText={setUsername}
    textAlign="left"
  />
</View>


      {/* Password */}
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

      {/* Error Message */}
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      {/* Loading Spinner or Sign In Button */}
      {loading ? (
        <ActivityIndicator size="large" color="#5f3dc4" style={{ marginTop: 20 }} />
      ) : (
        <TouchableOpacity
          style={[styles.button, !(username && password) && { opacity: 0.5 }]}
          onPress={handleLogin}
          disabled={!(username && password)}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
