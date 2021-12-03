import os
import discord
import requests
import json
from discord.ext import commands
from discord.ext.commands import has_permissions

client = commands.Bot(command_prefix='/')
my_secret = os.environ['TOKEN']
my_secret2 = os.environ['testBot']  #test server token

#code for api call for pokedex
@client.event
async def on_ready():
    print("Pokedex...")

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
        embed.set_thumbnail(url= f'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{pokemon}.png')
        embed.add_field(name="Weight", value=packages_json['weight'], inline=True)
        embed.add_field(name="Height", value=packages_json['height'], inline=True)
        embed.add_field(name="Base Level", value=packages_json['base_experience'], inline=True)

        for type in packages_json['types']:
            embed.add_field(name="Type", value= type['type']['name'], inline=True)

        await ctx.reply(embed=embed)
    except:
        await ctx.reply("No Pokemon Found")
#end api call
client.run(my_secret)