#  Json Bender
> A ferramenta definitiva para manipular JSON e Strings no Chrome.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Manifest](https://img.shields.io/badge/manifest-V3-green.svg)
![License](https://img.shields.io/badge/license-MIT-lightgrey.svg)

## 📖 Sobre o Projeto

O **JSON Bender** é uma extensão para Google Chrome desenvolvida para eliminar a necessidade de abrir abas externas (como sites de "JSON Formatter") para tarefas simples de tratamento de dados.

Construída sobre a arquitetura **Manifest V3**, ela oferece alta performance e segurança, funcionando tanto via **Popup** quanto via **Menu de Contexto** (botão direito).

### ✨ Funcionalidades Principais

* **JSON Beautifier:** Formata JSONs minificados ou inválidos com indentação correta (2 espaços) e validação de sintaxe.
* **Stringfy (Escape):** Converte JSON ou texto em uma string escapada segura (ex: para inserir em payloads de API ou código).
* **Unstringfy (Parse):** Reverte strings escapadas para seu formato original limpo.
* **Smart Context Menu:** Selecione texto em qualquer página e converta-o instantaneamente via clique direito.
* **In-Place Replacement:** Se o texto selecionado estiver dentro de um `input` ou `textarea`, a extensão substitui o texto no próprio local, mantendo o foco e a posição do cursor.

---

## 🚀 Instalação (Modo Desenvolvedor)

Como esta extensão ainda não está na Chrome Web Store, você deve instalá-la manualmente:

1.  Clone este repositório ou baixe o código fonte.
2.  Abra o navegador Chrome e digite `chrome://extensions/` na barra de endereços.
3.  No canto superior direito, ative a chave **"Modo do desenvolvedor"**.
4.  Clique no botão **"Carregar sem compactação"** (Load unpacked).
5.  Selecione a pasta raiz do projeto (`json-bender`).

A extensão agora deve aparecer na sua barra de ferramentas! 🎉

---

## 📂 Estrutura do Projeto

A arquitetura segue os padrões modernos do Manifest V3, separando responsabilidades entre Service Workers e Scripts de Conteúdo.

```text
json-bender/
├── manifest.json          # Configuração e permissões (Manifest V3)
├── background.js          # Service Worker (Gerencia eventos do Menu de Contexto)
├── content.js             # Script de Conteúdo (Manipula o DOM e substituição de texto)
├── icons/                 # Ícones da aplicação (16, 48, 128px)
└── popup/
    ├── popup.html         # Interface gráfica do usuário
    ├── popup.css          # Estilização (Dark Theme)
    └── popup.js           # Lógica da UI e processamento de botões