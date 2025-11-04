import { Platform, Alert } from 'react-native';
// gerar o alert q n funfa nessa versao
export default function showAlert(title, message) {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n${message}`);
  } else {
    Alert.alert(title, message);
  }
}