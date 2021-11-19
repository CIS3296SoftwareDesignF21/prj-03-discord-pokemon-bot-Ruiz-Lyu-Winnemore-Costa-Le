const Discord = require("discord.js");
const pokemons = require("xxxx.json");
const { getPokeballs } = require("@replit/database");

const catchChance;
const pokemonNameArg;


const pokeballs = await getPokeballs(userData);
if (pokeballs <= 0) {
    return msg.reply("You don't have any pokemon balls.");
  };

const pokemonToCatch = pokemons.find(
    (pokemon) => pokemon.name === pokemonNameArg
  );

  if (!pokemonToCatch) {
    return msg.reply("No Pokémon, try again!");
  };