import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

import { BotaoPrimario } from '@/components/base/botao-primario';
import { CampoTexto } from '@/components/base/campo-texto';
import { Tela } from '@/components/layout/tela';
import { Espacamentos } from '@/theme';

export default function TelaLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Sem autenticação nesta etapa: o botão apenas retorna ao início.
  function entrar() {
    router.replace('/');
  }

  return (
    <KeyboardAvoidingView
      style={estilos.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Tela
        titulo="Entrar"
        subtitulo="Tela visual. A autenticação será implementada em uma etapa posterior.">
        <View style={estilos.formulario}>
          <CampoTexto
            rotulo="E-mail"
            value={email}
            onChangeText={setEmail}
            placeholder="voce@exemplo.com"
            icone="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          <CampoTexto
            rotulo="Senha"
            value={senha}
            onChangeText={setSenha}
            placeholder="••••••••"
            icone="lock-closed-outline"
            autoComplete="current-password"
            secureTextEntry
          />
          <BotaoPrimario titulo="Entrar" onPress={entrar} larguraTotal />
        </View>
      </Tela>
    </KeyboardAvoidingView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
  },
  formulario: {
    gap: Espacamentos.lg,
  },
});
