# Educação pós-pandemia — site pronto

Projeto FAPEMIG APQ-02697-23 · UFMG · Coordenação: Eucidio Pimenta Arruda.

## Abrir no seu computador

Extraia o ZIP e dê dois cliques em `index.html`. A página já está pronta. A conexão à internet só é necessária para acessar as publicações ou reproduzir vídeos do YouTube.

## Publicar gratuitamente no GitHub Pages

1. Entre no GitHub e crie um repositório. Para utilizar GitHub Pages em uma conta gratuita, escolha **Public**.
2. No repositório, escolha **Add file → Upload files**.
3. Envie **o conteúdo da pasta extraída**, mantendo `index.html`, `styles.css`, `script.js`, `dados.js` e a pasta `assets` na raiz. Não envie o ZIP fechado nem uma pasta acima do `index.html`.
4. Confirme em **Commit changes**.
5. Abra **Settings → Pages**.
6. Em **Source**, selecione **Deploy from a branch**.
7. Em **Branch**, escolha `main` e `/(root)`. Clique em **Save**.
8. Aguarde a publicação e abra o endereço informado nessa mesma tela.

Não é necessário instalar Node.js, npm, servidor ou banco de dados. Todos os caminhos são relativos: o site funciona em um endereço de projeto do GitHub Pages.

## Colocar o vídeo do YouTube na página inicial

Abra `dados.js` em um editor de texto. No primeiro item de `videos`, substitua:

```js
url: ""
```

por:

```js
url: "COLE_AQUI_O_LINK_COMPLETO_DO_YOUTUBE"
```

Use o link real, por exemplo no formato `https://www.youtube.com/watch?v=ID_DO_VIDEO` ou `https://youtu.be/ID_DO_VIDEO`. Não cole o código `<iframe>`. Salve o arquivo e envie a versão atualizada ao GitHub.

O primeiro vídeo aparece automaticamente **na abertura da página**, logo depois da apresentação do projeto. Ele será reproduzido dentro da página, em player responsivo, sem reprodução automática, e terá um link para assistir no YouTube. Enquanto `url` estiver vazia, aparece a indicação “em preparação”.

No YouTube, o vídeo precisa ser público ou não listado e permitir incorporação. Vídeos privados ou com restrição de incorporação podem não tocar fora do YouTube. O player utiliza o domínio `youtube-nocookie.com`.

Para adicionar outros vídeos, copie o objeto entre `{` e `}` na lista `videos`, separando os itens com vírgula. Preencha `titulo`, `descricao`, `url` e, opcionalmente, `data`. Os vídeos seguintes aparecem na seção de divulgação, com player próprio.

## Atualizar publicações

As publicações ficam em `dados.js`, na lista `publicacoes`. Copie um item completo e preencha os campos. Use `grupo: "projeto"` apenas quando houver vínculo documental explícito ao APQ. Para a produção associada, use `grupo: "agenda"`.

Os filtros e os cartões se atualizam automaticamente. A página contém também uma cópia estática inicial das referências para indexação e navegação sem JavaScript; ao acrescentar referências, é recomendável atualizar essa cópia em `index.html` (dentro de `publication-list`). O site continuará funcionando com a lista atualizada de `dados.js` mesmo antes dessa atualização da cópia estática.

## Alterar textos, cores e data

- Textos e seções: `index.html`.
- Cores, fontes e espaçamento: `styles.css`; a paleta está nas primeiras linhas.
- Vídeos e publicações: `dados.js`.
- Data da última atualização: procure `Última atualização` em `index.html` e altere também o atributo `datetime`.
- Documentação de origem e escolhas bibliográficas: `FONTES.md`.

A página está em português (`lang="pt-BR"`). Uma versão futura em inglês ou alemão pode reutilizar os mesmos estilos e scripts, com HTML e dados traduzidos em subpastas próprias. Não há versões traduzidas fictícias.

## Arquivos

- `index.html`: página completa e metadados.
- `styles.css`: aparência responsiva, impressão e acessibilidade.
- `dados.js`: listas editáveis de vídeos e publicações.
- `script.js`: menu móvel, filtros e incorporação de vídeos.
- `assets/favicon.svg`: ícone próprio, sem logotipos institucionais.
- `.nojekyll`: permite servir os arquivos diretamente no GitHub Pages.
- `FONTES.md`: registro de evidências e particularidades documentais.
- `README.md`: estas instruções.

Nenhum logotipo oficial foi reproduzido. Não são utilizados rastreadores, formulários de coleta ou fontes carregadas de terceiros. O YouTube só é incorporado quando houver uma URL válida em `dados.js`.
