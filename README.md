# Portfólio — Állex Brandão

**Checkpoint 6 · Vibecoding** — landing page de portfólio construída com IA em **HTML, SCSS e JavaScript puros**.

- **Deploy:** _(preencher após publicar)_
- **Repositório:** _(preencher)_

---

## Como rodar

Não há framework nem bundler. Abra `index.html` com um servidor local (ex.: Live Server do VS Code).
Abrir direto pelo `file://` funciona, mas a máscara do logo (`mask-image`) exige um servidor.

O CSS já vai compilado em `css/main.css`. Para editar os estilos:

```bash
npm install          # instala só o compilador Sass
npm run watch:css    # recompila scss/ → css/main.css a cada alteração
npm run build:css    # build final, minificado
```

| Pasta / arquivo | Conteúdo |
| --- | --- |
| `index.html` | Todas as seções |
| `scss/` | `_tokens` (paleta, fontes, breakpoints) e um parcial por seção |
| `js/squiggle.js` | Gera os rabiscos (trocoide com laços) e controla o "desenho" deles |
| `js/eye-zoom.js` | Animação de zoom até a pupila, túnel de anéis e portal para o Sobre |
| `js/main.js` | Menu, revelação no scroll, galerias, visualizador, gráfico do KNN, rolagem horizontal |
| `assets/` | Fotos otimizadas (WebP), logo, fonte Silver Crown |
| `docs/referencias/` | As imagens de referência citadas abaixo |

---

## 3.1 Referências

| # | Referência | O que aproveitei | Onde aparece |
| --- | --- | --- | --- |
| 1 | `docs/referencias/ref-7.png`: palestrantes na frente de um mural de fitas coloridas com laços | Os **rabiscos com laços**, de traço grosso e ponta arredondada, que passam por trás e pela frente das pessoas | Hero (fitas atrás e na frente do retrato), sublinhado de todos os títulos, linha da trajetória, foto do contato |
| 2 | `docs/referencias/ref-8.png`: paleta do mural (bege, vermelho-alaranjado, lilás, azul, laranja) | As cinco cores exatas, com os hexadecimais da referência | Site inteiro (ver 3.2) |
| 3 | `docs/referencias/ref-9.png`: "EXEMPLO" em Silver Crown + "exemplo" em Pacifico | O par **condensada alta + script**: a primeira dá impacto e a segunda deixa tudo mais leve | Todos os títulos: palavra em Silver Crown + comentário entre parênteses em Pacifico |
| 4 | `docs/referencias/ref-10.png`: logotipo "ÁLLEX" com o A em forma de robô | Minha marca. O "A" com antena conversa com IA sem precisar explicar | Logo gigante do hero, nav e rodapé (usado como máscara, então muda de cor via CSS) |
| 5 | `docs/referencias/ref-11.png`: "What I do? (and love doing)" | A pergunta como título, o comentário entre parênteses e a lista de competências em negrito, solta, sem caixas | Seção Sobre: "O que eu faço? (e amo fazer)" e a nuvem "O que faço" |
| 6 | `docs/referencias/ref-12.png`: "Portfolio" gigante com linha de metadados em cima | Tipografia enorme ancorando a página e uma linha fina de metadados (data, cidade, papéis) separada por um fio | Hero: nome gigante ancorando a página. A linha de metadados existiu até a rodada 1 e saiu porque não está no protótipo; o "PORTFÓLIO 2026" foi para a navegação |
| 7 | `referencia_eye_zoom_animation.mp4`: zoom no olho até a pupila, túnel de anéis e uma cidade surgindo no centro | **Animação.** O zoom contínuo no olho que vira um túnel e abre a cena seguinte pelo centro | Transição do hero para o Sobre: a rolagem amplia meu retrato até a pupila, uma íris de rabiscos na paleta assume, anéis coloridos passam pela tela e o Sobre abre por um círculo no meio |
| 8 | `docs/referencias/prototipo-hero.png`: meu protótipo do hero (rodada 1) | Composição completa do hero: "ÁLLEX BRANDÃO" em degraus com contorno branco, fitas grossas com borda branca sobre rabiscos "fantasma" bem claros, foto em círculo com um círculo azul deslocado, barra de navegação branca, fundo branco | Hero e navegação (e o fundo branco do site inteiro) |

