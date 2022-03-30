# Resumo

Simples API criada com o intuito de enviar mensagens pelo WhatsApp, utilizando [Express.js](https://expressjs.com/pt-br/) e [Venom](https://github.com/orkestral/venom).

## Instalação

Para instalar as dependências, no diretório do projeto, digite:

    npm i

Após isso, necessário criar o arquivo .env no diretório do projeto, com a seguinte estrutura:

    TOKEN=813e89727b7064cbd4f267d4a73df6fa

Para criar um token aleatório, eu costumo utilizar o seguinte comando:

    head -c128 /dev/random | md5sum

**Atenção: essa é uma forma de "autenticação" provisória. Uma autenticação com token JWT deve ser implementado em breve.**

## Execução

Para iniciar a API, no diretório do projeto, digite:

    node .

Após isso, irá aparecer um QRCODE no terminal. Basta lê-lo, que a API estará pronta para enviar mensagens.

**obs: a sessão ficará salva.**

## Exemplos de uso

### Enviando mensagem

### Request

`POST /api/send`

    curl localhost:3000/api/send -H 'x-key: secret' -H 'content-type: application/json' -d '{"to": "5511988766767", "content": "oi"}'

### Response

`200 OK`

```json
{
  "error": false,
  "msg": "Mensagem enviada com sucesso.",
  "result": {
    "me": {},
    "to": {
      "fromMe": true,
      "remote": {
        "server": "c.us",
        "user": "551188888888",
        "_serialized": "551188888888@c.us"
      },
      "id": "PVMQGEN0",
      "self": "out",
      "_serialized": "true_551188888888@c.us_PVMQGEN0_out"
    },
    "erro": false,
    "text": "oi",
    "status": "OK",
    "result": null,
    "type": "sendText"
  }
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

No caso do venom ainda não ter sido carregado, ou do QR CODE não ter sido lido ainda:

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
  "msg": "Parâmetros inválidos."
}
```

No caso do venom retornar um erro:

`200 OK`

```json
{
  "error": true,
  "msg": "Não foi possível enviar a mensagem.",
  "result": "incorrect parameters! Use as an example: 000000000000@c.us",
}
```
