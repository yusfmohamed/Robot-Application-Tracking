import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.welcome}>Welcome !</Text>

      <TextInput style={styles.input} placeholder="Email" placeholderTextColor={colors.subtext} />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor={colors.subtext} secureTextEntry />

      <Text style={styles.forgot}>forgot password ?</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Don't have an account? <Text style={{ fontWeight: 'bold' }}>Register</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30 },
  logo: { width: 140, height: 60, marginBottom: 20 },
  welcome: { fontSize: 26, fontWeight: 'bold', color: colors.text, marginBottom: 30 },
  input: { width: '100%', backgroundColor: colors.inputBg, borderWidth: 1, borderColor: colors.inputBorder, borderRadius: 14, padding: 16, marginBottom: 14, fontSize: 15, color: colors.text },
  forgot: { alignSelf: 'flex-end', color: colors.subtext, marginBottom: 16, fontSize: 13 },
  button: { width: '100%', backgroundColor: colors.button, borderRadius: 14, padding: 16, alignItems: 'center', marginBottom: 20 },
  buttonText: { color: colors.white, fontWeight: 'bold', fontSize: 16 },
  link: { color: colors.subtext, fontSize: 13 },
});