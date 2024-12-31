import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async () => {
        console.log("Botón de registro presionado");
        if (!username.trim()) {
            alert("El nombre de usuario no puede estar vacío");
            return;
        }
        if (password.length < 6) {
            ToastAndroid.show("La contraseña debe tener al menos 6 caracteres", ToastAndroid.SHORT);
            return;
        }
        if (password !== confirmPassword) {
            ToastAndroid.show("Las contraseñas no coinciden", ToastAndroid.SHORT);
            return;
        }

        try {
            await AsyncStorage.setItem(username, password);
            ToastAndroid.show("Registro completado", ToastAndroid.SHORT);
            setTimeout(() => navigation.navigate("Login"), 1500);
        } catch (error) {
            ToastAndroid.show("No se pudo completar el registro", ToastAndroid.SHORT);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>
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
            <TextInput
                style={styles.input}
                placeholder="Confirmar Contraseña"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <Button mode="contained" onPress={handleRegister} style={styles.button}>
                Registrarse
            </Button>
            <Button mode="outlined" onPress={() => navigation.navigate("Login")} style={styles.button}>
                Iniciar Sesión
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

export default RegisterScreen;
