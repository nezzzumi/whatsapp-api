const venom = require('venom-bot');


(async () => {
    const client = await venom.create({
        session: "teste",
        multidevice: false,
    });

    client.sendText('NUMERO@c.us', 'teste').catch((r) => console.error(r));
})();