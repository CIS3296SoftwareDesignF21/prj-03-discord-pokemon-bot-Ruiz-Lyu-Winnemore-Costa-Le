
 class Pokemon{
    constructor(nameOfPokemon, level, maxhealth, moves) {
        this.nameOfPokemon=nameOfPokemon;
        this.level = level;
        this.health = maxhealth;
        this.maxhealth = maxhealth;
       // this.moves = moves;
        this.alive= true;
    }
    PokemonHealth(damage){
        this.health -=damage;
        if(this.health <= 0) {
            if (this.owner == 'player') {
                playerPokemon = this.faint(playerPokemon, playerParty);
            }
            if (this.owner == 'enemy') {
                enemyPokemon = this.faint(enemyPokemon, enemyParty);
            }
            if(this.owner == 'wildPokemion'){
                wildPokemon =this.faint((wildPokemon, enemyParty))

            }

        }
        if (this.health > this.maxhealth) {
            this.health = this.maxhealth;
        }
    }
    attack(target, move) {
        if (move.target == 'self') {
            this.PokemonHealth(Math.round(this.maxhealth * move.damage));
        } else {
            target.PokemonHealth(move.damage);
        }
    }
    useItem(target, item) {
        if (item.target == 'self') {
            this.PokemonHealth(this.maxhealth * item.damage);
        }
    }
    // Faint function will pull the next pokemon in the array into the battle
    faint(currentPokemon, party) {
        var foundPokemon = false;
        if (this.health <= 0) {
            console.log('fainted!');
            this.alive = false;
            for (var i = 0; i < party.length; i++) {
                if (party[i].alive == true) {
                    foundPokemon = true;
                    currentPokemon = party[i];
                    console.log(currentPokemon.pokename)
                    break;
                }
            }
            if (foundPokemon == false) {
                endGame();
            }
            return currentPokemon;
        }
    }
};
// can input more pokemon information
pokemon = [];
pokemon.push(new Pokemon('PIKACHU', 50, 117, [moves['tackle'], moves['thundershock']], ));
pokemon.push(new Pokemon('CHARIZARD', 50, 163, [moves['fire blast'], moves['mega punch']], ));
pokemon.push(new Pokemon('BLASTOISE', 50, 180, [moves['hydro pump'], moves['skull bash']], ));
let playerParty = [];
let enemyParty = [];
