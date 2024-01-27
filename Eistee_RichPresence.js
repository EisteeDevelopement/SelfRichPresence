var Config = require('./config.json');
const DiscordRPC = require('discord-rpc');
const clientId = Config.ApplicationID;

DiscordRPC.register(clientId);

const rpc = new DiscordRPC.Client({ transport: 'ipc' });

rpc.on('ready', () => {
  console.log('Your Custom Rich Presence is now active.');
  setInterval(setRichPresence, 120000);
  setRichPresence();
});

async function setRichPresence() {
  let activityOptions = {
    details: Config.Details,
    state: Config.State,
    startTimestamp: new Date(),
    largeImageKey: Config.LargeImageKey,
    largeImageText: Config.LargeImageText,
    smallImageKey: Config.SmallImageKey,
    smallImageText: Config.SmallImageText,
    type: Config.Type,
    buttons: [],
  };

  if (Config.Button1 === true) {
    activityOptions.buttons.push({ label: Config.Button1Label, url: Config.Button1Url });
  }

  if (Config.Button2 === true) {
    activityOptions.buttons.push({ label: Config.Button2Label, url: Config.Button2Url });
  }

  await rpc.setActivity(activityOptions);
}

rpc.login({ clientId }).catch(console.error);
