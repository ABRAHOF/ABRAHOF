import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Cores } from '@/constants/tema';

export const unstable_settings = {
  anchor: 'index',
};

export default function LayoutRaiz() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Cores.primaria },
          headerTintColor: Cores.contraste,
          headerTitleStyle: { fontWeight: '600' },
          contentStyle: { backgroundColor: Cores.fundo },
        }}>
        <Stack.Screen name="index" options={{ title: 'Abrahof Connections' }} />
        <Stack.Screen name="login" options={{ title: 'Entrar' }} />
        <Stack.Screen name="academy" options={{ title: 'Academy' }} />
        <Stack.Screen name="beneficios" options={{ title: 'Benefícios' }} />
        <Stack.Screen name="contato" options={{ title: 'Contato' }} />
        <Stack.Screen name="documentos" options={{ title: 'Documentos' }} />
        <Stack.Screen name="eventos" options={{ title: 'Eventos' }} />
        <Stack.Screen name="galeria" options={{ title: 'Galeria' }} />
        <Stack.Screen name="patrocinadores" options={{ title: 'Patrocinadores' }} />
        <Stack.Screen name="transmissao" options={{ title: 'Transmissão' }} />
      </Stack>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
