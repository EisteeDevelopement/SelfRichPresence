var Config = require('./config.json');
const DiscordRPC = require('discord-rpc');
const clientId = Config.ApplicationID;


DiscordRPC.register(clientId);

const rpc = new DiscordRPC.Client({ transport: 'ipc' });

rpc.on('ready', () => {
  console.log('Your Custom Rich Presence is now Active.');
  setInterval(setRichPresence, 120000);
  setRichPresence();
});

async function setRichPresence() {
  await rpc.setActivity({
    details: Config.Details, 
    state: Config.State, 
    startTimestamp: new Date(),
    largeImageKey: Config.LargeImageKey, 
    largeImageText: Config.LargeImageText, 
    smallImageKey: Config.SmallImageKey, 
    smallImageText: Config.SmallImageText, 
    type: Config.Type,
    buttons: [
      { label: Config.ButtonLabel, url: Config.ButtonUrl },
    ],
  });
}

rpc.login({ clientId }).catch(console.error);
