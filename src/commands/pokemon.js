const { SlashCommandBuilder} = require("@discordjs/builders");
const fs = require("fs");
const Discord = require("discord.js");
const { timeStamp } = require("console");

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
        .setName("pokemon")
        .setDescription("A wild pokemon encounter")
        .addIntegerOption((option) =>
            option
                .setName("num")
                .setDescription("Selects a specific pokemon to encounter and starts an encounter with it")
                .setRequired(false)
        ),
    async execute(interaction){
        let pokesout = "";
        if(interaction.options.getInteger('num') != null && interaction.options.getInteger('num') < 152 && interaction.options.getInteger('num') > 0){
            jsonReader('src/data/pokemon.json', (err, pokemon) => {
                if (err) {
                    console.log(err)
                    return
                }
                let selected = interaction.options.getInteger('num') - 1;
                console.log(`Call for pokemon #${selected+1}: ${pokemon.pokes[selected].pokeName}`);
                const output = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setAuthor('Author: AlexRuiz#1857')
                .setTitle(`A wild ${pokemon.pokes[selected].pokeName} appeared!`)
                .setDescription(`Information about the wild pokemon: ${pokemon.pokes[selected].pokeName}`)
                .addFields(
                    {name:'Pokemon #', value: `${pokemon.pokes[selected].pokeId}`, inline: true},
                    {name:'Catch Rate', value: `${pokemon.pokes[selected].catchRate}`, inline: true}
                )
                .setImage(`${pokemon.pokes[selected].pokeImage}`)
                .setFooter('Type \'/pokemon\' to get a random pokemon!');
                interaction.reply({embeds:[output]})
            })
        }
        else{
            let randpoke = Math.floor(Math.random() * 151) + 1;
            jsonReader('src/data/pokemon.json', (err, pokemon) => {
                if (err) {
                    console.log(err)
                    return
                }
                console.log(`Random pokemon encounter resulted in #${randpoke}: ${pokemon.pokes[randpoke].pokeName}`);
                arr = pokemon.pokes[randpoke].pokeName;
                pokesout += `#${randpoke}: ` + String(arr) + "\n";
                const output = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setAuthor('Author: AlexRuiz#1857')
                .setTitle(`A wild ${pokemon.pokes[randpoke].pokeName} appeared!`)
                .setDescription(`Information about the wild pokemon: ${pokemon.pokes[randpoke].pokeName}`)
                .addFields(
                    {name:'Pokemon #', value: `${pokemon.pokes[randpoke].pokeId}`, inline: true},
                    {name:'Catch Rate', value: `${pokemon.pokes[randpoke].catchRate}`, inline: true}
                )
                .setImage(`${pokemon.pokes[randpoke].pokeImage}`)
                .setFooter(`${interaction.user.tag}`)
                .setTimestamp(interaction.createdAt);
                interaction.reply({embeds:[output]})
            })
        }
    }
}