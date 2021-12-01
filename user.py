import discord
import os
import requests
import json
from discord.ext import commands
from discord.ext.commands import has_permissions

#from replit import db
"""
#funciton to add user to list of users through replit database(db)
def addUser(userName):
  if "name" in db.keys():
    name = db["name"]
    name.append(userName)
    db["name"] = name
  else:
    db["name"] = [userName]

#function to delete user by index in the database
def deleteUser(index):
  name = db["name"]
  if len(name) > index:
    del name[index]
    db["name"] = name
"""
my_secret = os.environ['TOKEN']
client = discord.Client()


#show bot is running
@client.event
async def on_ready():
  print("Discord Bot...")

#starting list of users 
bot_users = ["Chris Costa", "Alex Ruiz", "Xu"]
logUser = ""

@client.event
async def on_message(message):
  #make sure message is from user
    if message.author == client.user:
      return

    msg = message.content
    
    if msg.startswith("/add"):
      userName = msg.split("/add ", 1)[1]
      bot_users.append(userName)
      await message.reply("New user added")

    if msg.startswith("/users"):
      await message.reply(bot_users)

    if msg.startswith("/delete"):
      index = int(msg.split("/delete ", 1)[1])
      bot_users.pop(index)
      await message.reply("User deleted")

    if msg.startswith('/login'):
      index = int(msg.split("/login", 1)[1])
      logUser = bot_users[index]
      await message.reply("You've logged in as " + logUser)   

    #nice littel embed hear for the UI aspects 
    #hard code everything except the user name and have that dynamic
    if msg.startswith("/myInfo"):
      embed=discord.Embed(title="Trainer Card",  description="This command displays all the basic data for the logged in user", color=0x109319)
      embed.set_author(name="Chris")
      embed.set_thumbnail(url="https://i.imgur.com/axLm3p6.jpeg")
      embed.add_field(name="Name:", value="{}".format(logUser), inline=True)
      embed.add_field(name="Current $ Balance:", value="$15,000", inline=False) 
      embed.add_field(name="IDN0.", value="0000{}".format(logUser), inline=True)
      embed.set_footer(text="Badges: N/A")
    
client.run(my_secret)
#end api call
"""
    #add new users
    if msg.startswith("/new"):
      userName = msg.split("/new ", 1)[1]
      addUser(userName)
      await message.channel.send("New user added")
      
    #show usernames
    if msg.startswith("/show"):
      name = []
      if "name" in db.keys():
        name = db["name"]
      await message.channel.send(name)

    #delete user
    if msg.startswith("/delete"):
      name = []
      if "name" in db.keys():
        index = int(msg.split("/delete", 1)[1])
        deleteUser(index)
        name = db["name"]
      await message.channel.send(name) 
    
    #funciton to choose user by index
    if msg.startswith('/login'):
      index = int(msg.split("/login", 1)[1])
      logUser = usernames[index]
      await message.channel.send("You've logged in as " + logUser) 
"""
