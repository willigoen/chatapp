import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Message = ({ text, isUser }) => {
    return (
        <View style={[styles.message, isUser ? styles.userMessage : styles.otherMessage]}>
            <Text style={styles.messageText}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    message: {
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        maxWidth: "80%",
    },
    userMessage: {
        alignSelf: "flex-end",
        backgroundColor: "#6200ee",
    },
    otherMessage: {
        alignSelf: "flex-start",
        backgroundColor: "#fff",
    },
    messageText: {
        color: "#000",
    },
});

export default Message; 