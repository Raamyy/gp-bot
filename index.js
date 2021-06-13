const { Webhook } = require('discord-webhook-node');
const schedule = require('node-schedule');
require('dotenv').config()

const webhook = process.env.WEBHOOK_URL;

const messages = process.env.Messages.split(',');
const members = process.env.Members
    .split(',')
    .map(m => {
        let data = m.split(':');
        return { name: data[0], id: data[1] }
    });

const job = schedule.scheduleJob('0 * * * *', function () {
    sendMessages();
});

console.log("Started.")
console.log(messages)
console.log(members)

function sendMessage(msg, webhookURL) {
    const hook = new Webhook(webhookURL);
    hook.send(msg)
}

function sendMemberMessage(member, message) {
    sendMessage(getMention(member) + " " + message, webhook);
    console.log(`Sent to ${member.name} message: "${message}"`)
}

function getMention(member) {
    return "<@" + member.id + ">"
}

let i = 0;
function sendMessages() {
    if (i == messages.length) i = 0;
    let message = messages[i];
    members.forEach(member => {
        sendMemberMessage(member, message);
    });
    i++
}

if(process.env.INSTA_TRY == "true") sendMessages();
