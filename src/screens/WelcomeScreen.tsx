import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import type { RootStackParamList } from "../navigation/types";

const ORANGE_BG = "#FF7444";
const ORANGE_BLOB = "#FF5A1F";
const SOFT_BG = "#F2F2F2";

export default function WelcomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

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

        {/* WAVE */}
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

      <View style={styles.grayBottom}>
        <Text style={styles.title}>Selamat datang</Text>
        <Text style={styles.desc}>
          Mewujudkan Semarang yang Mandiri dan Berdaulat dalam Ketahanan Pangan
        </Text>

        <View style={styles.continueRow}>
          <Text style={styles.continueLabel}>Continue</Text>
          <Pressable
            style={styles.continueButton}
            onPress={() => navigation.replace("Login")}
          >
            <Text style={styles.continueArrow}>{">"}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ORANGE_BG,
  },
  orangeTop: {
    flex: 56,
    backgroundColor: ORANGE_BG,
    alignItems: "center",
    justifyContent: "center",
  },
  grayBottom: {
    flex: 44,
    backgroundColor: SOFT_BG,
    paddingHorizontal: 26,
    paddingTop: 46,
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
    gap: 0,
    marginTop: 46,
  },
  logoPlaceholder: {
    width: 80,
    height: 100,
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
  title: {
    color: "#303030",
    fontSize: 33,
    fontFamily: "Poppins_800ExtraBold",
    marginBottom: 14,
  },
  desc: {
    color: "#7C7C7C",
    fontSize: 19,
    fontFamily: "Poppins_400Regular",
    lineHeight: 28,
    maxWidth: "90%",
  },
  continueRow: {
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 12,
  },
  continueLabel: {
    color: "#858585",
    fontSize: 17,
    fontFamily: "Poppins_500Medium",
  },
  continueButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: ORANGE_BG,
    alignItems: "center",
    justifyContent: "center",
  },
  continueArrow: {
    color: "#FFFFFF",
    fontSize: 23,
    fontFamily: "Poppins_700Bold",
    marginTop: -2,
  },
});