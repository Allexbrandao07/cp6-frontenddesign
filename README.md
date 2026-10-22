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
| `js/loader.js` | Preloader: logo + quatro blocos da paleta como barra de progresso real |
| `js/eye-zoom.js` | Animação de rolagem do hero: zoom até a pupila (íris em círculos da paleta), túnel de anéis e portal para o Sobre |
| `js/main.js` | Menu, revelação no scroll, fita das ferramentas, fitas de Projetos e Trajetória, galerias, visualizador, gráfico do KNN, rolagem horizontal |
| `assets/` | Fotos otimizadas (WebP), logo, fonte Silver Crown, ícones das ferramentas (`assets/icons/`), logos das certificações e da trajetória |
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
| 7 | `referencia_eye_zoom_animation.mp4`: zoom no olho até a pupila, túnel de anéis e uma cidade surgindo no centro | **Animação.** O zoom contínuo que atravessa camadas em profundidade e abre a cena seguinte por um círculo no centro | Transição do hero para o Sobre: a rolagem amplia meu retrato até a pupila, uma íris minimalista de círculos concêntricos da paleta assume, anéis coloridos passam pela tela e o Sobre abre por um círculo no meio. Na rodada 4 isso virou um cérebro com neurônios, revertido na rodada 5; a íris atual é da rodada 6 |
| 8 | `docs/referencias/prototipo-hero.png`: meu protótipo do hero (rodada 1) | Composição completa do hero: "ÁLLEX BRANDÃO" em degraus com contorno branco, fitas grossas com borda branca sobre rabiscos "fantasma" bem claros, foto em círculo com um círculo azul deslocado, barra de navegação branca, fundo branco | Hero e navegação (e o fundo branco do site inteiro) |
| 9 | `docs/referencias/referencia-loader.png`: tela de carregamento com o logo e quatro blocos coloridos (rodada 2) | Composição mínima: logo centralizado e, embaixo, os blocos vermelho, lilás, azul e laranja, que viram a barra de progresso | Preloader, em todo carregamento da página |
| 10 | `docs/referencias/sobre-parte1.png`: meu layout da 1ª parte do Sobre (rodada 9) | Título com fitas grossas passando por trás, texto curto à esquerda e uma foto com moldura preta e sombra vermelha deslocada à direita | Sobre, parte 1 (a que abre pelo portal) |
| 11 | `docs/referencias/sobre-parte2.png`: meu layout da 2ª parte do Sobre (rodada 9) | Bloco inteiro em laranja: bio à esquerda, ferramentas à direita e "CERTIFICAÇÕES:" em Inter bold, caixa alta e tracking apertado | Sobre, parte 2 |
| 12 | `docs/referencias/sobre-ferramentas-github.png` e `cert-*.png`: ícones do meu GitHub e prints das certificações do LinkedIn (rodada 9) | Os ícones oficiais de cada ferramenta e os dados de cada certificação (emissora, data, código, competências) | Ferramentas e Certificações |
| 13 | `docs/referencias/prototipo-projetos.png`: meu protótipo da seção Projetos, com zoom reduzido (rodada 15) | Seção começando colada no bloco laranja, conteúdo numa coluna central mais estreita, "PROJETOS" com "(alguns)" como expoente, tagline em Inter bold na cor do projeto, rabiscos fantasma no fundo e uma fita grossa na margem esquerda | Projetos (a fita que acompanha a rolagem e muda de cor) |
| 14 | `docs/referencias/linkedin-experiencia.png` e `linkedin-formacao.png`, e os logos de FIAP, Oaktech e NTT DATA (rodada 17) | Cargos, instituições e períodos exatos, além dos logos oficiais | Trajetória |
| 15 | `docs/referencias/prototipo-fora-do-codigo.png`: meu protótipo da seção Fora do código (rodada 20) | Fundo branco com rabiscos fantasma, título com o comentário em script cruzando a base das letras, e as fotos numa faixa de painéis coloridos com cantos arredondados e uma linha preta deslocada embaixo | Fora do código |

---

## 3.2 Decisões de identidade visual

### Paleta

| Cor | Hex | Papel | Por quê |
| --- | --- | --- | --- |
| Branco | `#FFFFFF` | Fundo de todas as páginas (desde a rodada 1) | Deixa as cinco cores e a tipografia preta no máximo contraste, como no protótipo do hero |
| Preto | `#000000` | Texto, botões, fundos escuros (túnel, rodapé) | O protótipo usa preto puro. Com fundo branco, o quase-preto quente da versão anterior perdeu o sentido |
| Névoa | `#F8F4F4` | Rabiscos "fantasma" do fundo e superfícies claras (gráfico, miniaturas) | Dá textura ao fundo branco sem competir com as fitas coloridas |
| Bege | `#F2D6BE` | Apoio: texto sobre fundos escuros e detalhes (era o fundo até a rodada 1) | Continua sendo a cor quente da paleta original |
| Vermelho-alaranjado | `#F2380F` | Destaque: palavras em script, hover dos botões, fundo do Contato | A cor de maior energia vai para o que eu quero que a pessoa faça (falar comigo) |
| Lilás | `#DF98F2` | Rabiscos e fundo inteiro da Trajetória (com a prévia no fim de Projetos) | Suaviza a paleta e marca a seção mais "pessoal" |
| Azul | `#367FBE` | Rabiscos, sombra do retrato, linha do gráfico | O tom mais "técnico": aparece nos dados (gráfico do KNN) e nos detalhes |
| Laranja | `#F1913D` | Rabiscos, fita de skills e fundo inteiro da 2ª parte do Sobre (bio, ferramentas e certificações) | Faz a ponte entre o vermelho e o bege e dá energia ao bloco mais "currículo" da página |

### Tipografia

- **Inter** (100/300/400/500/700): todo o texto corrido e a interface, com tracking negativo na navegação e no texto do hero, como no protótipo. O peso 400 entrou na rodada 1 porque é o da navegação do protótipo. É neutra e muito legível, e não compete com as fontes de destaque.
- **Silver Crown**: títulos, números e o "BRANDÃO" do hero. É alta, condensada e tem terminais arredondados, a mesma família visual do meu logo. No hero, o "ÁLLEX" vem do logo vetorizado (A-robô e LL com gancho) e as demais letras são glifos da fonte convertidos em SVG, cada um na sua altura.
- **Pacifico**: os comentários entre parênteses e as taglines. Traz o tom de conversa e repete a curva dos rabiscos.

