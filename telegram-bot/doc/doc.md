###Commands

bot.start((ctx) => ctx.reply('Welcome')) // listen command /start
bot.help((ctx) => ctx.reply('Send me a sticker')) // listen command /help
bot.on('sticker', (ctx) => ctx.reply('👍')) // listen sticker
bot.hears('hi', (ctx) => ctx.reply('Hey there')) //listen text
bot.command('test', (ctx) => ctx.reply('Yo')); // listne comnad like '/test'


#State

You can set a state for your User context:

`const bot = new Telegraf(process.env.BOT_TOKEN)

// Naive authorization middleware
bot.use((ctx, next) => {
  ctx.state.role = getUserRole(ctx.message)
  return next()
})

bot.on('text', (ctx) => {
  return ctx.reply(`Hello ${ctx.state.role}`)
})

bot.telegram.sendMessage(207377877, 'Hey cock'); // Send message to user


bot.launch()`ts
