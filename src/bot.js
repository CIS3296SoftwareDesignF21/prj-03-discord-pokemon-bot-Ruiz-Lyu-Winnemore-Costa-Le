//Clears console every restart
console.clear();

require("dotenv").config();
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { Client, Intents, Collection} = require("discord.js");
const { exit } = require("process");

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]    
});

//Access the commands folder aka the command handler
const commandFiles = fs.readdirSync("./src/commands").filter(file=>file.endsWith(".js"));
const commands = [];
client.commands = new Collection();
for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}

client.on("ready", async () => {
    console.log(`${client.user.tag} logged on.`);
    client.user.setPresence({activities: [{name:"Pokemon FireRed Text Adventure", type: "PLAYING"}]})
    const CLIENT_ID = client.user.id;
    const rest = new REST({
        version: "9"
    }).setToken(process.env.TOKEN);
    (async () =>{
        try{
            if(process.env.ENV === "production"){
                await rest.put(Routes.applicationCommand(CLIENT_ID), {
                    body: commands
                });
                console.log("Successfully Registered commands globally.");
            } else {
                await rest.put(Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID), {
                    body: commands
                });
                console.log("Successfully Registered commands locally.");
            }
        } catch (err){
            if(err) console.error(err);
        }
    })();
});

client.on('interactionCreate', async (interaction) => {
    if(!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try{
        await command.execute(interaction);
    } catch(err){
        if (err) console.error(err);
        await interaction.reply({
            content: "an error occured while executing that command.",
            ephemeral: true
        });
    }
});

client.on('messageCreate', (message) =>{
    //If written by the bot itself ignore it
    if(message.author.bot) {return;}
    console.log(`[${message.author.tag} @ ${message.createdAt}]: ${message.content}`);
    if(message.content ==='test')
        message.reply(`Roger Dodger ${message.author.username}, I can read you loud and clear`);
});

//GOES ONLINE
client.login(process.env.TOKEN)