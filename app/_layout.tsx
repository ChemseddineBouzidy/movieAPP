import { Stack } from "expo-router";
import "./globals.css";
import { Header } from "react-native/Libraries/NewAppScreen";

export default function RootLayout() {
  return <Stack >
    <Stack.Screen name="(tabs)" options={{HeaderShown: false}} />
    <Stack.Screen name="(movies/[id]" options={{HeaderShown: false}} />

  </Stack>
 
}
