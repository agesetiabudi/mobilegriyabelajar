import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { EvilIcons, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [url, setUrl] = useState('');

  const menujuHalaman = () => {
    let cek = url.toLocaleLowerCase().includes('griyabelajar');
    if(cek){
      router.push(`/explore?link=${encodeURIComponent(url)}`)
      setUrl('')
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 30 , backgroundColor: '#000' }}>
        <View style={{ flexDirection: 'row' , justifyContent: 'center', marginTop: 20 }}>
          <Image source={require('@/assets/images/logo.png')} style={{  width: 90 , height: 80 , marginEnd: 20 }} />
          <Image source={require('@/assets/images/logo_nhsc.png')} style={{  width: 90 , height: 80}} />
        </View>
        <View style={{ alignItems: 'center', marginTop: 25 }}>
          <Text style={{ fontSize: 25 , color: Colors.orange.text , fontWeight: 'bold' }}>Lorem Ipsum Dolor</Text>
          <Text style={{ fontSize: 25 , color: Colors.orange.text , fontWeight: 'bold' }}>Lembaga NHSC</Text>
        </View>
        <View style={{ ...styles.containerUrl }}>
          <View style={{ backgroundColor: Colors.orange.backround , padding: 15 , borderRadius: 10 }}>
            <Text style={{ color: '#fff' }}>https://</Text>
          </View>
          <TextInput style={styles.input} placeholder="Link Url" value={url} onChangeText={setUrl} />
        </View>
        <View style={{ marginTop: 40 }}>
          <TouchableOpacity style={styles.button} onPress={() => menujuHalaman()}>
            <FontAwesome5 name="link" size={24} color="white" />
            <Text style={styles.buttonText}> Akses Url</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.button, marginTop: 15 }} onPress={() => router.push('/barcode')}>
            <FontAwesome6 name="qrcode" size={24} color="white" />
            <Text style={{ ...styles.buttonText, marginStart: 5}}>SCAN QR-CODE</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ justifyContent: 'flex-end', flex: 1 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: '#fff' }}>Aplikasi ini hanya di perlukan untuk <Text style={{  color: Colors.orange.text }}>griyabelajar.com</Text></Text>
          <Text style={{ color: '#fff' }}>versi 1.7.3</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerUrl: {
    flexDirection: 'row',
    marginTop: 40
  },
  input: {  
    height: 50,
    borderColor: '#ccc',
    borderWidth: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginStart: 10,
    flex: 1,
    color: '#fff'
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#fd7e14',
    padding: 14,
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
})