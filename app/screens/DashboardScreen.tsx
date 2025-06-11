import { View, Text } from 'react-native';
import styles from './DashboardScreen.styles';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>שלום!</Text>
      <Text style={styles.subtitle}>ברוך הבא ללוח הבקרה שלך</Text>
    </View>
  );
}
