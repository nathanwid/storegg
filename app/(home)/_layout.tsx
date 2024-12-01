import { store } from "@/redux";
import { Stack } from "expo-router";
import { Provider } from "react-redux";

export default function StackLayout() {
  return (
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="detail/[id]" 
          options={{
            headerTitle: "Detail"
          }} 
        />
      </Stack>
  );
}
