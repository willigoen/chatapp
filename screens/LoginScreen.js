import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        console.log("Botón de inicio de sesión presionado");
        if (!username.trim()) {
            alert("El nombre de usuario no puede estar vacío");
            return;
        }
        if (!password.trim()) {
            ToastAndroid.show("La contraseña no puede estar vacía", ToastAndroid.SHORT);
            return;
        }

        try {
            const storedPassword = await AsyncStorage.getItem(username);
            if (storedPassword === password) {
                navigation.navigate("Chat", { username });
            } else {
                ToastAndroid.show("Usuario o contraseña incorrectos", ToastAndroid.SHORT);
            }
        } catch (error) {
            ToastAndroid.show("No se pudo completar el inicio de sesión", ToastAndroid.SHORT);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <TextInput
                style={styles.input}
                placeholder="Usuario"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button mode="contained" onPress={handleLogin} style={styles.button}>
                Iniciar Sesión
            </Button>
            <Button mode="outlined" onPress={() => navigation.navigate("Register")} style={styles.button}>
                Registrarse
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
        marginBottom: 24,
        textAlign: "center",
        color: "#6200ee",
        fontWeight: "bold",
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: "#fff",
    },
    button: {
        marginTop: 16,
    },
});

export default LoginScreen;
