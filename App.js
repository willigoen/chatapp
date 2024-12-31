import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Message from "./components/Message";

export default function App() {
    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <View style={styles.header}>
                <Text style={styles.headerText}>ChatDAP</Text>
            </View>
            <ScrollView style={styles.messagesContainer}>
                <Message text="¡Hola! 👋" isUser={false} />
                <Message text="¿Cómo estás? 😊" isUser={true} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingTop: 10,
    },
    header: {
        backgroundColor: "#6200ee",
        padding: 16,
        alignItems: "center",
    },
    headerText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
    messagesContainer: {
        flex: 1,
        padding: 16,
    },
}); 