### Tom e personalidade

**Moderno e acolhedor, com humor leve.** Os títulos fazem perguntas e comentam a si mesmos ("Projetos *(com história)*", "Trajetória *(até aqui)*"). O texto é em primeira pessoa, direto e sem jargão de currículo. No layout, isso aparece no contraste entre a tipografia enorme e séria e os rabiscos soltos, que parecem feitos à mão.

### Estrutura da página

0. **Preloader:** logo + barra de progresso em quatro blocos da paleta. A barra mostra o carregamento real (fontes, retrato, logo) e, ao terminar, a tela sobe e libera a entrada do hero.
1. **Hero:** nome em degraus, uma frase sobre o que eu faço, retrato em círculo e CTAs, fiel ao meu protótipo. O retrato é a porta de entrada da animação.
2. **Sobre**, em duas partes. A 1ª (branca) abre pela pupila no fim do túnel: título com fitas, quem sou em uma frase, uma foto e, na base, uma prévia do bloco laranja. A 2ª (laranja, com linha preta no topo e na base) traz a bio, as ferramentas como adesivos presos numa fita com laços e as certificações.
3. **Projetos:** Revi, Data Hive, TAMA Drums Brasil e Titanic × KNN, com imagens, deploy e vídeos, numa coluna central. Na margem esquerda, uma fita com laços se desenha com a rolagem e assume a cor do projeto na tela. Só o Titanic aponta para o GitHub, por ser um modelo sem interface (os gráficos do notebook estão na página).
4. **Trajetória:** bloco lilás com formação e experiência profissional em ordem cronológica (FIAP Ciência de Dados → Oaktech → FIAP Engenharia de Software → NTT DATA), cada item com o ano, o logo, o cargo e o período. Na margem direita, uma fita branca se desenha com a rolagem.
5. **Fora do código:** fundo branco, um texto sobre o que gosto de fazer no tempo livre e as fotos (voz, bateria, Palmeiras) numa faixa de painéis coloridos com rolagem horizontal no desktop; no hover, cada foto ganha a cor do seu painel.
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

**Ajuste 2: Preloader e bug do zoom no Hero** (enviado junto com `docs/referencias/referencia-loader.png`)

```text
Certo, voltando ao tema do Hero, preciso em cada página de carregamento seja mais ou menos essa referencia que esta anexada aqui, com esses blocos coloridos sendo a progress bar do load.

Além disso tambem, tem um bug, principalente no Hero, quando eu tiro o zoom da página ou aumento ele continuan estatico, arrume isso
```

**Ajuste 3: Animação do cérebro no lugar da pupila** (enviado junto com uma captura do início da animação)

```text
Está quase bom, mas acho que essa animação ao scrollar para baixo e aparecer uma pupila e ampliar não ficou tao boa, poderia mudar para aparecer um cérebro animado na minha cabeça e ampliar os neuronios, tipo, como se o usuário estivesse vendo como funciona minha cabeça. A cor do cérebro pode ser a #DF98F2
```

**Ajuste 4: Volta da pupila, mais minimalista**

```text
Cara, ficou extremamente tenebroso. Volte ao que estava, apenas deixe a pupila mais minimalista e seguindo melhor o desenho da pupila do meu olho na foto
```

**Ajuste 5: Íris em círculos da paleta** (enviado junto com uma captura da íris da rodada 5)

```text
Não gostei da cor nem do modelo dess iris, quando eu disse minimalista, eu quis dizer pra voce deixas ainda apenas com as cores que fazem parte da paleta mas deixas apenas algumas circunferencias que formam a iris cada uma de uma cor que faz parte da pelta, entende?
```

**Ajuste 6: Botões do hero cortados com zoom 100%** (enviado junto com uma captura do hero)

```text
Mas agora perceba que, quando abre logo a seção hero, com o zoom da tela do navegador no padrao (100%), aparece cortado o ver projetos e fale comigo, ajuste isso para partirmos para as próximas correções
```

**Ajuste 7: Reload abrindo na seção Sobre**

```text
certo, mas agora quando eu dou um reload na pagina ta abrindo direto na seção sobre, tem que abrir no hero
```

**Ajuste 8: Seção Sobre** (enviado junto com `sobre-parte1.png`, `sobre-parte2.png`, `sobre-ferramentas-github.png` e os três prints de certificações)

```text
Certo, vamos partir agora para a seção sobre (O que eu faço)

Tenho aqui umas referencias anexadas do que eu preciso. Repare que a parte amarela é a segunda parte da mesma seção e ela inteira é a amrela (so essa segunda parte)

Na primeira (a que tem o titulo O que eu faço) só adione a borda branca a esse titulo que nem foi feita no hero pra nao ficar dificil distinguir com os squiggles de fundo. Também não gostei muito do texto, talves de pra deixar com menos citação academica a colocar palavras chaves como Engenheiro de IA, Ciência de Dados e Engenharia de Software.

Na parte das ferramentas utilizadas, da pra substituir os nomes pelos icosn das ferramentas (isso esta no meu github) https://github.com/Allexbrandao07

A parte do "certificações" deve conter fotos e elgumas informações de certificações que eu tirei. Isso tem no meu linkedIn, vavegue e identifique: https://www.linkedin.com/in/%C3%A1llex-brand%C3%A3o/?isSelfProfile=true

Me surpeenda positivamente com base nas referencias de design e faça ficar bom
```

**Ajuste 9: Refinos do Sobre** (enviado junto com três capturas: a 1ª parte do Sobre, o começo da 2ª e o fim do bloco laranja com as faixas)

```text
A primeira tela esta quase perfeita, só acho que o "blco" amarelo debaixo poderia aparecer um pedaço já nessa tela como "o que eu faço"

Também nao sei se gostei muito do começo da segunda tela, principalmente de como os icones das ferramentas estao dispostos, o hover dels...acho qu dá pra fazer algo mais inovador e condizente com o design. Melhore isso

A parte das certificações estão perfeitas, nao mexa (ou mexa no titulo, se achar que da pra fazer algo mais legal ou sei la)

Como ultimo ponto nessa seção, termine o "bloco" amarelo com uma linhazinha preta na borda (igual tem no inicio)

E tire essas faixas com essas tags ai do final (essas escritao ritmo, curiosidade, etc)
```

