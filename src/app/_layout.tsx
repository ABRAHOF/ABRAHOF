import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Cores } from '@/theme';

export const unstable_settings = {
  anchor: 'index',
};

/**
 * Layout raiz.
 *
 * O header nativo da Stack está desligado: as telas usam o `Cabecalho`
 * próprio, que acomoda logo, subtítulo e ação — o nativo não. Manter os dois
 * duplicaria o topo da tela.
 *
 * O gesto de voltar do iOS e o botão do Android continuam funcionando: são da
 * Stack, não do header. Os títulos deixam de ser declarados aqui e passam a ser
 * responsabilidade de cada tela, via `Tela`.
 */
export default function LayoutRaiz() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Cores.fundo },
        }}
      />
      {/* Conteúdo escuro na barra: o fundo do aplicativo agora é claro. */}
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
