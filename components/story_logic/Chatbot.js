import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import ChatBubble from "./ChatBubble";
import { speak, isSpeakingAsync, stop } from "expo-speech";
import { FlatList, TextInput } from "react-native-gesture-handler";

const Chatbot = () => {
    const [chat, setChat] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const API_KEY = "---";

    const handleUserInput = async () => {
        let updatedChat = [
            ...chat,
            {
                role: "user",
                parts: [{ text: userInput }],
            },
        ];

        setChat(updatedChat);
        setLoading(true);

        try {
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
                {
                    contents: updatedChat,
                }
            );
            console.log("Gemini Pro API Response:", response.data);
            
            const modelResponse = 
            response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

            if (modelResponse) {
                const updatedChatWithModel = [
                    ...updatedChat,
                    {
                        role: "model",
                        parts: [{text: modelResponse}],
                    },
                ];

                setChat(updatedChatWithModel);
                setUserInput("");

            }
        } 
        catch (error) {
            console.error("Error calling Gemini Pro API", error);
            console.error("Error response:", error.response);
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSpeech = async (text) => {
        if (isSpeaking) {
            stop();
            setIsSpeaking(false);
        } else {
            if (!(await isSpeakingAsync())) {
                speak(text);
                setIsSpeaking(true);
            }
        }
    };
    const renderChatItem = ({item}) => (
        <ChatBubble
        role= {item.role}
        text= {item.parts[0].text}
        onSpeech= {() => handleSpeech(item.parts[0].text)}
        />
    );

    return (
        <View style={styles.container} >
            <Text style= {styles.title}> Gemini Chatbot</Text>
            <FlatList
                data={chat}
                renderItem={renderChatItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.chatContainer}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                    style={styles.input}
                    placeholder="Type your message..."
                    placeholderTextColor="#aaa"
                    value={userInput}
                    onChangeText={setUserInput}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleUserInput}>
                        <Text style={styles.buttonText}>Send</Text>
                    </TouchableOpacity>
                    {loading && <Text style={styles.error}>{error}</Text>}
                </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f8f8f8",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
        marginTop: 40,
        textAlign: "center",
    },
    chatContainer: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    input: {
        flex: 1,
        height: 50,
        marginRight: 10,
        padding: 8,
        borderColor: "#333",
        borderWidth: 1,
        borderRadius: 25,
        color: "#333",
        backgroundColor: "#fff",
    },
    button: {
        padding: 10,
        backgroundColor: "#007AFF",
        borderRadius: 25,
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
    },
    loading: {
        marginTop: 10,
    },
    error: {
        color: "red",
        marginTop: 10,
    }
})

export default Chatbot;