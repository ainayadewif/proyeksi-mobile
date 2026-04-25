import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { login } from "../src/services/api";

const ORANGE_BG = "#FF7444";
const ORANGE_BLOB = "#FF5A1F";
const SOFT_BG = "#F2F2F2";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email dan password wajib diisi");
      return;
    }

    try {
      setLoading(true);
      const res = await login(email, password);
      console.log("Login sukses:", res);
      Alert.alert("Success", "Login berhasil");
    } catch (error) {
      Alert.alert("Gagal", "Email atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
    >
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.orangeTop}>
            <View style={styles.topCircle} />
            <View style={styles.leftCircle} />

            <View style={styles.brandWrap}>
              <View style={styles.logoPlaceholder}>
                <Image
                  source={require("../assets/images/logo_kotaSemarang.png")}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
              <Text style={styles.brandText}>SIKETAN</Text>
            </View>
          </View>

          <View style={styles.grayBottom}>
            <Text style={styles.title}>Login</Text>

            <Text style={styles.label}>Email</Text>
            <View style={styles.inputRow}>
              <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="demo@email.com"
                placeholderTextColor="#969696"
                style={styles.input}
              />
            </View>
            <View style={styles.inputUnderline} />

            <Text style={styles.label}>Password</Text>
            <View style={styles.inputRow}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholder="Enter your password"
                placeholderTextColor="#969696"
                style={styles.input}
              />
              <Pressable onPress={() => setShowPassword((prev) => !prev)} hitSlop={10}>
                <Ionicons name={showPassword ? "eye-off" : "eye"} size={22} color="#666" />
              </Pressable>
            </View>
            <View style={styles.inputUnderline} />

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
              <Text style={styles.loginButtonText}>{loading ? "Loading..." : "Login"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: ORANGE_BG,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: ORANGE_BG,
  },
  orangeTop: {
    flex: 38,
    backgroundColor: ORANGE_BG,
    alignItems: "center",
    justifyContent: "center",
  },
  grayBottom: {
    flex: 62,
    backgroundColor: SOFT_BG,
    paddingHorizontal: 26,
    paddingTop: 46,
    paddingBottom: 32,
  },
  topCircle: {
    position: "absolute",
    right: -45,
    top: -28,
    width: 124,
    height: 124,
    borderRadius: 62,
    backgroundColor: ORANGE_BLOB,
  },
  leftCircle: {
    position: "absolute",
    left: -45,
    bottom: -28,
    width: 124,
    height: 124,
    borderRadius: 62,
    backgroundColor: ORANGE_BLOB,
  },
  brandWrap: {
    alignItems: "center",
    gap: 12,
    marginTop: 18,
  },
  logoPlaceholder: {
    width: 46,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  brandText: {
    color: "#FFFFFF",
    fontSize: 31,
    fontFamily: "Poppins_800ExtraBold",
    letterSpacing: 0.5,
  },
  title: {
    color: "#2F2F2F",
    fontSize: 37,
    fontFamily: "Poppins_800ExtraBold",
    marginBottom: 28,
  },
  label: {
    color: "#575757",
    fontSize: 19,
    fontFamily: "Poppins_500Medium",
    marginBottom: 4,
  },
  inputRow: {
    minHeight: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    color: "#2F2F2F",
    fontSize: 17,
    fontFamily: "Poppins_400Regular",
    paddingVertical: 6,
  },
  eye: {
    fontSize: 18,
    color: "#8E8E8E",
    marginLeft: 8,
  },
  inputUnderline: {
    height: 1.8,
    backgroundColor: ORANGE_BG,
    marginBottom: 18,
  },
  loginButton: {
    marginTop: 26,
    borderRadius: 10,
    minHeight: 50,
    backgroundColor: ORANGE_BG,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontFamily: "Poppins_700Bold",
    letterSpacing: 0.2,
  },
});
