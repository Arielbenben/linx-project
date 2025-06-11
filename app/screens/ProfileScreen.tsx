import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    // כאן אפשר בעתיד גם לנקות טוקן / זיכרון
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3d5afe',
    marginBottom: 20,
  },
  detail: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: '#e53935',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
