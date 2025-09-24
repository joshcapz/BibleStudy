import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Platform, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function Welcome() {
  const router = useRouter();

  useEffect(() => {
    if (Platform.OS === "web") {
      document.title = "";

      // Add viewport meta tag for proper mobile scaling
      let viewport = document.querySelector("meta[name=viewport]");
      if (!viewport) {
        viewport = document.createElement("meta");
        viewport.setAttribute("name", "viewport");
        document.head.appendChild(viewport);
      }
      viewport.setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no");

      // Add CSS to make page background match the gradient
      let style = document.querySelector("#poker-background-style");
      if (!style) {
        style = document.createElement("style");
        style.id = "poker-background-style";
        document.head.appendChild(style);
      }
      style.textContent = `
        body {
          background: #4A90E2 !important;
          margin: 0 !important;
          padding: 0 !important;
          height: 100vh !important;
          overflow: hidden !important;
        }
        html {
          background: #4A90E2 !important;
          margin: 0 !important;
          padding: 0 !important;
          height: 100vh !important;
        }
        #root {
          background: transparent !important;
        }
      `;
    }
  }, []);

  return (
    <LinearGradient
      colors={["#2D8CFF", "#FF2D55"]}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
        width: '100%',
        minHeight: '100vh',
      }}
    >
      {/* Background GIF */}
      <Image
        source={{ uri: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjVmanJpZjh5bW9jdXlxeDFsMndoOXh2cXcxMzUyYWJ6eGhpYWZqbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dqa3OzMQ4V3S6bjdpI/giphy.gif" }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          resizeMode: 'cover',
          opacity: 0.3
        }}
      />

      {/* App Name */}
      <Text
        style={{
          fontSize: 60,
          fontWeight: "bold",
          color: "#8AFF8E",
          marginBottom: 30,
          letterSpacing: 2,
          textAlign: 'center',
        }}
      >
          𝗕𝗼𝗼𝗸𝗟𝗶𝗳𝗲
      </Text>

      {/* Tagline */}
      <Text
        style={{
          color: "#000000",
          textAlign: "center",
          marginBottom: 60,
          fontSize: 21,
          paddingHorizontal: 40,
          lineHeight: 28,
        }}
      >
        𝐁𝐨𝐨𝐤𝐋𝐢𝐟𝐞 𝐢𝐬 𝐲𝐨𝐮𝐫 𝐜𝐨𝐦𝐩𝐚𝐧𝐢𝐨𝐧 𝐟𝐨𝐫 𝐭𝐫𝐚𝐜𝐤𝐢𝐧𝐠, 𝐝𝐢𝐬𝐜𝐨𝐯𝐞𝐫𝐢𝐧𝐠, 𝐚𝐧𝐝 𝐞𝐧𝐣𝐨𝐲𝐢𝐧𝐠 𝐛𝐨𝐨𝐤𝐬.
      </Text>

      {/* Login Button */}
      <TouchableOpacity
        onPress={() => router.push("/login")}
        style={{
          backgroundColor: "#4B0069",
          paddingVertical: 20,
          paddingHorizontal: 50,
          borderRadius: 12,
          width: 300,
          alignItems: "center",
          marginBottom: 30,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 24 }}>
          LOG IN
        </Text>
      </TouchableOpacity>

      {/* Sign Up Button */}
      <TouchableOpacity
        onPress={() => router.push("/signup")}
        style={{
          backgroundColor: "#8A0B51",
          paddingVertical: 20,
          paddingHorizontal: 50,
          borderRadius: 12,
          width: 300,
          alignItems: "center",
          marginBottom: 30,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 24 }}>
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

