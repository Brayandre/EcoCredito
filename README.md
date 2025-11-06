# EcoCred - Sistema de Créditos de Reciclagem Corporativa
Sistema inovador que promove a reciclagem em grandes empresas através de um programa de créditos e benefícios fiscais.

## 1 - Sobre o Projeto

O EcoCred é uma plataforma que incentiva a reciclagem corporativa permitindo que empresas registrem seus descartes de materiais recicláveis e recebam créditos em troca. Esses créditos podem ser convertidos em benefícios fiscais através de Cartas de Não Aproveitamento de Imposto.

### 2 - Autenticação/Funcionalidades
- **Cadastro de usuários** - Sistema completo de registro
- **Login seguro** - Autenticação via Firebase
- **Gerenciamento de perfil** - Edição de dados do usuário

### 3 - Gestão de Reciclagem
- **Dashboard de materiais** - Cards individuais para cada tipo de material
- **Registro de descartes** - Inserção de toneladas descartadas corretamente
- **ID de reciclagem** - Identificação única para cada operação
- **Histórico de materiais** - Visualização no perfil do usuário

### 4 - Sistema de Créditos
- **Acúmulo de eco créditos** - Conversão baseada no volume reciclado
- **Extrato detalhado** - Histórico de recebimento de créditos
- **Benefícios fiscais** - Resgate de créditos para isenção de impostos
  - **0.5% de isenção** a cada X valor de crédito resgatado

### 5 - Páginas Principais
- **Home** - Informações sobre o projeto e sua importância
- **Login/Cadastro** - Autenticação de usuários
- **Registro** - Controle de materiais recicláveis
- **EcoCréditos** - Gestão e resgate de benefícios fiscais
- **Extrato** - Histórico financeiro detalhado
- **Perfil** - Dados pessoais e histórico de reciclagem

## 6 - Tecnologias Utilizadas

- **Frontend:** React.js
- **Backend:** Firebase (Firestore, Auth)
- **Desenvolvimento:** Visual Studio Code
- **Estilização:** CSS3 / Styled Components

## 7 - Pré-requisitos

- Node.js 16+
- npm ou yarn
- Conta no Firebase

## 8 - Instalação e Configuração

- É necessário ter NPM, NPX e Node
- npx expo start -c

## 9 - Comando para Compilar

- npx expo start --tunnel --clear
