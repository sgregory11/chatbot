const tmi = require('tmi.js');

//config
const opts = {
    identity: {
        username: "sunniestech",
        password: "oauth:2ykvyycd5z41u37oz13th70jr4ce8i"
    },
    channels: [
        "crazysunnie"
    ]
};

//init
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();


// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot

    const commandName = msg.trim();

    const heyGuys = msg.includes('hey');

    switch (commandName) {
        case '!commands':
            clientSays(target, listOfCommands())
            break;
        case '!insta':
        case '!instagram':
            clientSays(target, 'instagram.com/crazysunnie')
            break;
        case '!twit':
        case '!twitter':
            clientSays(target, 'twitter.com/crazysunnie')
            break;
        case '!discord':
            clientSays(target, 'https://discord.com/invite/ZPrSUZP')
            break;
        case '!random':
            clientSays( randomThings(target))
            break;
        case '!tiktok' :
            clientSays(target, 'https://www.tiktok.com/@crazysunnie')
            break;
        default:
            if (commandName.startsWith('!')) {
                clientSays(target, 'whaaat is thaaat NotLikeThis')
            } else if (heyGuys) {
                clientSays(target, 'HeyGuys HeyGuys HeyGuys')
            }
    }

}

function randomThings(target){

    function rollDice () {
        const sides = 2;
        return Math.floor(Math.random() * sides) + 1;
      }

      const randomNumber = rollDice ();

      if (randomNumber === 1){
        client.say(target, 'https://www.twitch.tv/geordiemarc22');
      } else {
        client.say(target, 'https://www.twitch.tv/veonix_hd');
      }

}

function clientSays(target, textToRead) {
    client.say(target, textToRead);
}

function listOfCommands() {
    return "!discord !twit !insta";
}


// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}