import discord
from discord.ext import commands
from discord.ext.commands import has_permissions
import requests
import json

client = commands.Bot(command_prefix='/') 
@client.event
async def on_ready():
    print("Logged in")
    

@client.command()
async def pokedex(ctx, *, args):
  
    pokemon = args.lower()
    try:
        r = requests.get(f'https://pokeapi.co/api/v2/pokemon/{pokemon}')
        packages_json = r.json()
        packages_json.keys()
        
        embed = discord.Embed(title="Pokedex")
        embed.add_field(name="Name", value=packages_json['name'], inline=True)
        embed.add_field(name="Pokedex Id", value=packages_json['id'], inline=True)
        embed.add_field(name="Weight", value=packages_json['weight'], inline=True)
        embed.add_field(name="Height", value=packages_json['height'], inline=True)
        embed.add_field(name="Base Ex", value=packages_json['base_experience'], inline=True)
        embed.set_thumbnail(url= f'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{pokemon}.png')

        for type in packages_json['types']: 
            embed.add_field(name="Type", value= type['type']['name'], inline=True)
        

        await ctx.send(embed=embed)
    except:
        await ctx.send("No Pokemon Found")

client.run(#'add token here') 
