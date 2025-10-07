# 🚀 Meu Portfólio Pessoal v1.0

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-blue?style=for-the-badge)
![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-green?style=for-the-badge)

---

## ✨ [Acesse a Versão Ao Vivo](https://guilhermepersuhn.com.br)

---

## 🎯 Sobre o Projeto

Este é o meu portfólio pessoal, desenvolvido para ser a minha vitrine digital como desenvolvedor front-end. O projeto foi construído do zero com o objetivo de não apenas listar meus trabalhos, mas de ser, em si, uma demonstração das minhas habilidades com tecnologias modernas, design de interação e animações.

A principal característica é a navegação "full-page scroll" no desktop, inspirada em sites de design premiados, que proporciona uma experiência de usuário imersiva e controlada. No mobile, o site se adapta para uma experiência de rolagem tradicional e fluida, com um menu dedicado.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando um stack moderno e focado em performance e experiência do desenvolvedor:

* **React com TypeScript:** Para uma base de componentes robusta, escalável e com tipagem segura.
* **Vite:** Como build tool, garantindo um ambiente de desenvolvimento extremamente rápido.
* **Tailwind CSS:** Para a estilização através de classes utilitárias, permitindo a criação de um design customizado de forma ágil.
* **Framer Motion:** A biblioteca principal para todas as animações, desde as transições de página até as micro-interações do cursor e dos componentes.
* **React Parallax Tilt:** Para o efeito 3D nos cards de projeto.
* **React Icons:** Para a utilização de ícones SVG.
* **Vercel:** Para o deploy e hospedagem contínua a partir do GitHub.

---

## ✨ Features Implementadas

* **Navegação "Full-Page Scroll":** No desktop, cada seção ocupa 100% da tela, com transições verticais suaves controladas pelo scroll do mouse.
* **Layout Totalmente Responsivo:** A experiência no mobile utiliza um scroll tradicional, com um menu "hambúrguer" para a navegação.
* **Efeito "Lanterna":** O cursor padrão é acompanhado de um efeito de "spotlight" que segue o mouse.
* **Animações de Entrada e Transição:** Múltiplas animações com Framer Motion, incluindo o surgimento de componentes e formas geométricas que se animam durante a troca de seções.
* **Efeito 3D (Tilt):** Os cards de projeto possuem um efeito de inclinação 3D ao passar o mouse.
* **Navegação por Pontos (Dot Navigation):** Com tooltips que indicam a seção de destino.

---

## 🧠 Aprendizados e Desafios

Durante este projeto, o maior desafio foi a implementação da navegação de "slides" full-page, controlando o estado de scroll para evitar bugs (como pulos duplos) e garantindo a compatibilidade entre o scroll do desktop e o swipe no mobile. Foi um grande aprendizado sobre a gestão de eventos, a complexidade do `useEffect` e o poder do `useRef` para gerenciar estados que não devem causar re-renderizações.

---

## 🏁 Como Rodar Localmente

```bash
# 1. Clone o repositório
git clone [https://github.com/ghps2704/meu-portfolio.git](https://github.com/ghps2704/meu-portfolio.git)

# 2. Navegue até a pasta do projeto
cd meu-portfolio

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
