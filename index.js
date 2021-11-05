const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

//PRIVATE VARIABLE CALLS
const token = process.env['token']
const CLIENT_ID = process.env['client_id']
const GUILD_ID = process.env['guild_id']

//COMMANDS FOR THE BOT
const commands = [{
  name: 'ping',
  description: 'This is a hello world type test program!'
}]; 

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();