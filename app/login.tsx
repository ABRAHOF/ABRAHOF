import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

import { Botao } from '@/components/botao';
import { CampoTexto } from '@/components/campo-texto';
import { TelaBase } from '@/components/tela-base';
import { Espacamentos } from '@/constants/tema';

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
      <TelaBase
        titulo="Entrar"
        descricao="Tela visual. A autenticação será implementada em uma etapa posterior.">
        <View style={estilos.formulario}>
          <CampoTexto
            rotulo="E-mail"
            value={email}
            onChangeText={setEmail}
            placeholder="voce@exemplo.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          <CampoTexto
            rotulo="Senha"
            value={senha}
            onChangeText={setSenha}
            placeholder="••••••••"
            secureTextEntry
          />
          <Botao titulo="Entrar" onPress={entrar} />
        </View>
      </TelaBase>
    </KeyboardAvoidingView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
  },
  formulario: {
    gap: Espacamentos.medio,
  },
});
