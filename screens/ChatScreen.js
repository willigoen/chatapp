import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Message from "../components/Message";

const ChatScreen = ({ route }) => {
    const { username } = route.params;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollViewRef = useRef(); // Referencia para el ScrollView

    // Cargar mensajes al iniciar la pantalla
    useEffect(() => {
        const loadMessages = async () => {
            try {
                const storedMessages = await AsyncStorage.getItem("messages");
                if (storedMessages) {
                    setMessages(JSON.parse(storedMessages));
                }
            } catch (error) {
                console.error("Error al cargar mensajes:", error);
            }
        };
        loadMessages();
    }, []);

    // Guardar mensajes cuando cambien
    useEffect(() => {
        const saveMessages = async () => {
            try {
                await AsyncStorage.setItem("messages", JSON.stringify(messages));
            } catch (error) {
                console.error("Error al guardar mensajes:", error);
            }
        };
        saveMessages();
    }, [messages]);

    // Desplazarse al final al enviar un mensaje
    useEffect(() => {
        if (messages.length > 0) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    const handleSend = () => {
        if (newMessage.trim()) {
            setIsLoading(true);
            setTimeout(() => {
                setMessages([...messages, { id: messages.length + 1, text: newMessage, isUser: true }]);
                setNewMessage("");
                setIsLoading(false);
            }, 1000);
        }
    };

    const handleClear = async () => {
        try {
            await AsyncStorage.removeItem("messages");
            setMessages([]);
        } catch (error) {
            console.error("Error al borrar mensajes:", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>ChatDAP - {username}</Text>
                <Button title="Borrar" onPress={handleClear} color="#fff" />
            </View>
            <ScrollView
                ref={scrollViewRef}
                style={styles.messagesContainer}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            >
                {messages.map((message) => (
                    <Message key={message.id} text={message.text} isUser={message.isUser} />
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
                    <Button title="Enviar" onPress={handleSend} />
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
    inputContainer: {
        flexDirection: "row",
        padding: 8,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#ccc",
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 16,
        marginRight: 8,
    },
});

export default ChatScreen;
