import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  line: {
    height: 2,
    backgroundColor: '#5f3dc4',
    width: 70,
    marginBottom: 20,
  },
  subtext: {
    color: '#555',
    fontSize: 14,
    marginBottom: 20,
    writingDirection: 'rtl',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#5f3dc4',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
  color: 'red',
  fontSize: 14,
  marginBottom: 10,
  textAlign: 'center',
  },
});

export default styles;