**Ajuste 10: Tags no cartão da OpenAI** (enviado junto com uma captura dos cartões)

```text
Cara, tá excelente, só na certificação da Open AI, tira esse Código da credencial 317957605 e deixa igual as outras duas, com essas tags embaixo
```

**Ajuste 11: Seção Projetos** (enviado junto com `docs/referencias/prototipo-projetos.png`)

```text
Certo, agora vamos para a seção "Projetos". Está anexado aqui um protótipo dessa tela também (essa referencia esta com o zoom reduzido porque senoa ia ficar cortado e mais dificil de entender a estetica e o conceito).

A ideia é que logo após o "bloco" amarelo que finaliza a seçao anterior ja entre a seção projetos com o primeiro projeto da Revi. Esse squizzle do lado esquerdo deve ser uma animação que vai acompanhando o scroll conforme o usuário for passando os projetos e deve ir mudando a cor dessa linha de acordo com a cor de moldura e detalhes de cada projeto (revi = azul, data hive = amarelo, site da tama = vermelho e knn = rosa/lilas)
```

**Ajuste 12: Créditos das equipes**

```text
Está quase ótimo, só preciso que voce, nos projetos que foram desenvolvidos em conjunto (Revi e Data Hive), voce de os creditos/mencione os demais integrantes dos grupos, tem tudo no github
```

**Ajuste 13: Seção Trajetória** (enviado junto com uma imagem de referência e os logos de FIAP, Oaktech e NTT DATA; a imagem anexada era, por engano, a mesma do protótipo de Projetos)

```text
ótimo, agora vamos partir para a seção "Trajetória"

Novamente, tenho aqui uma referencia que prototipei, mas o conceito é pareciso com a da seção anterior no que diz repeito a ter um squizzle acompanhando a rolagem do scroll, entretanto, essa linha agora ficará do lado oposto e será sempre branca.

Assim como a dinamica do "bloco" amarelo nas seções anteriores, esse "bloco" lilas dessa seção deve ficar aparecendo um pouco ao final da seção anterior.

Arrume também a ordem das experiencias/trajetoria e tire os projetos (Revi, Data Hive) e coloque as experiencias profissionais no lugar.

Siga a ordem cronológica: FIAP Ciencia de Dados, Estário Oaktech, FIAP Engenharia de Softwre e NTT Data Brasil (sempre com as datas)

Isso tem no meu LinkedIn nas partes de experiencia e formação academica, analise: https://www.linkedin.com/in/%C3%A1llex-brand%C3%A3o/?isSelfProfile=true

Aqui tem tambem as logos da FIAP, Oaktech e NTT Data
```

A IA não conseguiu abrir o LinkedIn e perguntou como seguir; escolhi mandar prints. Mensagem seguinte (com `linkedin-experiencia.png` e `linkedin-formacao.png`):

```text
Anexei aqui os cargos com as datas
```

**Ajuste 14: Trajetória mais enxuta e início da fita** (enviado junto com uma captura da descrição de um item e outra do começo cortado da fita)

```text
Está quase bom, tire essas descriçõeszinhas embaixo de cada "experiencia" da seção de trajetoria arrume esse co eço da linha dessa seção apenas que começa assim cortada
```

**Ajuste 15: Seção Fora do código** (enviado junto com `docs/referencias/prototipo-fora-do-codigo.png`)

```text
Certo, agora vamos para a penultima seção "fora do código". Coloquei uma referencia aqui para voce se basear, a premissa é que cada uma das fotos tem um "hover" de uma das cores da paleta diferentes.

Nessa descrição (onde tem "subtitulo legal aqui na imagem de referencia) troque para uma descrição melhor e menos comercial e mais instrutiva, tipo o que gosto de fazer no meu tempo livre
```

**Ajuste 16: Etiquetas das fotos** (enviado junto com uma captura da faixa de fotos)

```text
Tá top. Só nao gostei desse subtitulos embaixo, troque pra algo menos comercial
```

**Ajuste 17: Etiqueta da bateria**

