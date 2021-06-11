const { Webhook } = require('discord-webhook-node');
const schedule = require('node-schedule');

const webhook = "https://discord.com/api/webhooks/852680041062334525/2JZe8tBz6CLY9w0SMjfbwmqVElEcIxEZ3sRGNRz2Q2JP-q3xaqpYl9WkP22JE-HOyPgL"


function sendMessage(msg, webhookURL) {
    const hook = new Webhook(webhookURL);
    hook.send(msg)
}

function getMention(member) {
    return "<@" + member.id + ">"
}

let messages = [
    "اعملوا documentation مشروع التخرج عشان مش عايز اسمع صياح.",
]
let members = [
    {
        name: "zula",
        id: "234730025994158080"
    },
    {
        name: "hady",
        id: "385042714183467008"
    },
    {
        name: "molto",
        id: "380431504544628736"
    },
]

let i = 0;
function see7(){
    if (i == messages.length) i = 0;
    let message = messages[i];
    members.forEach(member => {
        sendMessage(getMention(member) + " " + message, webhook)
    });
    i++
}

see7();

const job = schedule.scheduleJob('0 * * * *', function(){
    see7();
  });