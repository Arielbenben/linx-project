import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '../../context/UserContext';
import styles from './ProfileScreen.styles'; 

export default function ProfileScreen() {
  const router = useRouter();
  const { setSmbId } = useUser();

  const handleLogout = () => {
    setSmbId(null);
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>פרופיל המשתמש</Text>
      <Text style={styles.detail}>שם: משתמש לדוגמה</Text>
      <Text style={styles.detail}>דוא"ל: user@example.com</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>התנתק</Text>
      </TouchableOpacity>
    </View>
  );
}
