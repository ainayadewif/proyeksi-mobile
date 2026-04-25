import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import type { RootStackParamList } from "../navigation/types";

const ORANGE_BG = "#FF7444";
const ORANGE_BLOB = "#FF5A1F";
const SPLASH_DELAY_MS = 2800;

export default function IndexScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Welcome");
    }, SPLASH_DELAY_MS);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.topCircle} />
      <View style={styles.leftCircle} />

      <View style={styles.brandWrap}>
        <View style={styles.logoPlaceholder}>
          <Image
            source={require("../../assets/images/logo_kotaSemarang.png")}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <Text style={styles.brandText}>SIKETAN</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ORANGE_BG,
    justifyContent: "center",
    alignItems: "center",
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
    left: -40,
    top: "28%",
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: ORANGE_BLOB,
  },
  brandWrap: {
    alignItems: "center",
    gap: 14,
    marginTop: 46,
  },
  logoPlaceholder: {
    width: 46,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  brandText: {
    color: "#FFFFFF",
    fontSize: 31,
    fontFamily: "Poppins_800ExtraBold",
    letterSpacing: 0.5,
  },
});
