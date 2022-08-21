const tmi = require('tmi.js');
const { isNull } = require('tmi.js/lib/utils');

//config
const opts = {
    identity: {
        username: "sunniestech",
        password: "oauth:87zlrw6hi3go3ixjesv84mj3lqy6ft"
    },
    channels: [
        "crazysunnie"
    ]
};

//init
const client = new tmi.client(opts);

//global const
const channelName = "#crazysunnie"

client.on('connected', onConnectedHandler);
// Register our event handlers (defined below)
client.on('message', onMessageHandler);
// client.on('join', onJoinHandler);
client.on('subscription', onSubHandler); //message for subs
client.on('subgift', onGiftSubHandler); //message for gifted subs
client.on('resub', onReSubHandler); //message for resubbing
client.on('submysterygift', onSubMysteryHandler); //message for gifting random subs

// client.on('resub', (channel, username, streak, message, userstate, methods, tags) => {
//     clientSays(channel, 'Thanks for the resub ' + `@${tags.username}`);
// });

// Connect to Twitch:
client.connect();

// spams my socials every 10 mins
setInterval(doSomethingRandom, 300000)

// Called every time a message comes in
// self --> bot channel ie sunniestech
// channel  --> where its going
// tags --> ie user info, userstate
function onMessageHandler(channel, tags, msg, self) {
    if (self) { return; } // Ignore messages from the bot
    // console.log('userstate: '+userstate);

    for (var i in tags) {
        value = tags[i];
        console.log('i: ' + i);
        console.log('tags: ' + value);
    }

    const message = msg.trim();

    //need to fix in order to send message to lower case for commands.
    switch (message) {
        case '!commands':
            clientSays(channel, listOfCommands())
            break;
        case '!insta':
        case '!ig':
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
        case '!tiktok':
            clientSays(channel, 'https://www.tiktok.com/@crazysunnie')
            break;
        case '!favlink':
            clientSays(channel, 'https://twitter.com/timthetatman/status/1349421209683898371?s=20')
            break;
        case '!timeout':
        case '!to':
            break;
        case '!datingsim':
            clientSays(channel, 'COMING SOON!!! Help the homies find the love of their lives.')
            break;
        case '!petty':
            clientSays(channel, 'Follow my gurl KomodoHype KomodoHype --> https://twitter.com/__pettyproud https://www.instagram.com/keicreates/ https://www.twitch.tv/pettyproud')
            break;
        case '!riddle':
            riddleMeThis(channel)
            break;
        case '!audio':
            clientSays(channel, 'I scream sometimes.... you\'ve been warned. crazys88EwwTanjiro crazys88EwwTanjiro')
            break;
        case '!sub':
            clientSays(channel, 'FeelsGoodMan FeelsGoodMan FeelsGoodMan Become a supporter here -> https://www.twitch.tv/subs/crazysunnie')
            break;
        case '!sunniesoldies':
            clientSays(channel, 'KappaCool KappaCool KappaCool https://music.apple.com/us/playlist/sunnies-oldies/pl.u-NpXmzkgFpjr5Pg')
            break;
        default:
            console.log(tags.mod + "<--tags.mod2")
            if (message.match(' hey ') || message.match(/\bhe*y/) || message.match(' hi ') || message.match(/\bhi*/)) {
                clientSays(channel, 'HeyGuys HeyGuys HeyGuys ' + `@${tags.username}`)
            }

            // if (message.match(/[A-Z]+/)) {
            //     clientSays(channel, `@${tags.username}` + ' cmonBruh Y U YELLIN FAM cmonBruh')
            // }

            //!so
            if (message.match('!so')) {
                if ((tags.username !== 'crazysunnie') && !tags.mod) {
                    clientSays(channel, 'You cant use that CoolStoryBob CoolStoryBob CoolStoryBob')
                } else {
                    const personToShoutout = message.split('@')[1];
                    console.log(personToShoutout + "  <--personToShoutout")
                    clientSays(channel, 'aaaayyyyyeeee checkout @' + personToShoutout + ' here --> https://www.twitch.tv/' + personToShoutout)
                }
            }

    }

}


function onReSubHandler(channel, username, streakMonths, message) {
    console.log('username: ' + username);
    console.log('message: ' + message);
    clientSays(channel, username + ' Thanks for comin back n chillin with meeeee.');
    if (message) {
        clientSays(channel, 'They said: ' + message);
    }
}

