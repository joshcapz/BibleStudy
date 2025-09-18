import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="SignupScreen" options={{ title: 'Sign Up', headerShown: false }} />
        <Stack.Screen name="LoginScreen" options={{ title: 'Login', headerShown: false }} />
        <Stack.Screen name="home" options={{ title: 'Home', headerShown: false }} />
      </Stack>
    </>
  )
}