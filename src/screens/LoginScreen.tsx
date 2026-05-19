import { Ionicons } from "@expo/vector-icons";
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
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { login } from "../services/api";

const ORANGE_BG = "#FF7444";
const ORANGE_BLOB = "#FF5A1F";
const SOFT_BG = "#F2F2F2";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const normalizedEmail = email.trim();
    const normalizedPassword = password.trim();

    if (!normalizedEmail || !normalizedPassword) {
      Alert.alert("Error", "Email dan password wajib diisi");
      return;
    }

    try {
      setLoading(true);
      await login(normalizedEmail, normalizedPassword);
      Alert.alert("Success", "Login berhasil");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Terjadi kesalahan saat login";
      Alert.alert("Gagal", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* ORANGE TOP */}
      <View style={styles.orangeTop}>
        <View style={styles.topCircle} />
        <View style={styles.leftCircle} />

        <View style={styles.brandWrap}>
          <View style={styles.logoPlaceholder}>
            <Image
              source={require("../../assets/images/logo_kotaSemarang.png")}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.brandText}>SIKETAN</Text>
        </View>

        <View style={styles.waveWrapper}>
          <Svg
            height="100%"
            width="100%"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <Path
              fill={SOFT_BG}
              d="M0,192L60,170.7C120,149,240,107,360,106.7C480,107,600,149,720,181.3C840,213,960,270,1080,290C1200,310,1320,280,1380,260L1440,240V320H0Z"
            />
          </Svg>
        </View>
      </View>

      {/* FORM AREA */}
      <KeyboardAvoidingView
        style={{ flex: 44 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.grayBottom}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
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
              <Pressable onPress={() => setShowPassword((prev) => !prev)}>
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={22}
                  color="#666"
                />
              </Pressable>
            </View>
            <View style={styles.inputUnderline} />

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>
                {loading ? "Loading..." : "Login"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ORANGE_BG,
  },

  orangeTop: {
    flex: 46,
    backgroundColor: ORANGE_BG,
    alignItems: "center",
    justifyContent: "center",
  },

  grayBottom: {
    flexGrow: 1,
    backgroundColor: SOFT_BG,
    paddingHorizontal: 26,
    paddingTop: 2,
    paddingBottom: 28,
  },

  waveWrapper: {
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
    height: 120,
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
    bottom: 40,
    width: 124,
    height: 124,
    borderRadius: 62,
    backgroundColor: ORANGE_BLOB,
  },

  brandWrap: {
    alignItems: "center",
    marginTop: 35,
  },

  logoPlaceholder: {
    width: 80,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
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
    elevation: 3,
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontFamily: "Poppins_700Bold",
  },
});