function onSubMysteryHandler(channel, username, giftSubCount) {
    console.log('username: ' + username);
    let senderCount = ~~userstate["msg-param-sender-count"];
    clientSays(channel, 'yoooooooo ' + username + ' is gifting ' + giftSubCount + 'subs to the channel HotPokket HotPokket');
    clientSays(channel, username + ' has gifted a total of: ' + senderCount + 'subs');
}

function onGiftSubHandler(channel, username) {
    console.log('username: ' + username);
    clientSays(channel, 'thaaaanks' + username + ' for giving ' + `@${tags['msg-param-recipient-display-name']}` + ' a suuub');
}

function onSubHandler(channel, username) {
    clientSays(channel, 'thaaaanks' + username + ' for the looooove Poooound Poooound');
}

// batch process, need to figure out how to stop repeating
function onJoinHandler(channel, username, self) {
    if (self) { return; } // Ignore messages from the bot
    console.log("username:" + username)
    if (!isEmpty(username)) {
        clientSays(channel, 'HeyGuys ' + username)
    }
}

function roll() {
    const sides = 100;
    return Math.floor(Math.random() * sides) + 1;
}

function clientSays(channel, textToRead) {
    client.say(channel, textToRead);
}

function riddleMeThis(channel) {

    clientSays(channel, "What does the fox say?");
    setInterval(giveRiddleResponse, 10000)
}

function giveRiddleResponse() {
    clientSays(channelName, "idk dude")
}

function listOfCommands() {
    return "!discord !twit !insta !tiktok !datingsim !audio !sub !sunniesoldies";
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}

// timer
function doSomethingRandom() {
    //setting a gloabl variable this way, then checking if it is undefined or if is max number in getLines func
    if (isEmpty(global.startOff) || global.startOff === 8) {
        global.startOff = 1;
    }

    clientSays(channelName, getLines(global.startOff).toString())

    //increments the variable used
    setStartOffer()
}

function setStartOffer() {
    global.startOff = global.startOff + 1;
}

function getLines(num) {
    var testOfWords = '';
    switch (num) {
        case 1:
            testOfWords = 'Join the discord SeemsGood SeemsGood https://discord.com/invite/ZPrSUZP';
            break;
        case 2:
            testOfWords = 'Follow me on instagram Kreygasm Kreygasm instagram.com/crazysunnie';
            break;
        case 3:
            testOfWords = 'Follow me on tiktok CoolStoryBob CoolStoryBob https://www.tiktok.com/@crazysunnie';
            break;
        case 4:
            testOfWords = 'Follow me on twitter OhMyDog OhMyDog twitter.com/crazysunnie';
            break;
        case 5:
            const latestTikTok = "https://bit.ly/3sgj3YJ"
            testOfWords = 'CoolCat Catch my latest Tik of the Toks CoolCat --> ' + latestTikTok;
            break;
        case 6:
            testOfWords = 'I scream sometimes.... you\'ve been warned. crazys88EwwTanjiro crazys88EwwTanjiro';
            break;
        case 7:
            testOfWords = 'FeelsGoodMan FeelsGoodMan FeelsGoodMan Become a sugga daddy here -> https://www.twitch.tv/subs/crazysunnie';
            break;
        default:
            break;
    }
    return testOfWords;
}

function isEmpty(value) {
    return (value == null || value.length === 0 || value == undefined || value == '');
}

// i: badge-info
// tags: [object Object]
// i: badges
// tags: [object Object]
// i: client-nonce
// tags: 16474b137a4d30fe1a542a9bc7197ad9
// i: color
// tags: #FF69B4
// i: display-name
// tags: crazysunnie
// i: emotes
// tags: null
// i: flags
// tags: null
// i: id
// tags: 83bfe51f-88fe-4af7-a8ff-47f397ede93e
// i: mod
// tags: false
// i: room-id
// tags: 37722704
// i: subscriber
// tags: true
// i: tmi-sent-ts
// tags: 1618184596470
// i: turbo
// tags: false
// i: user-id
// tags: 37722704
// i: user-type
// tags: null
// i: emotes-raw
// tags: null
// i: badge-info-raw
// tags: subscriber/1
// i: badges-raw
// tags: broadcaster/1,subscriber/0
// i: username
// tags: crazysunnie
// i: message-type
// tags: chat



