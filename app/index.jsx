import { useEffect } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function Welcome() {
  const router = useRouter();

  useEffect(() => {
    if (Platform.OS === "web") {
      document.title = "";  
    }
  }, []);

  return (
    <LinearGradient
      colors={["#2D8CFF", "#FF2D55"]}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      {/* App Name */}
      <Text
        style={{
          fontSize: 50,
          fontWeight: "bold",
          color: "#fff",
          marginBottom: 20,
          letterSpacing: 2,
        }}
      >
       POKER
      </Text>

      {/* Tagline */}
      <Text
        style={{
          color: "#ddd",
          textAlign: "center",
          marginBottom: 50,
          fontSize: 20,
        }}
      >
        "Play Poker anytime, anywhere—challenge friends or players worldwide!"
      </Text>

      {/* Login Button */}
      <TouchableOpacity
        onPress={() => router.push("/login")}
        style={{
          backgroundColor: "#2D8CFF",
          paddingVertical: 10,
          borderRadius: 5,
          width: "60%",
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
          LOG IN
        </Text>
      </TouchableOpacity>

      {/* Sign Up Button */}
      <TouchableOpacity
        onPress={() => router.push("/signup")}
        style={{
          backgroundColor: "#2D8CFF",
          paddingVertical: 10,
          borderRadius: 5,
          width: "60%",
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
          SIGN UP
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

// Hide the header and title
export const options = {
  headerShown: false,
  title: "",
};
