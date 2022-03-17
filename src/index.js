const venom = require('venom-bot');


(async () => {
    const client = await venom.create({
        session: "teste",
        multidevice: false,
    });

    client.sendText('5533987288736@c.us', 'teste').then(console.log).catch(console.error);
})();