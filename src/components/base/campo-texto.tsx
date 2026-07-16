import { Ionicons } from '@expo/vector-icons';
import { useId, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';

import {
  ALTURA_CONTROLE,
  Cores,
  Espacamentos,
  OPACIDADE_DESABILITADO,
  Raios,
  Tipografia,
} from '@/theme';

type CampoTextoProps = Omit<TextInputProps, 'editable'> & {
  rotulo: string;
  /** Mensagem de erro. Quando presente, substitui o texto auxiliar. */
  erro?: string;
  /** Orientação exibida abaixo do campo. */
  textoAuxiliar?: string;
  /** Ícone à esquerda, dentro do campo. */
  icone?: keyof typeof Ionicons.glyphMap;
  desabilitado?: boolean;
};

/**
 * Campo de texto com rótulo, erro e texto auxiliar.
 *
 * Não valida nada: recebe `erro` pronto e apenas o apresenta. A validação
 * pertence à tela ou ao formulário.
 *
 * Quando `secureTextEntry` está ativo, um botão alterna a visibilidade — como
 * no projeto web, que é onde o comportamento faz sentido.
 */
export function CampoTexto({
  rotulo,
  erro,
  textoAuxiliar,
  icone,
  desabilitado,
  secureTextEntry,
  multiline,
  style,
  ...resto
}: CampoTextoProps) {
  const id = useId();
  const [oculto, setOculto] = useState(Boolean(secureTextEntry));
  const auxiliar = erro ?? textoAuxiliar;

  return (
    <View style={[estilos.container, desabilitado && estilos.desabilitado]}>
      <Text nativeID={id} style={estilos.rotulo}>
        {rotulo}
      </Text>

      <View
        style={[
          estilos.campo,
          Boolean(multiline) && estilos.campoMultilinha,
          Boolean(erro) && estilos.campoComErro,
        ]}>
        {icone ? (
          <Ionicons name={icone} size={20} color={Cores.textoSuave} style={estilos.icone} />
        ) : null}

        <TextInput
          accessibilityLabelledBy={id}
          accessibilityLabel={rotulo}
          accessibilityState={{ disabled: Boolean(desabilitado) }}
          editable={!desabilitado}
          multiline={multiline}
          placeholderTextColor={Cores.textoSuave}
          secureTextEntry={oculto}
          // Sem isto, o Android centraliza o texto verticalmente no campo
          // multilinha em vez de começar no topo.
          textAlignVertical={multiline ? 'top' : undefined}
          style={[estilos.entrada, Boolean(multiline) && estilos.entradaMultilinha, style]}
          {...resto}
        />

        {secureTextEntry ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={oculto ? 'Mostrar senha' : 'Ocultar senha'}
            onPress={() => setOculto((atual) => !atual)}
            // O ícone tem 20pt; o hitSlop completa os 44pt de alvo mínimo.
            hitSlop={Espacamentos.md}
            style={estilos.acao}>
            <Ionicons
              name={oculto ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color={Cores.textoSuave}
            />
          </Pressable>
        ) : null}
      </View>

      {auxiliar ? (
        <Text style={[estilos.auxiliar, Boolean(erro) && estilos.auxiliarErro]}>{auxiliar}</Text>
      ) : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    gap: Espacamentos.sm,
  },
  desabilitado: {
    opacity: OPACIDADE_DESABILITADO,
  },
  rotulo: {
    ...Tipografia.rotulo,
    color: Cores.texto,
  },
  campo: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: ALTURA_CONTROLE,
    paddingHorizontal: Espacamentos.lg,
    gap: Espacamentos.md,
    borderWidth: 1,
    borderColor: Cores.borda,
    borderRadius: Raios.lg,
    backgroundColor: Cores.superficie,
  },
  campoMultilinha: {
    // O texto começa no topo, e não centralizado como num campo de uma linha.
    alignItems: 'flex-start',
    paddingVertical: Espacamentos.md,
  },
  campoComErro: {
    borderColor: Cores.erro,
  },
  icone: {
    marginLeft: -Espacamentos.xs,
  },
  entrada: {
    flex: 1,
    ...Tipografia.corpo,
    color: Cores.texto,
    // Remove o padding vertical que o Android aplica por padrão.
    paddingVertical: Espacamentos.md,
  },
  entradaMultilinha: {
    // Altura mínima em torno de quatro linhas, como o campo de mensagem do
    // projeto de referência. Cresce com o conteúdo em vez de travar numa altura.
    minHeight: 96,
    paddingVertical: 0,
  },
  acao: {
    marginRight: -Espacamentos.xs,
  },
  auxiliar: {
    ...Tipografia.legenda,
    color: Cores.textoSuave,
  },
  auxiliarErro: {
    color: Cores.erro,
  },
});