```text
"baquetas na mão"

de jeito nenhum isso. Lá ele
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

| Campo | Rodada 2: Preloader |
| --- | --- |
| Problema | O site abria direto, sem tela de carregamento. Enquanto as fontes e o retrato carregavam, o hero podia aparecer "montando" (fonte trocando, foto surgindo depois), e as animações de entrada rodavam antes de tudo estar pronto |
| Prompt de correção | Pedi uma tela de carregamento em todo acesso, parecida com a referência anexada (logo + blocos coloridos), com os blocos funcionando como barra de progresso. Texto completo: Ajuste 2, em 3.3 |
| Resultado | Resolveu totalmente. Logo em SVG inline (aparece na hora, sem esperar a rede) e quatro blocos que enchem em sequência: cada um vale 1/4 do progresso. O progresso é real (fontes, retrato do hero, logo e o load da página), com 1,1s de tempo mínimo para não piscar e 8s de limite caso algo trave. Ao chegar a 100%, a tela sobe e só então as letras caem e as fitas se desenham. Respeita "movimento reduzido" e não aparece sem JS |
| Aprendizado | _(sugestão, revisar)_ Prever no prompt inicial os estados da página, e não só o layout pronto: carregamento, entrada e o que acontece antes das fontes chegarem. Também vale dizer de onde vem o progresso (real ou só animação) |

| Campo | Rodada 3: Hero estático com o zoom do navegador |
| --- | --- |
| Problema | Ao dar zoom no navegador (Ctrl + / Ctrl −), o hero e a navegação não mudavam de tamanho, enquanto o resto da página mudava. Causa: para reproduzir o protótipo, o hero era um "quadro" de 1366×768 que se ajustava à viewport (`100cqw / 1366`). O zoom muda a viewport em px CSS na mesma proporção, então a conta compensava o zoom e o tamanho físico ficava igual. Além de parecer bug, era um problema de acessibilidade: quem precisa ampliar o texto não conseguia |
| Prompt de correção | Pedi para corrigir o hero, que continuava estático ao tirar ou aumentar o zoom. Texto completo: Ajuste 2, em 3.3 |
| Resultado | Resolveu totalmente, na segunda tentativa. **1ª tentativa (descartada no teste):** trocar a conta contínua por degraus de tamanho por faixa de largura e altura. O teste simulando zoom mostrou que o hero ainda encolhia ao dar zoom (640 → 600 → 576px físicos), porque qualquer regra de "encaixar na tela" anula o zoom. **Solução final:** a unidade do protótipo virou px fixo (1u = 1px, com um único degrau de 0,86 para notebooks baixos). Quando o quadro deixa de caber (abaixo de 1280px CSS), o hero passa para um layout em fluxo com tamanhos em px/rem: duas colunas em janelas em paisagem, empilhado no celular. Medido com zoom simulado numa tela 1920×1080: o nome vai de 512 → 640 → 800 → 960px físicos entre 80% e 150%. Com zoom alto o hero fica mais alto que a tela: ele rola até mostrar os botões e só então prende para a animação da pupila, que continua mirando o centro da área visível. A animação desliga sozinha com zoom extremo (tela útil baixa demais) e volta ao tirar o zoom, sem recarregar a página |
| Aprendizado | _(sugestão, revisar)_ Pedir "fiel ao protótipo" sem dizer como ele deve se comportar em outras telas levou a uma solução que só funcionava no tamanho do protótipo. No prompt inicial, eu incluiria critérios de QA: zoom de 80% a 200%, larguras mínima e máxima e o que deve acontecer quando o layout não cabe |

| Campo | Rodada 4: Animação do hero (pupila → cérebro) |
| --- | --- |
| Problema | O zoom na pupila funcionava, mas não convenceu. A foto ampliada ficava borrada antes da íris assumir, e a ideia de "entrar no olho" dizia pouco sobre mim. Eu queria que a animação mostrasse "como funciona a minha cabeça", o que conversa melhor com IA e redes neurais |
| Prompt de correção | Pedi para trocar a pupila por um cérebro animado aparecendo na minha cabeça e ampliar até os neurônios, na cor `#DF98F2`. Texto completo: Ajuste 3, em 3.3 |
| Resultado | Resolveu totalmente. A IA mapeou o crânio no retrato (centro e inclinação de ~10° pela linha dos olhos). A nova sequência: (1) raio-x, a foto escurece em volta da cabeça; (2) surge um cérebro lilás em dois hemisférios, com as dobras se desenhando como os rabiscos do site e faíscas na paleta piscando; (3) o zoom mergulha numa dobra até o lilás tomar a tela; (4) entra uma rede de 34 neurônios em 3D, com dendritos rabiscados, axônios e sinais elétricos correndo em tempo real, e a câmera atravessa a rede; (5) o neurônio central vem até a tela e o corpo branco dele vira o portal do Sobre. No 1º teste, os neurônios distantes se amontoavam no centro e os próximos viravam "fantasmas" enormes. A IA espalhou a rede, apagou os distantes e fez os próximos sumirem antes de crescer. Testado no desktop, no celular e com zoom do navegador |
| Aprendizado | _(sugestão, revisar)_ Em vez de descrever uma animação pela técnica ("zoom na pupila", copiando a referência), descrever a ideia que ela deve comunicar ("ver como funciona a minha cabeça"). A referência em vídeo serviu para o movimento, mas a metáfora precisava ser minha desde o prompt inicial |

| Campo | Rodada 5: Volta da pupila, minimalista |
| --- | --- |
| Problema | A animação do cérebro com neurônios (rodada 4) ficou "tenebrosa": dendritos pretos e grossos, muitas formas orgânicas e o fundo lilás saturado criaram um clima sombrio, longe do tom leve do site. Já a pupila original funcionava; o que incomodava nela era a íris colorida de rabiscos, que não parecia o meu olho |
| Prompt de correção | Pedi para voltar à animação da pupila, só que com uma pupila mais minimalista e fiel ao desenho do meu olho na foto. Texto completo: Ajuste 4, em 3.3 |
| Resultado | Resolveu totalmente. O cérebro e a rede de neurônios foram removidos e a animação da pupila voltou, mantendo as correções das rodadas 2 e 3 (preloader e zoom do navegador), que a versão do commit anterior não tinha. A íris foi redesenhada a partir da foto: a IA mediu as cores do olho anel por anel (pupila `#0E1114`, íris castanho-escura) e o tamanho real da íris (raio ~10px, antes 13). Ficou um disco com degradê suave, um único anel sutil e o reflexo de luz no mesmo lugar do da foto, sem fibras coloridas e sem girar. No 1º teste a íris desenhada ficou um tom mais clara que a da foto ao redor; foi escurecida e conferida de novo. O túnel de anéis e o portal continuam iguais |
| Aprendizado | _(sugestão, revisar)_ Ao pedir uma mudança grande ("troca por um cérebro"), vale descrever também o clima esperado (leve, divertido, com bastante branco), não só o tema. E quando algo está "quase bom", corrigir o detalhe que incomoda (a íris) costuma funcionar melhor do que trocar a ideia inteira |

| Campo | Rodada 6: Íris em círculos da paleta |
| --- | --- |
| Problema | A íris da rodada 5 copiou o olho real (castanho com degradê e reflexo de luz). Ficou realista e escura, fora da paleta, e não era o "minimalista" que eu queria. A IA entendeu "minimalista e seguindo o desenho do meu olho" como "fiel à foto", e eu queria "simples e na identidade do site" |
| Prompt de correção | Expliquei que minimalista era usar só as cores da paleta: uma íris feita de poucas circunferências, cada uma de uma cor. Texto completo: Ajuste 5, em 3.3 |
| Resultado | Resolveu totalmente. A íris virou quatro círculos concêntricos chapados, de fora para dentro: azul, lilás, laranja e vermelho-alaranjado, com contorno preto (como a foto e as letras do hero). A pupila preta ocupa o centro. Saíram o degradê, o anel sutil e o reflexo. Do olho real ficaram só a posição e a proporção entre íris e pupila. O túnel e o portal continuam iguais |
| Aprendizado | _(sugestão, revisar)_ "Minimalista" é ambíguo: pode significar "realista e discreto" ou "gráfico e chapado". Teria economizado uma rodada descrever a forma ("círculos concêntricos, um por cor da paleta") em vez do adjetivo, ou mandar um rascunho rápido da íris |

