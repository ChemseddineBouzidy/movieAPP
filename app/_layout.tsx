import { Stack } from "expo-router";
import "./globals.css";
import { Header } from "react-native/Libraries/NewAppScreen";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return(
  <>
    <StatusBar hidden={true} />
    <Stack >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
    </Stack>
  </>
  )

}
