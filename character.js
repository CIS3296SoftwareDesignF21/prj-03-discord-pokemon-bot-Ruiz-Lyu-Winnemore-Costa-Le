const Discord = require("discord.js")
const Database = require("@replit/database")

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const db = new Database()

const starterUserData = [
  "name",
  "id"
]

db.get("userData").then(userData => {
  if (!userData || userData.length < 1){
    db.set("userData", starterUserData)
  }
})

db.get("responding").then(value => {
  if (value == null){
    db.set("responding", true)
  }
})
//function to add user data
function updateUserData(data) {
  db.get("userData").then(userData => {
    userData.push([data])
    db.set("userData", userData)
  })
}

//function to delete user data

client.on("ready", () => {
  console.log('Logged in')
})

client.on("message", msg => {
  if (msg.content === "/start"){
    msg.reply("Lets create your character!! Type '/new'")
  }

  if (msg.content.startsWith("/new")){
    data = msg.content.split("/new ")[1]
    updateUserData(data)
    msg.channel.send("New user added")
  }

  if (msg.content.startsWith("/list")){
    db.get("userData").then(userData => {
      msg.channel.send(userData)
    })
  }

})
const mySecret = process.env['TOKEN']
client.login(mySecret)
