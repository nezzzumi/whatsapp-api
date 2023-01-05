# Resumo

Simples API criada com o intuito de enviar mensagens pelo WhatsApp, utilizando [Express.js](https://expressjs.com/pt-br/) e [whatsapp-web.js](https://www.npmjs.com/package/whatsapp-web.js).

Comece [aqui](./src/app.ts).

## Instalação

Para instalar as dependências, no diretório do projeto, digite:

    yarn

Após isso, necessário criar o arquivo .env no diretório do projeto, com a seguinte estrutura:

    JWT_SECRET_KEY=SUA_CHAVE
    DATABASE_URL=URL_PARA_O_BANCO

> Exemplos para o DATABASE_URL podem ser encontrados [aqui](https://pris.ly/d/connection-strings).

Para criar uma chave aleatória, eu costumo utilizar o seguinte comando:

    head -c32 /dev/random | base64

## Execução

Para iniciar a API, no diretório do projeto, digite:

    ts-node .

Após isso, irá aparecer um QRCODE no terminal. Basta lê-lo, e a API estará pronta para enviar mensagens.

**obs: a sessão ficará salva.**

## Exemplos de uso

### Autenticando

### Request

`POST /api/auth/login`

```bash
curl 'localhost:3000/api/auth/login' -H 'content-type: application/json' -d '{"username": "user", "password": "mypassword"}'
```

### Response

`200 OK`

```json
{
  "error": false,
  "msg": "Login realizado com sucesso.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTY0ODk3MDM5OCwiZXhwIjoxNjUxNTYyMzk4fQ.1u5PI7usj8gLLq2UYH7JedaGnC-4aZEYMsOXuGb-jcU",
  "expiresIn": 1800
}
```

### Erros

No caso de faltar algum parâmetro:

`400 BAD REQUEST`

```json
{
  "error": true,
  "msg": "Parâmetros inválidos."
}
```

No caso de credenciais inválidas:

`200 OK`

```json
{
  "error": true,
  "msg": "Credenciais inválidas."
}
```

### Enviando Mensagem

### Request

`POST /api/bot/send`

Apenas mensagem de texto:

```bash
curl 'localhost:3000/api/bot/send' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiI...' -H 'content-type: application/json' -d '{"to": "5511988766767", "content": "oi"}'
```

Para enviar uma imagem (JPG/PNG) você precisa enviar a imagem em base64 com o parâmetro `image`:

```bash
curl 'localhost:3000/api/bot/send' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiI...' -H 'content-type: application/json' -d '{"to": "5511988766767", "content": "oi", "image": "/9j/4AAQSkZJRgABAQIAJQAlAAD/2wBDAAMCAgICAgMC..."}'
```

### Response

`200 OK`

```json
{
  "error": false,
  "msg": "Mensagem enviada com sucesso."
}
```

### Erros

No caso de faltar algum parâmetro:

`400 BAD REQUEST`

```json
{
  "error": true,
  "msg": "Parâmetros inválidos."
}
```

No caso do venom ainda não ter sido carregado, ou caso não tenha nenhuma sessão aberta:

`503 SERVICE UNAVAILABLE`

```json
{
  "error": true,
  "msg": "O serviço ainda não está pronto para uso."
}
```

No caso do número ser inválido (tamanho diferente de 13, ou não iniciar com 55):

`422 UNPROCESSABLE ENTITY`

```json
{
  "error": true,
  "msg": "Número inválido."
}
```

No caso de uma imagem inválida:

`422 UNPROCESSABLE ENTITY`

```json
{
  "error": true,
  "msg": "Imagem inválida."
}
```

No caso de um erro interno.

`500 INTERNAL SERVER ERROR`

```json
{
  "error": true,
  "msg": "Não foi possível enviar a mensagem.",
  "detail": "Número não registrado."
}
```
