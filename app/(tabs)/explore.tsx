import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, Linking, AccessibilityInfo, AppState } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import WebView from 'react-native-webview';
import { useRouter } from 'expo-router';
import { useRoute } from '@react-navigation/native';

const ExplorePage: React.FC = () => {
  const router  = useRouter();
  const route   = useRoute();
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };

    lockOrientation();
    promptGuidedAccess()
    // checkGuidedAccessStatus()

    console.log(`https://${route.params?.link}/#/`);
    
  }, []);

  const checkGuidedAccessStatus = () => {
    let lastAccessibilityState = false;

    AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        // Periksa status aksesibilitas
        AccessibilityInfo.isBoldTextEnabled().then((isBoldTextEnabled) => {
          if (isBoldTextEnabled !== lastAccessibilityState) {
            // Jika status aksesibilitas berubah
            if (isBoldTextEnabled) {
              // Jika teks tebal diaktifkan, kemungkinan pengguna melakukan aktivasi Guided Access
              console.log('Guided Access diaktifkan');
              // Lakukan sesuatu karena Guided Access mungkin diaktifkan
            } else {
              // Jika teks tebal tidak diaktifkan, kemungkinan pengguna keluar dari Guided Access
              console.log('Guided Access tidak diaktifkan');
              // Lakukan sesuatu karena Guided Access mungkin dinonaktifkan
            }
            // Simpan status aksesibilitas terbaru
            lastAccessibilityState = isBoldTextEnabled;
          }
        });
      }
    });
  };

  const promptGuidedAccess = () => {
    Alert.alert(
      "Activate Guided Access",
      "Please enable Guided Access to lock this app in kiosk mode. Go to Settings > Accessibility > Guided Access and activate it.",
      [
        {
          text: "Open Settings",
          onPress: () => Linking.openURL('App-Prefs:root=ACCESSIBILITY&path=GUIDED_ACCESS')
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
       <WebView
          source={{ uri: `https://${route.params?.link}/#/` }}
          style={{ flex: 1 }}
        />
      {/* {
        permission ? (<Text>Aplikasi Bisa di akses</Text>) : (
          <View>
            <Text style={styles.instructions}>
              To use this app in kiosk mode, please enable Guided Access.
            </Text>
            <Button title="Open Settings" onPress={() => Linking.openURL('App-Prefs:root=ACCESSIBILITY&path=GUIDED_ACCESS')} />
          </View>
        )
      } */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default ExplorePage;
