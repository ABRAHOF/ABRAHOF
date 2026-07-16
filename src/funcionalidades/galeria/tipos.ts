import type { ImageSourcePropType } from 'react-native';

/**
 * Item da galeria.
 *
 * Campos do banco ausentes aqui por não existir um único valor em lugar nenhum
 * — mesma razão de `categoria` em Documentos:
 *
 * - `album`: a coluna existe e a tela do projeto de referência não a usa.
 *   Agrupar fotos agora seria inventar álbuns que ninguém definiu.
 * - `data_foto`: idem.
 */
export type ItemGaleria = {
  id: string;
  /**
   * Legenda exibida abaixo da imagem.
   *
   * `galeria.titulo` é nullable no banco, e com razão: foto sem legenda é
   * normal.
   */
  titulo?: string;
  /**
   * Descrição para leitores de tela. Obrigatória.
   *
   * Uma foto sem texto alternativo é invisível para quem usa VoiceOver.
   */
  textoAlternativo: string;
  /**
   * Origem da imagem.
   *
   * `ImageSourcePropType` aceita tanto `require()` de um asset local quanto
   * `{ uri }` remoto — é o mesmo tipo que `imagem_url` vai alimentar, sem
   * precisar de abstração própria.
   *
   * Opcional porque hoje **não há nenhuma foto**: `imagem_url` é NOT NULL no
   * banco, mas o projeto de referência usa fotos de banco de imagens genéricas,
   * e nenhum registro real existe. Sem ela, o item mostra um marcador visual —
   * que é também o que se quer quando a foto real falhar ao carregar.
   */
  imagem?: ImageSourcePropType;
};
