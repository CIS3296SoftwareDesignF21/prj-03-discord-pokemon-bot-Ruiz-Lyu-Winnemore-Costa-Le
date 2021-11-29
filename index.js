const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

//PRIVATE VARIABLE CALLS
const token = process.env['OTA1Njk1NzYyNjc4MTYxNDM4.YYN06A.sIvRHgGqBA5PeyGBBrpMwpixZLY']
const CLIENT_ID = process.env['905695762678161438']
const GUILD_ID = process.env['905700391050686475']

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
  async function getUser(userId) {
    let user = await doQuery('SELECT * FROM user, user_prefs WHERE user.user_id = ? AND user_prefs.user_id = ?', [userId, userId]);
    if (user != null) {
      user = user[0];
    }
    return new Promise(function(resolve) {
      resolve(user);
    });
  }

  /**
   * Gets all items owned by a user.
   *
   * @param {string} userId The Discord id of the user.
   *
   * @returns {Item[]} All items owned by a user, or null
   * if no items were found.
   */
  async function getBag(userId) {
    let bag = await doQuery('SELECT * FROM item WHERE item.owner = ? AND item.quantity > 0', [userId]);
    /* Need to return the whole list of items, not just a single row. */
    return new Promise(function(resolve) {
      resolve(bag);
    });
  }
  /**
   * Gets first Pokemon owned by a user.
   *
   * @param {string} userId The Discord id of the user.
   *
   * @returns {Pokemon[]} A list of all Pokemon currently owned
   * by the user.
   */
  async function getPokemon(userId) {
    let pokemon = await doQuery('SELECT * FROM pokemon WHERE current_trainer = ? ', [userId]);
    /* Need to return the whole list of Pokemon, not just a single row. */
    return new Promise(function(resolve) {
      resolve(pokemon);
    });
  }


  async function getMap(userId) {
    let maps = await doQuery(`SELECT * FROM pokemonMap WHERE map > 0`, [userId]);
    /* Need to return the whole list of balls, not just a single row. */
    return new Promise(function(resolve) {
      resolve(maps);
    });
  }
  async function getBalls(userId) {
    let balls = await doQuery(`SELECT * FROM pokebot.item WHERE owner = ? AND category = "Ball" AND quantity > 0`, [userId]);
    /* Need to return the whole list of balls, not just a single row. */
    return new Promise(function(resolve) {
      resolve(balls);
    });
  }

  async function throwPokeBall(message, wild, user, ball, turns) {
    let poc = parseJSON(generatePokemonJSONPath(wild.name, wild.form));
    let catchChance = 30; //percentages of change for catching a wild pokemon
    let catchRate = poc.catch_rate;

    let wasPokemonCaught = false;
    if (ball === "Normal cheap Ball") {
      catchChance = catchChance * 1;
    } else if (ball === "Great Ball") {
      catchChance = catchChance * 1.5;
    } else if (ball === "Ultra Ball") {
      catchChance = catchChance * 2;
    } else if (ball === "Master Ball") {
      catchChance = catchChance * 255;
    } else if (ball === "Level Ball") {
      if (leadLevel >= (wild.level * 4)) {
        catchChance = catchChance * 8;
      } else if (leadLevel >= (wild.level * 2)) {
        catchChance = catchChance * 4;
      } else if (leadLevel >= (wild.level * 1)) {
        catchChance = catchChance * 2;
      }

    }

     else if (ball === "Repeat Ball") {
      /**
       * @todo check if this works.
       */
        if (user.pokedex.charAt(wild.no - 1) === '1') {
          catchChance = catchChance * 3.5;
      }

    }
    let mes = await sendMessage(message.channel, (message.author.username + " threw " + article +
        " **" + ball + "**!"), true);
  }
  let shakes = 0;
  let percentageCatching = ((Math.ceil(Math.random() * catchRate) + catchChance));
  if (percentageCatching >= 70) {
    shakes++;
    await mes.react("▫");
  }
  percentageCatching = ((Math.ceil(Math.random() * catchRate) + catchChance));
  if (percentageCatching >= 70) {
    shakes++;
    if (shakes === 1) {
      await mes.react("▫");
    } else {
      await mes.react("◻");
    }
  }
  if (shakes === 0) {
      await sendMessage(message.channel, ("Oh no! The Pokémon ball broke,it's free!"));
  } else if (shakes === 1) {
      await sendMessage(message.channel, ("Aww! It appeared to be caught!"));
  } else if (shakes === 2) {
      await sendMessage(message.channel, ("Aargh! Almost had it!"));
  } else if (shakes === 3) {
      await sendMessage(message.channel, ("Gah! It was so close, too!"));
  } else if (shakes === 4) {
      await sendMessage(message.channel, ("Gotcha! " + wild.name + " was caught!"));

    wild.ot = message.author.username;
    wild.otid = message.author.id;

    if (wild.level > user.level) {
      user.level = wild.level;
    }

    wild.caughtIn = ball;
    wild.nick = await nicknamePokemon(message, wild);
    await addPokemon(message.author.id, wild);
    await addToPokedex(user, wild.no);

    PokemonCaught = true;
  }

  await removeItemFromBag(message.author.id, ball, 1);

  return new Promise(function(resolve) {
    resolve(PokemonCaught);
  });


})
();
