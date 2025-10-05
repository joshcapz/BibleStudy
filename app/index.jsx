import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Platform, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";


export default function Welcome() {
  const router = useRouter();

  useEffect(() => {
    if (Platform.OS === "web") {
      try {
        // Check if document exists before accessing it
        if (typeof document !== 'undefined') {
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
      } catch (error) {
        // Silently handle any DOM manipulation errors
        // Error is intentionally ignored to prevent console warnings on mobile
      }
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


      {/* App Name */}
      <Text
        style={{
          fontSize: 40,
          fontWeight: "bold",
          color: "#8AFF8E",
          marginBottom: 30,
          letterSpacing: 2,
          textAlign: 'center',
        }}
      >
          𝐁𝐢𝐛𝐥𝐞𝐒𝐭𝐮𝐝𝐲
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
        𝐁𝐢𝐛𝐥𝐞 𝐒𝐭𝐮𝐝𝐲 𝐡𝐞𝐥𝐩𝐬 𝐲𝐨𝐮 𝐫𝐞𝐚𝐝 𝐚𝐧𝐝 𝐫𝐞𝐟𝐥𝐞𝐜𝐭 𝐨𝐧 𝐆𝐨𝐝'𝐬 𝐖𝐨𝐫𝐝 𝐝𝐚𝐢𝐥𝐲.
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

