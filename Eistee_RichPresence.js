var Config = require('./config.json');
const DiscordRPC = require('discord-rpc');
const clientId = Config.ApplicationID;


DiscordRPC.register(clientId);

const rpc = new DiscordRPC.Client({ transport: 'ipc' });

rpc.on('ready', () => {
  console.log('Your Custom rich presence is now active.');
  setInterval(setRichPresence, 120000);
  setRichPresence();
});

async function setRichPresence() {
  await rpc.setActivity({
    details: Config.Details, //Change to your Details
    state: Config.State, //Change to your State
    startTimestamp: new Date(),
    largeImageKey: Config.LargeImageKey, //Change to your Imagekey
    largeImageText: Config.LargeImageText, //Change to your Image Text
    smallImageKey: Config.SmallImageKey, //Change to your Imagekey
    smallImageText: Config.SmallImageText, //Change to your Image Text
    type: Config.Type,
    buttons: [
      { label: Config.ButtonLabel, url: Config.ButtonUrl },
    ],
  });
}

rpc.login({ clientId }).catch(console.error);
