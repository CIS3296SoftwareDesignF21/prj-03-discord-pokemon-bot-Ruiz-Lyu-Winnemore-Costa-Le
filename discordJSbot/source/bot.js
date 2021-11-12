require('dotenv').config();
const { channel } = require('diagnostics_channel');
//'npm run dev' to start program

//npm INSTALLS TO RUN first
//https://nodejs.org/en/download/
//npm install discord.js
//npm install dotenv
//npm install nodemon
//npm install node-fetch
//npm install @discordjs/builders @discordjs/rest discord-api-types

//POSTS THE BOT'S TOKEN
//console.log(process.env.BOT_TOKEN);

//POSTS THE SERVER
//Object structuring
//Client object
const { Client, Intents } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
//TAKE IN JSON
bot.locations = require("./locations.json");
//READ MODULE
function readlocations(num) {
    const fs =  require('fs');
    fs.readFile('./source/locations.json', 'utf-8', (err, jsonString) => {
        if(err){
            console.log(err);
        } else {
            try{
                const data = JSON.parse(jsonString);
                //THIS TOOK FOREVER TO FIGURE OUT
                console.log(data.towns[0].townName);
                return data.town[num].townName;
            } catch(err){
                console.log('Error parsing JSON', err);
                return err;
            }
        }
    });
}
//Bot Logon & notice event
bot.on('ready', () =>{ //callback funct
    console.log(`${bot.user.tag} logged on.`);
    
    //GUILD TESTING SLASH COMMANDS ON 3296 SERVER
    const guildId = '905700391050686475';
    const guild = bot.guilds.cache.get(guildId);
    let commands;
    if(guild){
        commands = guild.commands;
    } else {
        commands = bot.application?.commands;
    }
    commands?.create({
        name: 'test',
        description: 'This is a hello world type test program!'
    });
/*     commands?.create({
        options:[
            {
            name: 'locations',
            description: 'This posts a map of the region!',
            required: false,
            type: 4
            }
        ]
    }); */
})
bot.login(process.env.BOT_TOKEN);
 
// SLASH COMMANDS HANDLING
bot.on('interactionCreate', async (interaction) => {
    if(!interaction.isCommand()){
        return;
    }
    const { commandName, options} = interaction;
    if (commandName === 'test'){
        interaction.reply({
            content: 'Hello Discord!!',
            ephemeral: true,
        })
    }
    if (commandName === 'locations'){
        interaction.reply({
            content: 'Hello Discord!!',
            ephemeral: true,
        })
    }
});

//MESSAGE HANDLING
bot.on('messageCreate', (message) =>{
    if(message.author.bot) return;
    console.log(`[${message.author.tag} @ ${message.createdAt}]: ${message.content}`);
    if(message.content ==='test'){
        message.channel.send('your test works!');
    }
})