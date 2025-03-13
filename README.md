# Pizzaria Admin App - Cordova

Este projeto Cordova é uma aplicação de administração para uma pizzaria, permitindo o cadastro, listagem, atualização e exclusão de pizzas. A aplicação se comunica com um backend (provido em `https://pedidos-pizzaria.glitch.me`) para persistir os dados.

## Visão Geral

A aplicação possui duas telas principais:

1.  **Lista de Pizzas:** Exibe as pizzas cadastradas, permitindo selecionar uma pizza para edição ou adicionar uma nova.
2.  **Cadastro/Edição de Pizza:** Permite cadastrar uma nova pizza (com nome, preço e foto) ou editar uma pizza existente. Inclui funcionalidades para tirar fotos usando a câmera do dispositivo e interagir com o backend para salvar/excluir dados.

## Estrutura do Projeto

O projeto é composto pelos seguintes arquivos principais:

-   `index.html`:  Contém a estrutura HTML da aplicação, incluindo as duas telas (lista e cadastro/edição).
-   `index.js`:  Contém a lógica JavaScript da aplicação, incluindo:
    -   Inicialização do aplicativo.
    -   Gerenciamento de eventos (cliques de botões, etc.).
    -   Alternância entre as telas.
    -   Comunicação com a API (GET, POST, PUT, DELETE).
    -   Manipulação da câmera.
    -   Renderização da lista de pizzas.
-   `index.css`:  Contém os estilos CSS para a interface da aplicação.
-    `package.json`: Arquivo de configuração do projeto, que contém as dependecias.

## Funcionalidades

-   **Listagem de Pizzas:**
    -   Exibe uma lista das pizzas cadastradas no backend.
    -   Permite selecionar uma pizza para visualizar/editar os detalhes.
    -   Botão para adicionar uma nova pizza.

-   **Cadastro/Edição de Pizza:**
    -   Campos para nome da pizza, preço e foto.
    -   Botão "Foto" para tirar uma foto da pizza usando a câmera do dispositivo.
    -   Botão "Salvar" para cadastrar (POST) ou atualizar (PUT) uma pizza.
    -   Botão "Excluir" para remover (DELETE) uma pizza.
    -   Botão "Cancelar" para retornar à lista de pizzas sem salvar as alterações.

-   **Comunicação com a API:**
    -   `GET /admin/pizzas/{PIZZARIA_ID}`:  Obtém a lista de pizzas.
    -   `POST /admin/pizza/`:  Cadastra uma nova pizza.
    -   `PUT /admin/pizza/`:  Atualiza uma pizza existente.
    -   `DELETE /admin/pizza/{PIZZARIA_ID}/{NOME_PIZZA}`:  Exclui uma pizza.

-   **Integração com a Câmera:**
    -   Utiliza o plugin `cordova-plugin-camera` para acessar a câmera do dispositivo.
    -   As fotos são convertidas para base64 e armazenadas como parte dos dados da pizza.

## Dependências

O projeto utiliza os seguintes plugins Cordova:

-   `cordova-plugin-advanced-http`:  Para realizar requisições HTTP (GET, POST, PUT, DELETE) de forma avançada (incluindo serialização JSON).
-   `cordova-plugin-camera`: Para acessar a câmera do dispositivo e tirar fotos.
-   `cordova-plugin-file`: Necessário pelo `cordova-plugin-camera` (dependência implícita).

Essas dependências estão listadas no arquivo `package.json`.  O Cordova gerencia a instalação dos plugins automaticamente.

## Configuração

-   **`PIZZARIA_ID`:**  Você deve definir um identificador único para sua pizzaria na variável `pizzariaId` dentro do arquivo `index.js`.  Este ID será usado em todas as requisições à API.  *Não use espaços ou caracteres especiais no ID.*  Exemplo: `Pizzaria_do_Tonhao`.
- **Content Security Policy:** A política de segurança (CSP) está configurada no `index.html` para permitir o acesso aos recursos necessários (imagens, estilos, etc.).

## Como Executar

1.  **Instalar o Cordova:**
    ```bash
    npm install -g cordova
    ```

2.  **Criar o Projeto (se ainda não tiver feito):**
    ```bash
    cordova create pizzaria-admin pizzaria.admin PizzariaAdminApp
    ```

3.  **Navegar para o diretório do projeto:**
    ```bash
    cd pizzaria-admin
    ```

4.  **Adicionar a plataforma Android (ou iOS, se desejar):**
    ```bash
    cordova platform add android
    # OU
    cordova platform add ios
    ```

5.  **Adicionar os Plugins (se já não estiverem no `package.json`):**

    Se você copiou o `package.json` fornecido, os plugins já estão listados, e o passo 6 os instalará. Se você criou o projeto do zero, adicione os plugins manualmente:

    ```bash
    cordova plugin add cordova-plugin-advanced-http
    cordova plugin add cordova-plugin-camera
    ```
    O `cordova-plugin-file` é uma dependência do `cordova-plugin-camera` e deve ser instalado automaticamente.

6.  **Instalar as dependências (plugins):**
   ```
    cordova prepare
   ```

7. **Substituir os arquivos:** Copie os arquivos `index.html`, `index.js` e `index.css` fornecidos para as pastas correspondentes dentro do seu projeto Cordova ( `www/`, `www/js/` e `www/css/`, respectivamente).  Substitua os arquivos existentes.

8.  **Executar no Emulador ou Dispositivo:**
    ```bash
    cordova emulate android  # Executa no emulador Android
    # OU
    cordova run android     # Executa em um dispositivo Android conectado
    # OU (para iOS)
    cordova emulate ios
    cordova run ios
    ```

    Certifique-se de ter um emulador Android/iOS configurado ou um dispositivo conectado e configurado para desenvolvimento.

## Observações Importantes

-   **Erros de CORS:** O backend (`https://pedidos-pizzaria.glitch.me`) já está configurado para permitir requisições de qualquer origem (CORS), então você não deve ter problemas de CORS ao executar a aplicação.
-   **Teste em Dispositivo Real:**  A funcionalidade da câmera *só funcionará em um dispositivo real* ou em um emulador que tenha uma câmera virtual configurada corretamente.  No navegador (usando `cordova serve`), a câmera não funcionará.
-   **Variável `listaPizzasCadastradas`:** O código usa uma variável global para armazenar a lista. Em um aplicativo maior, você pode usar um framework como Vue.js, React ou Angular para gerenciar o estado de forma mais eficiente.
- **Tratamento de Erros:** O código fornecido tem tratamento de erros básico (exibindo `alert`s). Em uma aplicação de produção, você deve implementar um tratamento de erros mais robusto (exibindo mensagens de erro mais amigáveis, registrando erros, etc.).
- **Segurança**: Como se trata de um app administrativo, em um ambiente de produção, seria crucial adicionar autenticação e autorização para proteger os dados da pizzaria.
