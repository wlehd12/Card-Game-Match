import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headertext: {
    fontSize: 35,
  },
  headerImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  button: {
    flex: 1,
    backgroundColor: 'pink',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionButton: {
    color: 'black',
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    color: 'white',
    width: '80%',
    borderRadius: 5,
    marginBottom: 16,
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerButton: {
    backgroundColor: 'violet',
    padding: 15,
    borderRadius: 5,
  },
  resultContainer: {
    marginTop: 16,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    color: 'black',
    fontSize: 18,
  },
});