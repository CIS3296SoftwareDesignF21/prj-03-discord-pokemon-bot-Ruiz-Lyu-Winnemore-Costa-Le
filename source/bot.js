require('dotenv').config();
//'npm run dev' to start program

//npm INSTALLS TO RUN first
//npm install node-fetch
//npm install discord.js
//npm install dotenv
//npm install nodemon

//POSTS THE BOT'S TOKEN
//console.log('OTExMDYwMDAwODg4MjEzNTQ0.YZb4vg.fIL1WG-rQZZc_PvakPWvnatPAxM');

//POSTS THE SERVER
//Object structuring
//Client object
const { Client, Intents, ThreadManager } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
//TAKE IN JSON
bot.locations = require("./locations.json");
//READ MODULE
const fs =  require('fs');
const { stringify } = require('querystring');



fs.readFile('./source/locations.json', 'utf-8', (err, jsonString) => {
    if(err){
        console.log("FILE READ FAILURE:", err);
        return
    } else {
        try{
            const data = JSON.parse(jsonString);
            //THIS TOOK FOREVER TO FIGURE OUT
        } catch(err){
            console.log('Error parsing JSON', err);
        }
    }
});

function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err)
        }
        try {
            const object = JSON.parse(fileData)
            return cb && cb(null, object)
        } catch(err) {
            return cb && cb(err)
        }
    })
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
    commands?.create({
        name: 'locations',
        description: 'This posts all the towns of the region!'
    });

})
bot.login(('OTExMDYwMDAwODg4MjEzNTQ0.YZb4vg.fIL1WG-rQZZc_PvakPWvnatPAxM'));
 
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
        let locationsout = "";
        jsonReader('./source/locations.json', (err, data) => {
            if (err) {
                console.log(err)
                return
            }
            for (let i = 0; i < data.towns.length ; i++) {
                let arr = [];
                arr = data.towns[i].townName;
                locationsout += `Town ${i+1} : ` + String(arr) + "\n";
            }
            interaction.reply({
                content: `\`\`\`TOWNS: \n${locationsout}\`\`\``,
            })
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