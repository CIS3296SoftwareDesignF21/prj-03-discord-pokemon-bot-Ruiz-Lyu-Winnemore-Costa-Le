let playerPokemon;
let enemyPokemon;
let wildPokemon;
let NameOfPokemon;

async function playerPokemon(PokemonID){
    let onwer = await doQuery('SELECT * FROM owner, user_prefs WHERE owner.user_id = ? AND user_prefs.owner_id = ?', [ownerId, ownerId]);
        if (onwer != null) {
            onwer = onwer[0];
        }
}
async function enemyPokemon(PokemonID){
    let onwer = await doQuery('SELECT * FROM onwer, user_prefs WHERE onwer.onwer_id = ? AND onwer_prefs.onwer_id = ?', [onwerId, onwerId]);
        if (onwer != null) {
        onwer = onwer[0];
    }
}
async function wildPokemon(PokemonID){
    let pokemon = await doQuery('SELECT * FROM pokemon WHERE wilder = ? ', [PokemonID]);
    return new Promise(function(resolve) {
        resolve(pokemon);
    });
}
async function NameOfPokemon(PokemonID){

}
