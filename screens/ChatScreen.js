import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";

const ChatScreen = ({ route }) => {
    const { username } = route.params;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadMessages();
    }, []);

    const loadMessages = async () => {
        setIsLoading(true);
        try {
            const storedMessages = await AsyncStorage.getItem("messages");
            if (storedMessages) {
                setMessages(JSON.parse(storedMessages));
            }
        } catch (error) {
            console.error("Error loading messages:", error);
        }
        setIsLoading(false);
    };

    const handleSend = async () => {
        if (!newMessage.trim()) return;

        const message = {
            id: Date.now(),
            text: newMessage,
            username,
            timestamp: new Date().toLocaleTimeString(),
        };

        const updatedMessages = [...messages, message];
        setMessages(updatedMessages);
        setNewMessage("");

        try {
            await AsyncStorage.setItem("messages", JSON.stringify(updatedMessages));
        } catch (error) {
            console.error("Error saving message:", error);
        }
    };

    const handleClear = async () => {
        try {
            await AsyncStorage.removeItem("messages");
            setMessages([]);
        } catch (error) {
            console.error("Error clearing messages:", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Chat</Text>
                <Button mode="contained" onPress={handleClear}>
                    Borrar Mensajes
                </Button>
            </View>
            <ScrollView style={styles.messagesContainer}>
                {messages.map((msg) => (
                    <View key={msg.id} style={styles.message}>
                        <Text style={styles.messageUsername}>{msg.username}</Text>
                        <Text style={styles.messageText}>{msg.text}</Text>
                        <Text style={styles.messageTimestamp}>{msg.timestamp}</Text>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Escribe un mensaje..."
                    value={newMessage}
                    onChangeText={setNewMessage}
                />
                {isLoading ? (
                    <ActivityIndicator color="#6200ee" />
                ) : (
                    <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                        <Text style={styles.sendButtonText}>Enviar</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    header: {
        backgroundColor: "#6200ee",
        padding: 16,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
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
    message: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    messageUsername: {
        fontWeight: "bold",
        color: "#6200ee",
    },
    messageText: {
        marginTop: 4,
    },
    messageTimestamp: {
        fontSize: 12,
        color: "#666",
        marginTop: 4,
    },
    inputContainer: {
        flexDirection: "row",
        padding: 8,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#ccc",
    },
    input: {
        flex: 1,
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 16,
        marginRight: 8,
        backgroundColor: "#fff",
    },
    sendButton: {
        backgroundColor: "#6200ee",
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    sendButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default ChatScreen;
