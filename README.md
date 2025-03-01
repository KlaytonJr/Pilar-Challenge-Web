<img src="https://github.com/KlaytonJr/Pilar-Challenge-Web/blob/main/src/assets/docs/pilar-cover.png?raw=true" alt=" Logo" style="width: 100%; height: 400px; object-fit: cover;">

<h1 align="center">Pilar Challenge</h1>

<p align="center">Desafio técnico para vaga de Desenvolvedor Frontend Senior na Pilar.</p>

<p align="center">
    <img alt="Static Badge" src="https://img.shields.io/badge/Vue.js-123?logo=vue.js&style=flat">
    <img alt="Static Badge" src="https://img.shields.io/badge/Vite.js-123?logo=vite&style=flat">
    <img alt="Static Badge" src="https://img.shields.io/badge/TypeScript-123?logo=TypeScript&logoColor=1d4ed8&style=flat">
    <img alt="Static Badge" src="https://img.shields.io/badge/CSS-123?logo=CSS3&style=flat">
    <img alt="Static Badge" src="https://img.shields.io/badge/Tailwindcss-123?logo=Tailwindcss&style=flat">
</p>

## Stack utilizada

**Front-end:** Vue.js 3, Vite, Typescript, Tailwindcss

## Visualize o design no Figma

Acesse o arquivo do figma e tenha acesso as minhas insipirações para esse projeto e ao layout que eu desenvolvi 😊

[Clique para acessar o Movie Now no Figma](https://www.figma.com/design/D1fy4lfZqT6JGLIgNpFGNa/Pilar-Challenge?node-id=0-1&t=JpIb24slhuN44UVf-1)

## Acesse o projeto online

<img src="https://github.com/KlaytonJr/Pilar-Challenge-Web/blob/main/src/assets/docs/Thumbnaill.jpg?raw=true" alt=" Logo" style="width: 100%; height: 450px; object-fit: cover;">

[Clique para acessar o Movie Now](https://pilar-challenge-c8e47.web.app/list/movies) meu projeto para o desafio técnico da Pilar.

O projeto foi publicado usando o Firebase Hosting. Para que por meio desse eu pudesse acessar o projeto em tempo real e aprender mais sobre a ferramente e a configuração de 'enviroment variables'.

## Features

- [x] Home Page

- [x] Slider automático com lançamentos recentes
- [x] Busca por filmes e séries por nome
- [x] Lista de filmes em cartaz no cinema no Brasil (os 20 últimos lançamento disponíveis)
- [x] Lista de filmes populares desenvolvido com Infinity Scroll, carregando mais itens conforme o usuário rola o carrosel

- [x] Lista de filmes e séries com filtro por gênero e ordenação
- [x] Página de detalhes do filme ou série

## Features futuras

- [] Implementação do firebase auth
- [] Implementação de um sistema de favoritos salvo no firebase firestore
- [] Implementação de um sistema de comentários usando o Hyvor Talk
- [] Melhorias no design para melhorar a acessibilidade do layout
- [] Melhorias de SEO para mehorar o rank do site nos motores de busca

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/KlaytonJr/Pilar-Challenge-Web.git
```

Entre no diretório do projeto

```bash
  cd Pilar-Challenge-Web
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```

## Performance

![Performance Before Screenshot](https://github.com/KlaytonJr/Pilar-Challenge-Web/blob/main/src/assets/docs/performance-before.png?raw=true)

A nível de documentação, antes de fazer o deploy e da implementação do Lazy Loading para as imagens as métricas de performance eram as da imagem anterior. Após a implementação do Lazy Loading, as métricas de performance melhoraram bastante e com o deploy da aplicação as métricas melhoraram relativamente ao que era antes devido as otimizações feitas ao 'buildar' a aplicação.

![Performance After Screenshot](https://github.com/KlaytonJr/Pilar-Challenge-Web/blob/main/src/assets/docs/performance-after.png?raw=true)

Com base no Lighthouse, a aplicação tem um score de 100 em performance, 92 em acessibilidade, 91 em SEO e 100 em melhores práticas. Para melhorar a acessibilidade e SEO, pode ser feito u estudo a cerca do uso de meta tags, bem como o uso de tags semânticas para melhorar a indexação da aplicação e melhorias no design da aplicação para atender todos as objeções de acessibilidade, atendendo aos requisitos da <a href="https://www.w3.org/TR/WCAG21/">WCAG (Web Content Accessibility Guidelines (WCAG) 2.1)</a> da W3C.

## Screenshots

<img src="https://github.com/KlaytonJr/Pilar-Challenge-Web/blob/main/src/assets/docs/movie-now.gif?raw=true" alt="App Gif" style="width: 100%; height: auto;">

![App Screenshot Success](https://github.com/KlaytonJr/Pilar-Challenge-Web/blob/main/src/assets/docs/Home.jpg?raw=true)
![App Screenshot Success](https://github.com/KlaytonJr/Pilar-Challenge-Web/blob/main/src/assets/docs/Movie.jpg?raw=true)
![App Screenshot Success](https://github.com/KlaytonJr/Pilar-Challenge-Web/blob/main/src/assets/docs/Movie2.jpg?raw=true)

## Unit Tests

Para rodar os testes unitários, execute o seguinte comando

```bash
  npm run test:unit
```

Para verificar a cobertura de testes, execute o seguinte comando

```bash
  npm run test:coverage
```

Em meus testes cheguei ao seguinte resultado de cobertura de testes

![App Test Coverage](https://github.com/KlaytonJr/Pilar-Challenge-Web/blob/main/src/assets/docs/unit-tests-coverage.png?raw=true)

## E2e Tests

Para rodar os testes unitários, execute o seguinte comando

```bash
  npm run test:e2e:dev
```

Os testes automatizados com Cypress foram feitos para testar a navegação da aplicação e a busca de filmes e séries.
