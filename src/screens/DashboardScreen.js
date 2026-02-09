import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'; // Updated Import
import { LinearGradient } from 'expo-linear-gradient';

export default function DashboardScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#FFFFFF', '#FF741C']} locations={[0.43, 1.0]} style={styles.background} />
            <View style={styles.content}>
                <Text style={{fontFamily: 'Fredoka-Bold', fontSize: 28}}>Hello, Pet Lover!</Text>
                <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.replace('Login')}>
                    <Text style={{color: '#FFF', fontFamily: 'Fredoka-Bold'}}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    background: { ...StyleSheet.absoluteFillObject },
    content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    logoutBtn: { marginTop: 20, backgroundColor: '#000', padding: 15, borderRadius: 10 }
});