| Campo | Rodada 7: Botões do hero abaixo da dobra |
| --- | --- |
| Problema | Com zoom 100%, os botões "Ver projetos" e "Fale comigo" apareciam cortados na base da tela. Causa: desde a rodada 3 o hero tem tamanho fixo (1u = 1px, 768px de altura), e só havia um degrau de redução para telas com até 700px de altura útil. Telas com 700–768px de altura útil (ex.: 1920×1080 com escala de 125% do Windows, que dá ~1513×694 no navegador, ou notebooks com a barra do navegador) ficavam com os botões fora da tela |
| Prompt de correção | Pedi para ajustar o hero para os botões não aparecerem cortados ao abrir a página com zoom 100%. Texto completo: Ajuste 6, em 3.3 |
| Resultado | Resolveu totalmente. O degrau único virou seis degraus de altura (760, 720, 680, 640, 600 e 560px), cada um calculado para que o conteúdo útil do hero (até a base dos botões, 740 unidades do protótipo) caiba na menor altura da faixa. A altura mínima do hero passou de 768u para 740u: a faixa de baixo do quadro só tem fitas e pode sobrar. Testado em 9 resoluções com zoom 100% (1366×768, 1366×657, 1513×694, 1536×730, 1440×789, 1920×969, 1280×600, 1600×760, 1280×720): botões visíveis e o nome nunca encosta na nav. O zoom do navegador continua ampliando o hero (1920×1080: 512 → 640 → 800 → 883px de largura do nome entre 80% e 150%) |
| Aprendizado | _(sugestão, revisar)_ O protótipo foi desenhado em 1366×768, mas quase nenhuma tela real mostra 768px de altura útil (barra do navegador, escala do Windows). No prompt inicial, eu pediria explicitamente: "todo o conteúdo do hero visível sem rolar nas resoluções X, Y e Z", com uma lista de telas para testar |

| Campo | Rodada 8: Reload abrindo no Sobre |
| --- | --- |
| Problema | Ao recarregar a página (F5), ela abria direto na seção Sobre e não no hero. Duas causas, uma delas minha: (1) o navegador restaura a posição de rolagem no reload, e como o hero é uma pista longa de rolagem, a posição restaurada caía em outro ponto da animação; (2) ao clicar em "Sobre" no menu, eu gravava `#sobre` na URL (`history.replaceState`), e o código que trata links diretos para `#sobre` mandava o reload para o fim da animação. Um efeito colateral da correção da rodada 1, que eu não tinha testado com reload |
| Prompt de correção | Pedi para a página abrir no hero ao recarregar. Texto completo: Ajuste 7, em 3.3 |
| Resultado | Resolveu totalmente. Três mudanças em `js/main.js`: a restauração automática de rolagem do navegador foi desligada (`history.scrollRestoration = 'manual'`); no reload a página vai ao topo e descarta qualquer âncora da URL; e o clique em "Sobre" deixou de gravar `#sobre` na URL. Link direto com âncora (alguém abrindo `/#projetos` ou `/#sobre`) continua levando à seção, porque só o reload é tratado. Testado em 7 cenários: reload depois de clicar em Sobre, em Projetos, depois de rolar 5000px e com `#sobre` na URL (todos voltam a `y = 0`), e links diretos para `#projetos` e `#sobre` (continuam funcionando) |
| Aprendizado | _(sugestão, revisar)_ Toda correção de navegação deve ser testada também no reload e no link direto, não só no clique. Eu pediria no prompt inicial uma lista de estados a testar: "primeira visita, reload, voltar do histórico, link com âncora" |

| Campo | Rodada 9: Seção Sobre |
| --- | --- |
| Problema | O Sobre gerado na primeira versão não seguia o layout que eu queria. O título "O que eu faço? (e amo fazer)" se confundia com os rabiscos, o texto soava acadêmico ("formado em… pela FIAP"), as ferramentas eram só nomes em pílulas, e havia blocos que eu não pedi (números de impacto e uma nuvem de palavras). Faltavam as certificações |
| Prompt de correção | Mandei dois layouts (parte 1 branca, parte 2 inteira em laranja) e pedi: contorno branco no título como no hero; texto menos acadêmico, com "Engenheiro de IA", "Ciência de Dados" e "Engenharia de Software"; os ícones das ferramentas do meu GitHub no lugar dos nomes; e as certificações do LinkedIn com fotos e informações. Texto completo: Ajuste 8, em 3.3 |
| Resultado | Resolveu totalmente, com uma ressalva. **Parte 1:** título com contorno branco (`-webkit-text-stroke` + `paint-order`) e três fitas grossas (azul, lilás, laranja) atrás dele, que se desenham quando o portal do zoom abre; rabiscos fantasma no fundo; texto novo com as três palavras-chave em marca-texto da paleta; e a foto do setup com moldura preta e sombra vermelha. **Parte 2 (laranja):** bio, 16 ferramentas em "adesivos" brancos (os 9 ícones do meu GitHub e mais Power BI, Pandas, scikit-learn, Keras, Databricks, n8n e JavaScript), que entram em sequência e se inclinam no hover; e "CERTIFICAÇÕES:" com três cartões (faixa colorida, selo com o logo da emissora, nome, data, código ou competências) e um botão para as credenciais no LinkedIn. **Ressalva:** a IA não consegue abrir o LinkedIn (o site bloqueia acesso automatizado), então as certificações vieram dos três prints. No 1º teste as fitas do título invadiam o texto e o JavaScript ficava sozinho numa linha; as fitas foram contidas na altura do título, o texto ganhou respiro e a grade virou 4×4 |
| Aprendizado | _(sugestão, revisar)_ Mandar o layout desenhado funcionou de novo, como no hero. Para dados que estão atrás de login (LinkedIn), é melhor já colar o conteúdo ou os prints no prompt: a IA não consegue navegar em páginas que exigem conta |

