
const { Client, Intents } = require('discord.js');


const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const token = process.env['token']

client.on('ready', () => {

  console.log(`Logged in as ${client.user.tag}!`);

});


client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'wheres1') {
    await interaction.reply('https://archives.bulbagarden.net/media/upload/6/6a/Kanto_Pallet_Town_Map.png');
  } 
  else if (interaction.commandName === 'wheres2') {
    await interaction.reply('https://archives.bulbagarden.net/media/upload/c/c4/Kanto_Viridian_City_Map.png');
  }
   else if (interaction.commandName === 'wheres3') {
    await interaction.reply('https://archives.bulbagarden.net/media/upload/8/8e/Kanto_Pewter_City_Map.png');
  }
  else if (interaction.commandName === 'wheres4') {
    await interaction.reply('https://archives.bulbagarden.net/media/upload/1/1b/Kanto_Cerulean_City_Map.png');
  }
  else if (interaction.commandName === 'wheres5') {
    await interaction.reply('https://archives.bulbagarden.net/media/upload/c/c4/Kanto_Viridian_City_Map.png');
  }
  else if (interaction.commandName === 'wheres6') {
    await interaction.reply('https://archives.bulbagarden.net/media/upload/1/14/Kanto_Lavender_Town_Map.png');
  }
  else if (interaction.commandName === 'wheres7') {
    await interaction.reply('https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
  }
  else if (interaction.commandName === 'wheres8') {
    await interaction.reply('https://archives.bulbagarden.net/media/upload/6/6a/Kanto_Saffron_City_Map.png');
  }
  else if (interaction.commandName === 'wheres9') {
    await interaction.reply('https://archives.bulbagarden.net/media/upload/0/01/Kanto_Fuchsia_City_Map.png');
  }
  else if (interaction.commandName === 'wheres10') {
    await interaction.reply('https://archives.bulbagarden.net/media/upload/5/58/Kanto_Cinnabar_Island_Map.png');
  }
  else if (interaction.commandName === 'wheres11') {
    await interaction.reply('https://archives.bulbagarden.net/media/upload/0/09/Kanto_Indigo_Plateau_Map.png');
  }

});

client.login(token);









