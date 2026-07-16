import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

import { BotaoPrimario } from '@/components/base/botao-primario';
import { CampoTexto } from '@/components/base/campo-texto';
import { Tela } from '@/components/layout/tela';
import { Espacamentos } from '@/theme';

/**
 * Tela de login — somente visual.
 *
 * **A autenticação é provisória.** Nada é verificado: o botão apenas devolve o
 * usuário à tela inicial. Não há consulta a banco, credencial fixa nem sessão.
 * O Supabase Auth entra na Sprint 8, e só depois da decisão de produto sobre o
 * que a Área Restrita conterá (docs/ARQUITETURA.md §12 e §17).
 *
 * "Esqueci minha senha" e "Cadastrar" existem na referência, mas não têm tela
 * nem rota — na web, "Cadastrar" leva a um 404. Ficam de fora até existirem:
 * botão que não faz nada é o defeito mais comum do projeto de referência.
 */
export function TelaLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const podeEnviar = email.trim().length > 0 && senha.length > 0;

  // Provisório: navega sem autenticar. Substituir por signInWithPassword.
  function entrar() {
    router.replace('/');
  }

  return (
    <KeyboardAvoidingView
      style={estilos.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Tela marca="ABRAHOF" titulo="Entrar" subtitulo="Acesse sua conta ABRAHOF">
        <View style={estilos.formulario}>
          <CampoTexto
            rotulo="E-mail"
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={setEmail}
            icone="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            textContentType="emailAddress"
          />

          <CampoTexto
            rotulo="Senha"
            placeholder="Digite sua senha"
            value={senha}
            onChangeText={setSenha}
            icone="lock-closed-outline"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="current-password"
            textContentType="password"
            secureTextEntry
          />

          <BotaoPrimario
            titulo="Entrar"
            onPress={entrar}
            desabilitado={!podeEnviar}
            larguraTotal
          />
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
