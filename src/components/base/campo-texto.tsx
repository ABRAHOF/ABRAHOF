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

      <View style={[estilos.campo, Boolean(erro) && estilos.campoComErro]}>
        {icone ? (
          <Ionicons name={icone} size={20} color={Cores.textoSuave} style={estilos.icone} />
        ) : null}

        <TextInput
          accessibilityLabelledBy={id}
          accessibilityLabel={rotulo}
          accessibilityState={{ disabled: Boolean(desabilitado) }}
          editable={!desabilitado}
          placeholderTextColor={Cores.textoSuave}
          secureTextEntry={oculto}
          style={[estilos.entrada, style]}
          {...resto}
        />

        {secureTextEntry ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={oculto ? 'Mostrar senha' : 'Ocultar senha'}
            onPress={() => setOculto((atual) => !atual)}
            hitSlop={Espacamentos.sm}
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
