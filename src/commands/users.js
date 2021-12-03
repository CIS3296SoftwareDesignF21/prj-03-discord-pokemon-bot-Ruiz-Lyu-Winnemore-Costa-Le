const { SlashCommandBuilder} = require("@discordjs/builders");
const fs = require("fs");
const Discord = require("discord.js")

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

module.exports = {
    data: new SlashCommandBuilder()
        .setName("user")
        .setDescription("This posts all of the registered users")
        .addIntegerOption((option) =>
            option
                .setName("trainer")
                .setDescription("Selects a user to continue")
                .setRequired(false)
        ),
    async execute(interaction){
        let userout = "";
        if(interaction.options.getInteger('trainer') != null && interaction.options.getInteger('trainer') < 5 && interaction.options.getInteger('trainer') > 0){
            jsonReader('src/data/usernames.json', (err, user) => {
                if (err) {
                    console.log(err)
                    return
                }
                let selected = interaction.options.getInteger('trainer') - 1;
                console.log(`Logged in as ${selected+1} : ${user.usernames[selected].name}`);
                const output = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setAuthor('Author: Chris')
                    .setTitle('This is a trainer card for the selected user')
                    .setDescription(`Trainer's name: ${user.usernames[selected].name}`)
                    .addFields(
                        {name:'Currant Balance: $', value: `${user.usernames[selected].money}`, inline: true},
                        {name:'Badges: ', value: `${user.usernames[selected].badges}`, inline: true},
                        {name:'Trainer Id', value: `No.1000${user.usernames[selected].trainerId}`, inline: true}
                    )
                    .setImage(`${user.usernames[selected].starterPokemon}`)
                    .setFooter('Selected Starter Pokemon!');
                interaction.reply({embeds:[output]})
            })
        }
        else{
            jsonReader('src/data/usernames.json', (err, user) => {
                if (err) {
                    console.log(err)
                    return
                }
                for (let i = 0; i < user.usernames.length ; i++) {
                    let arr = [];
                    arr = user.usernames[i].name;
                    userout += `Registerd Users ${i+1} : ` + String(arr) + "\n";
                }
                interaction.reply({
                    content: `\`\`\`Registered Users: \n${userout}\`\`\``,
                })
            })
        }
    }
}