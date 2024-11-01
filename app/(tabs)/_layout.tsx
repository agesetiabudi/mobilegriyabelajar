import { Tabs, router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRoute } from '@react-navigation/native'; 
import { AntDesign } from '@expo/vector-icons';

function TabLayout() {
  const route = useRoute();
  const routeName = route.name;

  return (
    <View style={styles.navbar}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {
            routeName == 'explore' && <TouchableOpacity style={{ marginEnd: 10 }} onPress={() => router.push('/')}>
              <AntDesign name="close" size={24} color="white" />
            </TouchableOpacity>
          }
          <Text style={styles.navbarTitle}>Lorem ipsum</Text>
        </View>
        <Text style={styles.navbarIndicator}>08:24</Text>
      </View>
    </View>
  );
}

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        header: () => <TabLayout />,
        tabBarStyle: { display: 'none' },
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#fd7e14',
    width: '100%',
    height: 55,
    padding: 15,
  },
  navbarTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: 'bold'
  },
  navbarIndicator: {
    fontSize: 17,
    color: "#fff",
    fontWeight: 'bold'
  }
});
