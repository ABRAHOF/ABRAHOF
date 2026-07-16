import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';

import { ItemContato } from '../componentes/item-contato';
import { BotaoPrimario } from '@/components/base/botao-primario';
import { CampoTexto } from '@/components/base/campo-texto';
import { TituloSecao } from '@/components/base/titulo-secao';
import { Tela } from '@/components/layout/tela';
import { INFORMACOES_CONTATO } from '@/mocks/contato';
import { Cores, Espacamentos, Tipografia } from '@/theme';

/** Verificação de formato mínima: algo, arroba, algo, ponto, algo. */
const FORMATO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Campo = 'nome' | 'email' | 'mensagem';

/**
 * Fale Conosco.
 *
 * **O formulário não envia, e a tela diz isso.**
 *
 * No projeto de referência ele aparenta funcionar e não funciona: o `<form>`
 * não tem `onSubmit`, os campos não têm estado, e a tabela `contatos` — que
 * existe e aceita `INSERT` público — nunca recebe nada. A pessoa escreve, toca
 * em enviar e acredita que a mensagem chegou. É o defeito de maior custo de
 * confiança que a análise encontrou (docs/REQUISITOS.md §9).
 *
 * Aqui o botão fica desabilitado e um texto explica por quê. A validação local
 * roda para dar retorno imediato e deixar o caminho pronto — mas nada é enviado.
 *
 * Antes de ligar o envio, duas coisas precisam existir: destino para a mensagem
 * (não há painel nem política de `SELECT` na tabela — hoje ela entraria e
 * morreria) e proteção contra spam, já que `INSERT WITH CHECK (true)` com a
 * chave anon extraível do APK é um endpoint aberto de escrita
 * (docs/ARQUITETURA.md §11 e docs/BACKLOG.md, Sprint 7).
 *
 * Teclado: mesma estratégia da tela de login — `KeyboardAvoidingView` sobre o
 * `ScrollView` da `Tela`, que já tem `keyboardShouldPersistTaps="handled"` e
 * fecha o teclado ao tocar fora.
 */
export function TelaContato() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erros, setErros] = useState<Partial<Record<Campo, string>>>({});

  /** Valida ao sair do campo: erro no meio da digitação atrapalha mais que ajuda. */
  function validar(campo: Campo) {
    setErros((atuais) => {
      const proximos = { ...atuais };

      if (campo === 'nome') {
        proximos.nome = nome.trim() ? undefined : 'Informe seu nome.';
      }

      if (campo === 'email') {
        const valor = email.trim();
        if (!valor) {
          proximos.email = 'Informe seu e-mail.';
        } else if (!FORMATO_EMAIL.test(valor)) {
          proximos.email = 'E-mail inválido.';
        } else {
          proximos.email = undefined;
        }
      }

      if (campo === 'mensagem') {
        proximos.mensagem = mensagem.trim() ? undefined : 'Escreva sua mensagem.';
      }

      return proximos;
    });
  }

  return (
    <KeyboardAvoidingView
      style={estilos.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Tela titulo="Fale Conosco" subtitulo="Estamos aqui para ajudar">
        <View style={estilos.informacoes}>
          {INFORMACOES_CONTATO.map((informacao) => (
            <ItemContato key={informacao.id} informacao={informacao} />
          ))}
        </View>

        <View style={estilos.formulario}>
          <TituloSecao titulo="Envie uma mensagem" />

          <CampoTexto
            rotulo="Nome"
            placeholder="Seu nome"
            value={nome}
            onChangeText={setNome}
            onBlur={() => validar('nome')}
            erro={erros.nome}
            icone="person-outline"
            autoCapitalize="words"
            autoComplete="name"
            textContentType="name"
          />

          <CampoTexto
            rotulo="E-mail"
            placeholder="Seu e-mail"
            value={email}
            onChangeText={setEmail}
            onBlur={() => validar('email')}
            erro={erros.email}
            icone="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            textContentType="emailAddress"
          />

          <CampoTexto
            rotulo="Mensagem"
            placeholder="Sua mensagem"
            value={mensagem}
            onChangeText={setMensagem}
            onBlur={() => validar('mensagem')}
            erro={erros.mensagem}
            multiline
          />

          {/*
            Sempre desabilitado: não há para onde enviar. Um botão ativo que não
            envia é exatamente o que a referência faz — e o motivo de ninguém
            perceber que o canal está quebrado.
          */}
          <BotaoPrimario titulo="Enviar mensagem" onPress={() => {}} desabilitado larguraTotal />

          <Text style={estilos.aviso}>
            O envio de mensagens pelo aplicativo ainda não está disponível. Enquanto isso, use o
            e-mail acima.
          </Text>
        </View>
      </Tela>
    </KeyboardAvoidingView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
  },
  informacoes: {
    gap: Espacamentos.md,
  },
  formulario: {
    gap: Espacamentos.lg,
    marginTop: Espacamentos.md,
  },
  aviso: {
    ...Tipografia.legenda,
    color: Cores.textoSuave,
    textAlign: 'center',
  },
});
