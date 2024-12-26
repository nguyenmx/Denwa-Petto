import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";
import {Ionicons} from "react-native-vector-icons";
// import back from '../images/PlayableAnimals/capyKnife.gif';

const ChatBubble = ({ role, text, onSpeech, icon}) => {
    return (
        <View
        style={[
            styles.chatItemContainer,
            role === "user" ? styles.userAlignment : styles.modelAlignment,
        ]}
        >
        {role === "model" && (
            <TouchableOpacity onPress={onSpeech} style={styles.iconContainer}>
                <Image source={icon} style={styles.modelIcon} />
            </TouchableOpacity>
        )}
        <View
            style={[
                styles.chatItem,
                role === "user" ? styles.userChatItem : styles.modelChatItem,
            ]}
        >
            <Text style={styles.chatText}>{text}</Text>
        </View>
    </View>
    
    )
}

const styles = StyleSheet.create({
    chatItemContainer: {
        flexDirection: "row",
        marginBottom: 10,
    },
    userAlignment: {
        justifyContent: "flex-end", // Align to the right
    },
    modelAlignment: {
        justifyContent: "flex-start", // Align to the left
    },
    chatItem: {
        marginBottom: 10,
        padding: 10,
        borderRadius: 13,
        maxWidth: "70%",
        position: "relative",
    },
    chatItemContainer: {
        flexDirection: "row", // Align icon and bubble horizontally
        alignItems: "flex-start", // Align items to the top
        marginBottom: 10,
    },
    chatContainer: {
        flexDirection: "row"
    },
    userChatItem: {
        alignSelf: "flex-end",
        backgroundColor: "#DFA9D0",
    },
    modelChatItem: {
        alignSelf: "flex-start",
        backgroundColor: "#E4E4E4",
    },
    chatText: {
        fontSize: 18,
        color: "black",
    },
    modelIcon: {
        width: 45,
        height: 45,
        borderRadius: 35, // Half of width or height for a perfect circle
        borderColor: "grey",
        borderWidth: 1, // Thickness of the border
        overflow: "hidden", // Ensures the image stays within the circle
    }

})
export default ChatBubble;