| Campo | Rodada 10: Prévia do bloco laranja na 1ª tela do Sobre |
| --- | --- |
| Problema | A 1ª tela do Sobre (a que abre pela pupila) ficava inteira branca. Nada indicava que havia mais conteúdo logo abaixo, e a passagem para o bloco laranja era um corte seco |
| Prompt de correção | Pedi que um pedaço do bloco laranja já aparecesse na tela do "O que eu faço?". Texto completo: Ajuste 9, em 3.3 |
| Resultado | Resolveu totalmente. A 1ª tela ganhou na base uma faixa laranja com a mesma linha preta do topo do bloco (entre 56 e 112px, conforme a altura da tela). O bloco laranja de verdade começa colado nela, sem emenda: a linha preta do topo passou para a faixa. O conteúdo da 1ª tela foi reposicionado para não encostar na faixa, e em celulares baixos a foto sai para tudo caber na tela presa do zoom |
| Aprendizado | _(sugestão, revisar)_ Pensar nas "dobras" entre seções desde o começo: o que aparece na base de cada tela convida a rolar. Isso dá para pedir no prompt inicial ("cada seção mostra um pedaço da próxima") |

| Campo | Rodada 11: Ferramentas mais criativas |
| --- | --- |
| Problema | As ferramentas em grade 4×4 de cartões brancos, com hover de "levantar e inclinar", ficaram corretas mas genéricas. Pareciam um componente de template e não conversavam com as fitas e laços que são a marca do site |
| Prompt de correção | Pedi uma disposição e um hover mais inovadores e coerentes com o design. Texto completo: Ajuste 9, em 3.3 |
| Resultado | Resolveu totalmente. As ferramentas viraram **adesivos redondos presos numa fita lilás com contorno preto**. A fita serpenteia em 4 fileiras de ida e volta e dá um **laço** em cada virada, como as fitas do hero. A rolagem desenha a fita, e cada adesivo "gruda" (gira e cresce) quando o traço passa por ele. No hover ou foco (teclado e toque), o adesivo dá uma volta completa e mostra o nome numa etiqueta em Pacifico; cada adesivo tem uma inclinação própria, como se tivesse sido colado à mão. A fita é recalculada para a largura da tela. No 1º teste as viradas saíram como bicos pontudos; a IA passou a gerar cada virada integrando a direção do traço (meia-volta + um laço completo). No celular, a largura dos laços foi limitada à margem para não sair da tela |
| Aprendizado | _(sugestão, revisar)_ "Mais inovador" sozinho é vago. Funcionou porque veio junto com "condizente com o design": a IA reaproveitou o elemento mais marcante da identidade (a fita com laços) em vez de inventar um efeito novo. No prompt inicial, eu listaria os "elementos-assinatura" que devem se repetir pelo site |

| Campo | Rodada 12: Título das certificações |
| --- | --- |
| Problema | Os cartões das certificações estavam bons, mas o título "CERTIFICAÇÕES:" ficou seco perto dos outros títulos do site, que têm um comentário em script e um rabisco |
| Prompt de correção | Deixei os cartões como estavam e liberei mexer só no título, se desse para melhorar. Texto completo: Ajuste 9, em 3.3 |
| Resultado | Resolveu totalmente. O título ganhou o comentário "(e contando)" em Pacifico (preto, para ter contraste no laranja) e um rabisco preto embaixo que se desenha com a rolagem, no mesmo padrão de "Projetos (com história)" e "Trajetória (até aqui)". Os cartões não foram alterados |
| Aprendizado | _(sugestão, revisar)_ Definir no início um "padrão de título" (palavra em caixa alta + comentário em script + rabisco) e pedir para aplicá-lo em todo título novo |

| Campo | Rodada 13: Acabamento do bloco laranja |
| --- | --- |
| Problema | O bloco laranja do Sobre tinha linha preta só no topo e terminava "aberto". Logo depois vinham duas faixas inclinadas com palavras soltas (Ritmo, Curiosidade, Pipeline…) que não acrescentavam nada e poluíam a passagem para Projetos |
| Prompt de correção | Pedi uma linha preta na base do bloco laranja, igual à do topo, e a remoção das faixas de tags. Texto completo: Ajuste 9, em 3.3 |
| Resultado | Resolveu totalmente. O bloco laranja ganhou a linha preta na base, e as duas faixas foram removidas do HTML, do SCSS e do JS (o código que duplicava o conteúdo para o loop também saiu) |
| Aprendizado | _(sugestão, revisar)_ Elementos decorativos sem função (como as faixas) entraram porque o prompt inicial dava liberdade total de animação. Vale dizer no início o que *não* quero: "nada de faixas ou letreiros correndo" |

| Campo | Rodada 14: Cartão da OpenAI fora do padrão |
| --- | --- |
| Problema | O cartão da certificação da OpenAI mostrava "Código da credencial 317957605" no lugar das tags de competências, quebrando o padrão dos outros dois cartões. O número não diz nada a quem visita o portfólio |
| Prompt de correção | Pedi para tirar o código da credencial e deixar o cartão igual aos outros, com tags embaixo. Texto completo: Ajuste 10, em 3.3 |
| Resultado | Resolveu totalmente. O código saiu e entraram as tags "Codex" e "IA generativa", no mesmo estilo dos outros cartões. O CSS que só servia para o código foi removido. Obs.: o print do LinkedIn dessa certificação não lista competências, então as tags foram escolhidas a partir do nome da certificação |
| Aprendizado | _(sugestão, revisar)_ Na rodada 9 a IA preencheu cada cartão com o que havia em cada print, e por isso um ficou diferente. Pedir "todos os cartões com a mesma estrutura" teria evitado essa rodada |

