const tmi = require('tmi.js');
const { isNull } = require('tmi.js/lib/utils');

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
client.on('join', onJoinHandler);

// Connect to Twitch:
client.connect();

//consts
const channelName = "#crazysunnie"


// Called every time a message comes in
// self --> bot channel ie sunniestech
// channel  --> where its going
// tags --> 
function onMessageHandler(channel, tags, msg, self) {
    if (self) { return; } // Ignore messages from the bot

    const commandName = msg.trim();

    const heyGuys = msg.includes('hey');

    switch (commandName) {
        case '!commands':
            clientSays(channel, listOfCommands())
            break;
        case '!insta':
        case '!instagram':
            clientSays(channel, 'instagram.com/crazysunnie')
            break;
        case '!twit':
        case '!twitter':
            clientSays(channel, 'twitter.com/crazysunnie')
            break;
        case '!discord':
            clientSays(channel, 'https://discord.com/invite/ZPrSUZP')
            break;
        case '!so':
            randomThings(channel)
            break;
        case '!tiktok':
            clientSays(channel, 'https://www.tiktok.com/@crazysunnie')
            break;
        case '!favlink':
            clientSays(channel, 'https://twitter.com/timthetatman/status/1349421209683898371?s=20')
            break;
        default:
            if (commandName.startsWith('!')) {
                clientSays(channel, 'whaaat is thaaat NotLikeThis')
            } else if (heyGuys) {
                clientSays(channel, 'HeyGuys HeyGuys HeyGuys ' + `@${tags.username}`)
            } 
    }

}


function onJoinHandler(channel, tags) {
    console.log("username:" + tags.username)
    if (tags.username == null) {
        clientSays(channel, 'OSFrog who are you')
    } else {
        clientSays(channel, 'HeyGuys ' + `@${tags.username}`)
    }
}

function randomThings(channel) {
    const randomNumber = roll();

    if (randomNumber === 1) {
        clientSays(channel, 'https://www.twitch.tv/geordiemarc22');
    } else {
        clientSays(channel, 'https://www.twitch.tv/veonix_hd');
    }
}

function roll() {
    const sides = 100;
    return Math.floor(Math.random() * sides) + 1;
}

function clientSays(channel, textToRead) {
    client.say(channel, textToRead);
}

function listOfCommands() {
    return "!discord !twit !insta !tiktok";
}


// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}

// timer
function doSomethingRandom() {
    const latestTikTok = "https://bit.ly/3ab52nv"
    const randomNumber = roll();
    const mod = randomNumber % 2;

    if (mod == 0) {
        clientSays(channelName, "CoolCat Catch my latest Tik of the Toks CoolCat --> " + latestTikTok)
    } else {
        clientSays(channelName, "BibleThump BibleThump BibleThump BibleThump")
    }
}

setInterval(doSomethingRandom, 900000)