---

## 3.2 Decisões de identidade visual

### Paleta

| Cor | Hex | Papel | Por quê |
| --- | --- | --- | --- |
| Branco | `#FFFFFF` | Fundo de todas as páginas (desde a rodada 1) | Deixa as cinco cores e a tipografia preta no máximo contraste, como no protótipo do hero |
| Preto | `#000000` | Texto, botões, fundos escuros (túnel, Fora do código, rodapé) | O protótipo usa preto puro. Com fundo branco, o quase-preto quente da versão anterior perdeu o sentido |
| Névoa | `#F8F4F4` | Rabiscos "fantasma" do fundo e superfícies claras (gráfico, miniaturas) | Dá textura ao fundo branco sem competir com as fitas coloridas |
| Bege | `#F2D6BE` | Apoio: texto sobre fundos escuros e detalhes (era o fundo até a rodada 1) | Continua sendo a cor quente da paleta original |
| Vermelho-alaranjado | `#F2380F` | Destaque: palavras em script, hover dos botões, fundo do Contato | A cor de maior energia vai para o que eu quero que a pessoa faça (falar comigo) |
| Lilás | `#DF98F2` | Rabiscos, fundo da Trajetória | Suaviza a paleta e marca a seção mais "pessoal" |
| Azul | `#367FBE` | Rabiscos, sombra do retrato, linha do gráfico | O tom mais "técnico": aparece nos dados (gráfico do KNN) e nos detalhes |
| Laranja | `#F1913D` | Rabiscos, números, fita de skills | Faz a ponte entre o vermelho e o bege |

### Tipografia

- **Inter** (100/300/400/500/700): todo o texto corrido e a interface, com tracking negativo na navegação e no texto do hero, como no protótipo. O peso 400 entrou na rodada 1 porque é o da navegação do protótipo. É neutra e muito legível, e não compete com as fontes de destaque.
- **Silver Crown**: títulos, números e o "BRANDÃO" do hero. É alta, condensada e tem terminais arredondados, a mesma família visual do meu logo. No hero, o "ÁLLEX" vem do logo vetorizado (A-robô e LL com gancho) e as demais letras são glifos da fonte convertidos em SVG, cada um na sua altura.
- **Pacifico**: os comentários entre parênteses e as taglines. Traz o tom de conversa e repete a curva dos rabiscos.

### Tom e personalidade

**Moderno e acolhedor, com humor leve.** Os títulos fazem perguntas e comentam a si mesmos ("Projetos *(com história)*", "Trajetória *(até aqui)*"). O texto é em primeira pessoa, direto e sem jargão de currículo. No layout, isso aparece no contraste entre a tipografia enorme e séria e os rabiscos soltos, que parecem feitos à mão.

### Estrutura da página

1. **Hero:** nome em degraus, uma frase sobre o que eu faço, retrato em círculo e CTAs, fiel ao meu protótipo. O retrato é a porta de entrada da animação.
2. **Sobre** (aberto pela pupila): quem sou, números de impacto, o que faço e ferramentas.
3. **Projetos:** Revi, Data Hive, TAMA Drums Brasil e Titanic × KNN, com imagens, deploy e vídeos. Só o Titanic aponta para o GitHub, por ser um modelo sem interface (os gráficos do notebook estão na página).
4. **Trajetória:** formação e marcos, numa linha do tempo que se desenha com a rolagem.
5. **Fora do código:** música (voz e bateria) e Palmeiras, em rolagem horizontal no desktop.
6. **Contato:** e-mail, LinkedIn, GitHub e Instagram.

---