| Campo | Rodada 15: Seção Projetos |
| --- | --- |
| Problema | A seção Projetos ocupava a largura toda, com um rabisco pequeno embaixo do título e "(com história)", e nada ligava visualmente um projeto ao outro. Eu queria a seção colada no bloco laranja, mais enxuta, e uma fita na margem esquerda que acompanhasse a leitura dos projetos |
| Prompt de correção | Mandei um protótipo da tela (com zoom reduzido) e pedi que a fita da esquerda acompanhasse a rolagem e mudasse de cor conforme o projeto: Revi azul, Data Hive laranja, TAMA vermelho e KNN lilás. Texto completo: Ajuste 11, em 3.3 |
| Resultado | Resolveu totalmente. O conteúdo foi para uma coluna central de até 1100px. O título virou "PROJETOS" com "(alguns)" em Pacifico como expoente, sem o rabisco embaixo. As taglines dos projetos passaram de Pacifico para Inter bold em caixa alta, na cor do projeto (escurecida com `color-mix` para ter contraste no branco). O fundo ganhou rabiscos fantasma. **A fita:** é uma trocoide vertical (a mesma curva com laços das outras fitas) que nasce na linha preta do bloco laranja e desce pela margem esquerda, perto do conteúdo. A rolagem desenha a fita até 78% da altura da tela, com uma "ponta de caneta" branca no fim do traço, e a cor muda suavemente para a do projeto que cruza o meio da tela. A largura dos laços acompanha o espaço livre da margem; em telas estreitas a fita fica fina, só ondulada, colada na borda, e o conteúdo abre espaço para ela. No 1º teste a fita ficava longe do conteúdo em telas largas; ela foi alinhada ao lado direito da margem, como no protótipo. Testado em 1366×768, 1920×940, celular e com zoom de 50% (para comparar com o protótipo) |
| Aprendizado | _(sugestão, revisar)_ Mandar o protótipo com zoom reduzido ajudou a passar o conceito, mas deixou as proporções ambíguas: a IA teve que deduzir o zoom pelo tamanho do texto. Vale dizer o zoom usado ou mandar também um recorte em 100% |

| Campo | Rodada 16: Créditos das equipes |
| --- | --- |
| Problema | O Revi e o Data Hive foram feitos em grupo, mas a página só dizia "equipe de 5" e "equipe Beekeepers", sem nomear ninguém. Isso passava a impressão de um trabalho solo e não dava crédito aos colegas |
| Prompt de correção | Pedi para mencionar os demais integrantes dos dois projetos, usando os dados do GitHub. Texto completo: Ajuste 12, em 3.3 |
| Resultado | Resolveu totalmente. Cada projeto ganhou um bloco "Feito em equipe com", com cada integrante numa pílula com as iniciais na cor do projeto. **Revi** (`INTEGRANTES.txt` do repositório do front-end): Henrique Caruso Bueno, Erick Nathan Capito Pereira, Murilo Gomes Vasconcelos e Enzo Ribeiro Abreu. **Data Hive** (seção "Autores" do README): Diego Augusto Oliveira Rocha, Guilherme Agostinho Canella, Lorenzo Azevedo Frigoglietto e Vinicius Cremon Giomo. Decisões da IA: os RMs **não** foram publicados, por serem números de matrícula dos colegas; e os nomes ficaram sem link para o GitHub, porque os repositórios do Revi agora estão fechados para a API e só um integrante do Data Hive tem nome público no perfil, então não daria para linkar todos com certeza |
| Aprendizado | _(sugestão, revisar)_ Em projetos de grupo, os créditos deveriam estar no prompt inicial ("nos projetos em equipe, cite os integrantes"). É uma questão de ética, não de layout, e não deveria depender de eu lembrar depois |

| Campo | Rodada 17: Dinâmica da Trajetória (prévia lilás + fita branca) |
| --- | --- |
| Problema | A Trajetória não seguia a linguagem das seções novas. Tinha uma linha lilás à esquerda (que agora brigaria com a fita de Projetos) e começava com um corte seco depois de Projetos, sem a "prévia" que o bloco laranja ganhou |
| Prompt de correção | Pedi o mesmo conceito de Projetos (uma fita acompanhando a rolagem), mas do lado oposto e sempre branca, e que o bloco lilás aparecesse um pouco no fim da seção anterior. Texto completo: Ajuste 13, em 3.3 |
| Resultado | Resolveu totalmente. O código da fita de Projetos virou um componente reutilizável (`makeTrail`): cada seção com `data-trail-section` ganha sua fita, e `data-trail-side="right"` espelha para a margem direita. Na Trajetória a fita é branca com contorno preto (para destacar no lilás), com a mesma ponta de caneta e os mesmos laços que se ajustam à margem; em telas estreitas fica fina, colada na borda direita. Projetos ganhou na base uma faixa lilás com linha preta (`.peek`, agora genérica), e a Trajetória começa colada nela. A fita de Projetos foi ajustada para terminar antes da faixa. A linha lilás antiga da esquerda saiu. Obs.: a imagem anexada como protótipo era a mesma de Projetos; a IA avisou e seguiu a descrição do texto |
| Aprendizado | _(sugestão, revisar)_ Quando uma seção repete o conceito de outra, dizer só o que muda ("lado oposto, sempre branca") foi eficiente e gerou um componente reaproveitável, em vez de código duplicado. Conferir os anexos antes de enviar evita confusão |

| Campo | Rodada 18: Conteúdo da Trajetória |
| --- | --- |
| Problema | A trajetória misturava formação com projetos (Revi e Data Hive, que já estão em Projetos), não tinha nenhuma experiência profissional, não seguia a ordem cronológica e não tinha datas exatas: a IA não conseguia abrir o LinkedIn e só tinha o que estava no GitHub |
| Prompt de correção | Pedi para tirar os projetos, colocar as experiências profissionais e seguir a ordem cronológica com datas (FIAP Ciência de Dados, Oaktech, FIAP Engenharia de Software, NTT DATA). Mandei os logos e, como a IA não conseguiu acessar o LinkedIn, os prints de Experiência e Formação acadêmica. Texto completo: Ajuste 13, em 3.3 |
| Resultado | Resolveu totalmente. A IA tentou o LinkedIn de novo (bloqueado) e uma busca na web (sem resultado), então **perguntou** em vez de inventar datas, e parou até eu mandar os prints. Ficaram 4 itens: **FIAP, CST em Ciência de Dados** (2024–2025); **Oaktech, Estagiário em Integrações de Dados & IA** (set. 2025 – abr. 2026); **FIAP, Bacharelado em Engenharia de Software** (jan. 2026 – dez. 2029, "Cursando"); **NTT DATA Europe & Latam, Engenheiro de IA Júnior** (abr. 2026 – atual, "Agora"). Cada item tem o ano de início grande, o logo num adesivo branco, o tipo (Formação/Estágio/Experiência), cargo, empresa e uma descrição curta. Os logos foram recortados das imagens enviadas. As descrições ficaram só com o que é fato; a IA removeu uma frase que atribuía atividades à NTT DATA que não constavam no LinkedIn |
| Aprendizado | _(sugestão, revisar)_ De novo: dados atrás de login (LinkedIn) precisam ir no prompt, como texto ou print. Foi positivo a IA perguntar em vez de inventar datas numa linha do tempo profissional. Vale escrever eu mesmo as descrições de cada experiência, porque só eu sei o que fiz em cada uma |

