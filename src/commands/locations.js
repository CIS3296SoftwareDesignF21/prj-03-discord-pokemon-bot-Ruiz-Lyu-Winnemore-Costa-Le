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
        .setName("locations")
        .setDescription("This posts all the towns of the region!")
        .addIntegerOption((option) =>
            option
                .setName("town")
                .setDescription("Selects a specific town and displays only that town")
                .setRequired(false)
        ),
    async execute(interaction){
        let locationsout = "";
        if(interaction.options.getInteger('town') != null && interaction.options.getInteger('town') < 12 && interaction.options.getInteger('town') > 0){
            jsonReader('src/data/locations.json', (err, location) => {
                if (err) {
                    console.log(err)
                    return
                }
                let selected = interaction.options.getInteger('town') - 1;
                console.log(`Call for town ${selected+1} : ${location.towns[selected].townName}`);
                const output = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setAuthor('Author: AlexRuiz#1857')
                .setTitle(`${location.towns[selected].townName}`)
                .setDescription(`This displays the town information for the town: ${location.towns[selected].townName}`)
                .addFields(
                    {name:'Travelable', value: `${location.towns[selected].canTravel}`, inline: true},
                    {name:'Pokémart', value: `${location.towns[selected].hasMart}`, inline: true},
                    {name:'Pokécenter', value: `${location.towns[selected].hasCenter}`, inline: true},
                    {name:'Gym', value: `${location.towns[selected].hasGym}`, inline: true},
                    {name:'Fishing', value: `${location.towns[selected].canFish}`, inline: true}
                )
                .setImage(`${location.towns[selected].locationImage}`)
                .setFooter('Type \'/locations\' to see a list of all the towns!');
                interaction.reply({embeds:[output]})
            })
        }
        else{
            jsonReader('src/data/locations.json', (err, location) => {
                if (err) {
                    console.log(err)
                    return
                }
                for (let i = 0; i < location.towns.length ; i++) {
                    let arr = [];
                    arr = location.towns[i].townName;
                    locationsout += `Town ${i+1} : ` + String(arr) + "\n";
                }
                interaction.reply({
                    content: `\`\`\`TOWNS: \n${locationsout}\`\`\``,
                })
            })
        }
    }
}