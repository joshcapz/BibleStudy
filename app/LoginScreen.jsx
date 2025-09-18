import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useRouter } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

 const handleLogin = async () => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
router.push("/goals");


  } catch (err) {
    alert("Login error: " + err.message); 
  }
};



  return (
    <LinearGradient
      colors={["#2D8CFF", "#FF2D55"]}
      style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}
    >
      <Text style={{ fontSize: 28, color: "#fff", fontWeight: "bold", marginBottom: 30 }}>
      𝐋𝐎𝐆 𝐈𝐍
      </Text>

      <TextInput
        placeholder="Phone number/email"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        style={{
          width: "60%",
          backgroundColor: "rgba(255,255,255,0.1)",
          color: "#fff",
          padding: 12,
          borderRadius: 10,
          marginBottom: 15,
        }}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          width: "60%",
          backgroundColor: "rgba(255,255,255,0.1)",
          color: "#fff",
          padding: 12,
          borderRadius: 10,
          marginBottom: 20,
        }}
      />

      {/* Login Button */}
      <TouchableOpacity
        onPress={handleLogin}
        style={{
          width: "30%",
          backgroundColor: "#2D8CFF",
          padding: 14,
          borderRadius: 10,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>LOG IN</Text>
      </TouchableOpacity>

      {/* Sign up Link */}
      <TouchableOpacity onPress={() => router.push("/signup")}>
        <Text style={{ color: "#fff" }}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

