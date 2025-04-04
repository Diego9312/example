import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const LoginScreen = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [focusedInput, setFocusedInput] = useState<string | null>(null);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            {/* Campo de usuário */}
            <TextInput
                style={[
                    styles.input,
                    focusedInput === "username" && styles.inputFocused
                ]}
                placeholder="Usuário"
                value={username}
                onChangeText={setUsername}
                onFocus={() => setFocusedInput("username")}
                onBlur={() => setFocusedInput(null)}
            />

            {/* Campo de senha */}
            <View style={styles.passwordContainer}>
                <TextInput
                    style={[
                        styles.input,
                        focusedInput === "password" && styles.inputFocused
                    ]}
                    placeholder="Senha"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => setFocusedInput("password")}
                    onBlur={() => setFocusedInput(null)}
                />
                {/* Ícone de visualizar senha */}
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                    <Text style={styles.showPasswordText}>{showPassword ? "👁️" : "🩺"}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.optionsContainer}>
                <TouchableOpacity>
                    <Text style={styles.optionText}>Esqueceu a senha?</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.optionText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => console.log("Login")}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        height: 45,
        borderColor: "#ccc",
        borderWidth: 2,
        borderRadius: 8,
        paddingLeft: 10,
        marginBottom: 10,
        backgroundColor: "#F9F9F9",
    },
    inputFocused: {
        borderColor: "#28a745", // Borda verde ao focar
    },
    passwordContainer: {
        width: "100%",
        position: "relative", // Mantém alinhamento correto
    },
    eyeButton: {
        position: "absolute",
        right: 10, // Mantém o botão dentro do campo
        top: 12, // Ajusta a posição vertical do ícone
    },
    showPasswordText: {
        fontSize: 18,
    },
    optionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 5,
    },
    optionText: {
        color: "#007bff", // Azul para as opções
        fontWeight: "bold",
    },
    button: {
        marginTop: 20,
        backgroundColor: "#28a745", // Verde
        paddingVertical: 12,
        width: "100%",
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
