import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput, Alert, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { db, auth } from '../../../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const { width } = Dimensions.get('window');

export default function EditProfileScreen({ navigation }) {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
            const fetchUser = async () => {
                const docSnap = await getDoc(doc(db, "users", user.uid));
                if (docSnap.exists()) {
                    setName(docSnap.data().name);
                    setImage(docSnap.data().profilePic);
                }
            };
            fetchUser();
        }
    }, []);

    const handleSave = async () => {
        try {
            await updateDoc(doc(db, "users", user.uid), {
                name: name,
                profilePic: image
            });
            Alert.alert("Success", "Profile updated for the app!");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Error", "Could not save profile.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Edit Profile</Text>
            <TouchableOpacity onPress={async () => {
                let res = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [1, 1] });
                if (!res.canceled) setImage(res.assets[0].uri);
            }}>
                <Image source={{ uri: image || 'https://via.placeholder.com/150' }} style={styles.img} />
                <Text style={styles.link}>Change Photo</Text>
            </TouchableOpacity>
            
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Your Name" />
            
            <TouchableOpacity style={styles.btn} onPress={handleSave}>
                <Text style={styles.btnText}>Save Profile</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#FFF' },
    header: { fontSize: 22, fontFamily: 'Fredoka-Bold', marginVertical: 20 },
    img: { width: 120, height: 120, borderRadius: 60 },
    link: { color: '#FF741C', marginTop: 10, fontFamily: 'Fredoka-SemiBold' },
    input: { width: width - 40, borderBottomWidth: 1, borderColor: '#EEE', padding: 10, marginTop: 30, fontSize: 18 },
    btn: { backgroundColor: '#FF741C', padding: 18, borderRadius: 15, width: width - 40, marginTop: 40, alignItems: 'center' },
    btnText: { color: 'white', fontFamily: 'Fredoka-Bold' }
});