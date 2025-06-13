import { StyleSheet } from 'react-native';

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

export default styles;