## 3.3 Prompts utilizados

### Prompt inicial (exatamente como foi enviado)

> Enviado junto com o PDF do Checkpoint 6, 6 fotos minhas e 6 imagens de referência, que estão em `docs/referencias/`.

```markdown
## ROLE

You are a senior frontend developer and need to build my portfolio (Állex Brandão) based on the criteria specified in the attached PDF (Checkpoint 6.pdf).

You have access to all of my GitHub repositories (Allexbrandao07): https://github.com/Allexbrandao07

And to my LinkedIn to extract academic experience, professional experience and contact information: www.linkedin.com/in/állex-brandão

The projects I want to share in this portfolio are:

- https://github.com/Allexbrandao07/DataHive-solution
- https://github.com/Allexbrandao07/predicao-sobreviventes-titanic-knn
- https://github.com/Allexbrandao07/cp5-frontenddesing/tree/main/vibecode (Only the Tama/vibecode website - dissociate this idea from vibecode)
- Revi: https://github.com/MansourPixels/revi-back, https://github.com/MansourPixels/website-react, deploy: https://revi-jovi.vercel.app/, video pitch: https://youtu.be/i9998Wxipas?si=DFhptxpG0G0ehITy

**IMPORTANT:** Do not redirect anything to the full GitHub repository in any of the projects. The idea is not to leak source code or anything like that. In the projects section, put only images, deploy links and videos (except for predicao-sobreviventes-titanic-knn: since it is a Machine Learning model, it has no frontend or any application of the kind, so that one can be redirected to the repository, but include images of the charts contained in the .ipynb file).

## MATERIAL

You have photos of me to use as the "profile picture" (Hero) and of some hobbies I practice (this might be used in a section about things I like to do/hobbies).

Files/images with references for visual identity, colors, fonts, animations, aesthetic.

## IDV

Fonts:
  - Primary font: Inter (thin, light, medium and bold)
  - Fonts for titles and highlights: Silver Crown Regular and pacifico

Color palette:
   - Beige/Off-white: #F2D6BE
   - Red-Orange: #F2380F
   - Lilac/Light purple: #DF98F2
   - Blue: #367FBE
   - Dark Orange/Yellow: #F1913D

Squiggles:
   It is necessary to maintain this squiggles aesthetic from the provided reference throughout important points of the site (preferably with scroll animations), such as the hero, section titles, always keeping this palette of colors.

Animations:
     Besides the interactions of the squiggles with the scroll and the freedom you have to create animations consistent with the aesthetic, use @referencia_eye_zoom_animation.mp4  as a basis to create an animation that interacts with the scrolling from the Hero to the first section after it.
    The idea is to have one or more photos of me in the hero, and when the user scrolls down, zoom into the pupil of my eye in the photo and end the zoom in the following section. But always maintaining the defined aesthetic and colors.

## IMPLEMENTATION MODE

Use and develop only in pure HTML, SCSS and JS
```

### Prompts de ajuste (na ordem)

**Ajuste 1: Hero** (enviado junto com `docs/referencias/prototipo-hero.png`)

```text
Temos bastante coisa pra ajustar, mas vamos por partes. Vamos começar pelo Hero,

Deixe algo bem parecido (quase fiel) a esse protótipo de Hero que está anexado aqui.

Perceba que o fundo agora é branco e não mais creme, adote isso para todas as páginas. Fundo branco
```

**Orientação de processo** (enviada junto com a tabela da ficha de correção do PDF; não alterou o site)

```text
Cara, ficou bom mas ainda temos a ajustar, mas antes, tenha em mente a seguinte orientação:

Apartir de agora, todos os ajustes que formos fazendo tem que ir sendo registrados no @README.md e, principalmente, preencher essa ficha para as correções
```

_(Adicionar os próximos prompts aqui, na ordem e exatamente como foram enviados.)_

---

## 3.4 Registro de correções

### Rodada 0: QA feito pela própria IA antes da primeira entrega