| Campo | Rodada 19: Descrições e início da fita na Trajetória |
| --- | --- |
| Problema | (1) Cada item da Trajetória tinha uma descrição curta que deixava a seção pesada e repetia o que o cargo e a instituição já diziam. (2) A fita branca começava "cortada" no topo do bloco lilás: a curva nasce subindo, e o primeiro trecho saía pelo topo da seção. Em Projetos isso some porque a fita parece nascer da linha preta do bloco laranja, mas no lilás contínuo o corte ficava à mostra |
| Prompt de correção | Pedi para tirar as descrições de cada item e arrumar o começo cortado da fita. Texto completo: Ajuste 14, em 3.3 |
| Resultado | Resolveu totalmente. As descrições saíram do HTML (e o estilo que só servia a elas, do SCSS). Cada item ficou com ano, logo, tipo, período, cargo e instituição. A fita ganhou a opção `data-trail-start="cap"`: a curva começa no ponto mais alto do primeiro laço, 36px abaixo do topo, então a ponta arredondada e o contorno preto aparecem inteiros. Projetos continua como antes, nascendo da linha do bloco laranja |
| Aprendizado | _(sugestão, revisar)_ Em linha do tempo, menos texto funciona melhor: o cargo e a instituição já contam a história. E componentes reaproveitados (a fita) precisam ser revisados no novo contexto: o que funcionava numa seção com borda no topo não funcionou numa sem |

| Campo | Rodada 20: Seção Fora do código |
| --- | --- |
| Problema | A seção era preta, com as fotos soltas e uma frase de efeito ("Quando a tela desliga, sobra ritmo…") que soava mais slogan do que apresentação. Destoava das outras seções, que já seguiam os protótipos (fundo claro, painéis coloridos, contorno preto) |
| Prompt de correção | Mandei um protótipo e pedi que cada foto tivesse um "hover" de uma cor diferente da paleta, e que o subtítulo virasse uma descrição menos comercial, sobre o que gosto de fazer no tempo livre. Texto completo: Ajuste 15, em 3.3 |
| Resultado | Resolveu totalmente. Fundo branco com rabiscos fantasma. O título "FORA DO CÓDIGO" ganhou "(o que gosto de fazer)" em Pacifico vermelho cruzando a base das letras, os dois com contorno branco. Texto novo: *"Quando fecho o notebook, o ritmo muda: canto, toco bateria e acompanho o Palmeiras sempre que posso — de preferência na arquibancada. É nessas horas que recarrego a energia (e a criatividade) que levo de volta para o código."* As fotos ficaram numa faixa de painéis colados (azul, laranja, lilás) com cantos arredondados e a linha preta deslocada embaixo, como no protótipo. **Hover:** a foto inclina, cresce de leve, a etiqueta gira e a foto é recolorida na cor do próprio painel. A rolagem horizontal presa continua no desktop; no celular tudo fica empilhado. **Dois problemas apareceram no teste e foram corrigidos:** (1) o `overflow: hidden` usado para cortar os rabiscos quebrou o `position: sticky` e a faixa subia em vez de deslizar; trocado por `overflow: clip`, que corta sem criar contêiner de rolagem; (2) o banho de cor com `multiply` quase não aparecia nas fotos escuras de palco; trocado por `color`, que recolore de fato |
| Aprendizado | _(sugestão, revisar)_ "Hover de uma cor" pode ser lido de várias formas (fundo, borda, filtro). O protótipo resolveu a parte estática, mas para estados interativos vale descrever o efeito ("a foto fica tingida da cor do painel"). E pedir o texto pela intenção ("menos comercial, sobre meu tempo livre") funcionou melhor do que deixar "subtítulo legal aqui" |

| Campo | Rodada 21: Etiquetas das fotos em Fora do código |
| --- | --- |
| Problema | As etiquetas em Pacifico sob o nome de cada foto ("no palco", "não é à toa a TAMA", "coração verde") soavam como slogans: puxavam para piada e marketing em vez de dizer o que cada foto mostra |
| Prompt de correção | Pedi para trocar as etiquetas por algo menos comercial. Texto completo: Ajuste 16, em 3.3 |
| Resultado | Resolveu totalmente. As etiquetas passaram a descrever, em poucas palavras, o que aparece em cada foto: **Voz** "cantar ao vivo", **Bateria** "baquetas na mão" (trocado na rodada 22) e **Palmeiras** "da arquibancada". O estilo (pílula em Pacifico, inclinada, que gira no hover) foi mantido |
| Aprendizado | _(sugestão, revisar)_ O tom do texto também faz parte da identidade. Se o prompt inicial dissesse "textos simples e pessoais, sem frases de efeito", a IA teria evitado slogans em todas as seções, e não só onde eu reclamei |

| Campo | Rodada 22: Etiqueta da bateria com duplo sentido |
| --- | --- |
| Problema | A etiqueta "baquetas na mão", criada na rodada 21, tem duplo sentido em português informal, o que é inadequado num portfólio profissional |
| Prompt de correção | Recusei a expressão. Texto completo: Ajuste 17, em 3.3 |
| Resultado | Resolveu totalmente. A etiqueta virou "no compasso", termo musical e sem ambiguidade |
| Aprendizado | _(sugestão, revisar)_ A IA não percebe bem gírias e duplos sentidos regionais. Todo texto gerado precisa de uma leitura humana antes de publicar, principalmente em português informal |

| Campo | Rodada 23 |
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
- Ícones das ferramentas: [Devicon](https://devicon.dev) (MIT) e [Simple Icons](https://simpleicons.org) (CC0). Power BI vem do Wikimedia Commons e Oracle Cloud e Data Modeler, dos sites da Oracle e da 1000logos. As marcas pertencem às respectivas empresas.
- Logos da FIAP, Oaktech e NTT DATA: imagens enviadas por mim, recortadas para o site. As marcas pertencem às respectivas empresas.
- A foto do setup na 1ª parte do Sobre foi recortada da minha referência de layout (`docs/referencias/sobre-parte1.png`) e tem só 439×289px; vale trocar pelo arquivo original. O logo da Alura também é um recorte do print do LinkedIn.
