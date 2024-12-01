import { persistor, store } from '@/redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Stack>
                    <Stack.Screen 
                        name="(home)" 
                        options={{
                            headerShown: false 
                        }} 
                    />
                    <Stack.Screen 
                        name="(cart)" 
                        options={{
                            headerTitle: "My Products"
                        }} 
                    />
                    <Stack.Screen 
                        name="(minigame)" 
                        options={{
                            headerTitle: "Minigame"
                        }} 
                    />
                </Stack>
            </PersistGate>
        </Provider>
    </QueryClientProvider>
  );
}