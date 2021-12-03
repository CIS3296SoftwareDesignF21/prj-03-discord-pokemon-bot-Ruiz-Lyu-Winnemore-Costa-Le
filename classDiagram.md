![classCapture](https://user-images.githubusercontent.com/70285457/144475084-6c013f11-e36e-4374-bebf-f53140e2be64.PNG)

## UML Class Diagram
Launch is a class used on first instance of game.  Pick from indexed list of base characters.  Enter a customizable player name as a string.  The Main Character class extends
the launch class and will pass the name variable and allow for further unique characteristics for the chosen main character.  These characteristics include id, gender
badge count, money, and changes to name.  The pokedex holds boolean varables for pokemon as discovered/undiscovered and caught/not caught.  It will also include a method to
search() to fetch data of a pokemon based on entered pokemon id.  Moves of pokemon are also associated with the pokemon class.  In the scenario of a wild encounter the option
to catch is an available move type