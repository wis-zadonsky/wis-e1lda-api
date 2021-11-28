import { Context, Telegraf, Scenes, session, Markup, Middleware } from 'telegraf';
import { categories } from './mock';

require('dotenv').config() 

const { enter, leave } = Scenes.Stage;
const token = process.env.BOT_TOKEN;

interface MySceneSession extends Scenes.SceneSessionData {
  mySceneSessionProp: number
}

interface SceneContext extends Context {
  myContextProp: string
  scene: Scenes.SceneContextScene<SceneContext, MySceneSession>
}

async function showCategories(ctx: any) {
  const categories = mockFetchCategories();
  const chunkedCategories = categories.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index / 2);
  
    if(!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
  
    resultArray[chunkIndex].push(item.name);
  
    return resultArray;
  }, []);

  ctx.scene.enter('category');
  return await ctx.reply(
    'А теперь выбери категорию. Выбрав категорию, ты всегда можешь вернуться написав "Назад" или используя команду /back',
    Markup
      .keyboard(chunkedCategories)
      .oneTime()
      .resize()
  );
}
const categoryScene = new Scenes.BaseScene<SceneContext>('category');
categoryScene.enter((ctx) => {
  console.log("I'm entered to category scene");
});
categoryScene.leave(showCategories);
categoryScene.command('back', leave<SceneContext>());
categoryScene.hears('Назад', leave<SceneContext>());

categoryScene.on('message', (ctx) => {
  // TODO show all items by category and enter on new scene
  ctx.reply('Yo');
});


function mockFetchCategories(): any[] {
  return categories;
}
const stage = new Scenes.Stage<SceneContext>([categoryScene], {
  ttl: 10,
})

const bot = new Telegraf<SceneContext>(token);

bot.use(Telegraf.log());
// TODO check is Admin

bot.use(session())
bot.use(stage.middleware())

bot.start((ctx) => {
  // TODO NEED to store every chatId to send mesages to Users
  // my chatId is 207377877
  ctx.reply(`
    Привет. Я вижу ты готов заказать еду?
    Что ж. Давай приступим.
    Введи /order и я подскажу что делать дальше.
  `)
});

bot.command('order', showCategories)

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