A IA abriu a página num Chrome sem interface, em 1440×900, 390×844 e com "movimento reduzido". Rolou a página quadro a quadro, clicou nos botões e corrigiu o seguinte **antes** do meu primeiro retorno:

| Problema | Correção | Resultado |
| --- | --- | --- |
| O link "Sobre" levava de volta ao hero: a seção está dentro do palco preso do zoom, e a âncora apontava para o começo da pista | O clique em `#sobre` passou a rolar até o fim da pista, onde o portal já está aberto | Resolveu totalmente |
| No contato, a seta "↗" dos links caía numa terceira célula do grid e quebrava a linha | O texto e a seta ficaram juntos num único `<span>` | Resolveu totalmente |
| No celular, o comentário em Pacifico subia por cima do título quando quebrava linha | O deslocamento vertical do script foi removido abaixo de 900px | Resolveu totalmente |
| No celular, os cards de "Fora do código" ficavam escondidos à direita, e só dava para vê-los arrastando de lado | Abaixo de 900px os cards são empilhados | Resolveu totalmente |
| No celular, os rabiscos do hero cruzavam a linha de metadados e os botões | Cada rabisco ganhou uma posição própria para telas pequenas (`data-box-sm`) | Resolveu totalmente |

### Rodadas seguintes

Uma ficha por prompt de correção, com os campos do PDF:

- **Problema:** o que não saiu como esperado.
- **Prompt de correção:** o que foi pedido para resolver.
- **Resultado:** resolveu totalmente, em parte ou não resolveu.
- **Aprendizado:** o que eu faria diferente no prompt inicial.

| Campo | Rodada 1: Hero |
| --- | --- |
| Problema | O hero gerado não tinha a composição que eu tinha em mente: o nome era só o logo com "Brandão" em script, a foto ficava num arco, os rabiscos eram finos e procedurais e o fundo era bege. Eu queria o nome inteiro em degraus, fitas grossas passando por trás das letras, foto circular e fundo branco |
| Prompt de correção | Pedi que o hero ficasse quase fiel ao protótipo anexado (`docs/referencias/prototipo-hero.png`) e que o fundo passasse de creme para branco em todas as páginas. Texto completo: Ajuste 1, em 3.3 |
| Resultado | Resolveu totalmente. A IA mediu o protótipo (posição e altura de cada letra, cores exatas, espessura das fitas, círculo da foto), vetorizou o logo, montou o nome em SVG com contorno branco e redesenhou as fitas sobre as coordenadas do protótipo. O hero virou um "quadro" de 1366×768 que escala com a tela e tem uma versão empilhada para celular. A sobreposição com o protótipo bateu quase pixel a pixel no nome, na foto e na navegação. O zoom na pupila continuou funcionando |
| Aprendizado | _(sugestão, revisar)_ Uma imagem do layout comunica muito mais que uma lista de referências. Se eu tivesse mandado o protótipo do hero e a decisão do fundo branco já no prompt inicial, essa rodada teria sido evitada |

| Campo | Rodada 2 |
| --- | --- |
| Problema | |
| Prompt de correção | |
| Resultado | |
| Aprendizado | |

---

## 3.5 Resultado final

- **Repositório:** _(link)_
- **Deploy:** _(link)_

**Reflexão:** _(o que ficou como imaginei e o que ainda mudaria. Escrever com as minhas palavras.)_

---

## Créditos e observações

- **Silver Crown**, de Linecreative (Ari Juanda), na versão gratuita para **uso pessoal** do DaFont. Para uso comercial é preciso comprar a licença.
- Os dados do gráfico "Acurácia por k" foram copiados da saída da célula de varredura de *k* do notebook `analise_preditiva_titanic_knn.ipynb`. O pairplot é a imagem original gerada pelo notebook.
- As capturas de tela do Revi e da TAMA foram tiradas dos deploys públicos. As imagens do Data Hive vêm da pasta `BlobStorage` do projeto.
