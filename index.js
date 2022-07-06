const {
    Telegraf,
    Markup
} = require('telegraf')
require('dotenv').config()
const txt = require('./const')
const txt1 = require('./rost')
const txt2 = require('./velo')

// functions
const bot = new Telegraf(process.env.bttk)

//старт (кнопки Да1, Нет2)
bot.start(async (ctx) => {
    
    try {
        await ctx.reply(`Добро пожаловать ${ctx.message.from.first_name}
Я бот, который поможет подобрать велосипед по выбранным параметрам, приступим?`, Markup.inlineKeyboard(
        [
            [Markup.button.callback('🚲 Да! 🚲', 'btn1'), Markup.button.callback('Нет', 'btn2')]
        ]
    ))
    } catch(e){
        console.error(e)}
    })  

//Тогда приступим (кнопки Далее3, Назад4)
bot.action('btn1', async(ctx) =>{
try{
    await ctx.answerCbQuery()
    await ctx.reply('Тогда приступим!', Markup.inlineKeyboard(
        [
            [Markup.button.callback('Далее', 'btn3')]
        ]
    ))
} catch(e){
    console.error(e)}})
//7 - муж 8 - жен
bot.action('btn3', async(ctx) =>{
        try{
            await ctx.answerCbQuery()
            await ctx.reply('Для начала выберите кто будет пользоваться велосипедом: ', Markup.inlineKeyboard(
                [
                    [Markup.button.callback(`${txt1.sm}`, 'btn7'), Markup.button.callback(`${txt1.sw}`, 'btn8')],
                ]
            ))
        } catch(e){
            console.error(e)}})

//муж 9 - 155-172 10 - 168-182 11 - 178-190 12 - 185-200 13 - 200-210 14 - 190-210
bot.action('btn7', async(ctx) =>{
    try{
        await ctx.answerCbQuery()
        await ctx.reply('Таак, мужчине... тогда определимся с ростом')
        await ctx.reply('Выберите рост', Markup.inlineKeyboard(
            [
                [Markup.button.callback(`${txt1.r1}`, 'btn9'), Markup.button.callback(`${txt1.r2}`, 'btn10')],
                [Markup.button.callback(`${txt1.r3}`, 'btn11'), Markup.button.callback(`${txt1.r4}`, 'btn12')],
                [Markup.button.callback(`${txt1.r5}`, 'btn13'), Markup.button.callback(`${txt1.r6}`, 'btn14')],
                [Markup.button.callback('Вернуться назад к выбору пола пользователя', 'btn3')]
            ]
        ))

    } catch(e){
        console.error(e)}})

bot.action('btn8', async(ctx) =>{
            try{
                await ctx.answerCbQuery()
                await ctx.reply('Хм, женщине, тогда давай определимся с ростом!')
                await ctx.reply('Выберите рост', Markup.inlineKeyboard(
                    [
                        [Markup.button.callback(`${txt1.r1}`, 'btn15'), Markup.button.callback(`${txt1.r2}`, 'btn16')],
                        [Markup.button.callback(`${txt1.r3}`, 'btn17'), Markup.button.callback(`${txt1.r4}`, 'btn18')],
                        [Markup.button.callback(`${txt1.r5}`, 'btn19'), Markup.button.callback(`${txt1.r6}`, 'btn20')],
                        [Markup.button.callback('Вернуться назад к выбору пола пользователя', 'btn3')]
                    ]
                ))
        
            } catch(e){
                console.error(e)}})
//9 - 145-158


function RS_podbor(btn, rost, sex, velo_btn) {
    bot.action(btn, async(ctx) =>{
        try{
            await ctx.answerCbQuery()
            await ctx.reply('Хорошо! Давай проверим:')
            await ctx.replyWithHTML(`🚲🚲 Рост: <b>${rost}</b>, Пол: <b>${sex}</b> 🚲🚲`)
            await ctx.reply('Всё верно?',  Markup.inlineKeyboard(
                [
                    [Markup.button.callback('Да, покажи мне велосипеды!', velo_btn), Markup.button.callback('Нет, хочу поменять рост!', 'btn7')]
                ]
            ))
        } catch(e){
            console.error(e)}})
}


RS_podbor('btn9', txt1.r1, txt1.sm, 'v9')
RS_podbor('btn10', txt1.r2, txt1.sm, 'v10')
RS_podbor('btn11', txt1.r3, txt1.sm, 'v11')
RS_podbor('btn12', txt1.r4, txt1.sm, 'v12')
RS_podbor('btn13', txt1.r5, txt1.sm, 'v13')
RS_podbor('btn14', txt1.r6, txt1.sm, 'v14')
RS_podbor('btn15', txt1.r1, txt1.sw, 'v15')
RS_podbor('btn16', txt1.r2, txt1.sw, 'v16')
RS_podbor('btn17', txt1.r3, txt1.sw, 'v17')
RS_podbor('btn18', txt1.r4, txt1.sw, 'v18')
RS_podbor('btn19', txt1.r5, txt1.sw, 'v19')
RS_podbor('btn20', txt1.r6, txt1.sw, 'v20')

//Нет (5 6) 
bot.action('btn2', async(ctx) =>{
        try{
            await ctx.answerCbQuery()
            await ctx.reply('Ну может всё же поищем велосипед?...', Markup.inlineKeyboard(
                [
                    [Markup.button.callback('Ну ладно, давай.', 'btn5'), Markup.button.callback('Нет, всё ещё не хочу', 'btn6')]
                ]
            ))
        } catch(e){
            console.error(e)}})


bot.action('btn5', async(ctx) =>{
    try{
        await ctx.answerCbQuery()
        await ctx.reply('Тогда приступим!', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Далее', 'btn3')]
            ]
        ))
    } catch(e){
        console.error(e)}})

bot.action('btn6', async(ctx) =>{
    try{
        await ctx.answerCbQuery()
        await ctx.reply('Ну не хочешь, и ладно, держи хоть такой 👉🚲', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Если всё же захочешь, нажми сюда', 'btn1')]
            ]
        ))
    } catch(e){
        console.error(e)
    }})

    function Velo_podbor(velo_btn, rost, sex, name, about, img){
bot.action(velo_btn, async(ctx) =>{
    try{
            await ctx.answerCbQuery()
            await ctx.reply(`Держи велосипеды, которые подойдут тебе по твоим параметрам: ${rost}, ${sex}:`)
            await ctx.replyWithHTML(`<b> ${name} </b>`)
            await ctx.replyWithHTML(`${about}`)
            if(img !==false){
                await ctx.replyWithPhoto({
                    url: (`${img}`)
                })
            }
        } catch(e){
            console.error(e)}})
        }
    
Velo_podbor('v9', txt1.r1, txt1.sm, txt2.mn11, txt2.ma11, txt2.mi13)
Velo_podbor('v10', txt1.r1, txt1.sm, txt2.mn21, txt2.ma22, txt2.mi23)
Velo_podbor('v11', txt1.r1, txt1.sm, txt2.mn31, txt2.ma32, txt2.mi33)
Velo_podbor('v12', txt1.r1, txt1.sm, txt2.mn41, txt2.ma42, txt2.mi34)
Velo_podbor('v13', txt1.r1, txt1.sm, txt2.mn51, txt2.ma52, txt2.mi35)
Velo_podbor('v14', txt1.r1, txt1.sm, txt2.mn61, txt2.ma62, txt2.mi36)
Velo_podbor('v15', txt1.r1, txt1.sw, txt2.wn11, txt2.wa12, txt2.wi31)
Velo_podbor('v16', txt1.r1, txt1.sw, txt2.wn21, txt2.wa22, txt2.wi32)
Velo_podbor('v17', txt1.r1, txt1.sw, txt2.wn31, txt2.wa32, txt2.wi33)
Velo_podbor('v18', txt1.r1, txt1.sw, txt2.wn41, txt2.wa42, txt2.wi34)
Velo_podbor('v19', txt1.r1, txt1.sw, txt2.wn51, txt2.wa52, txt2.wi35)
Velo_podbor('v20', txt1.r1, txt1.sw, txt2.wn61, txt2.wa62, txt2.wi36)

      
     
     

bot.help((ctx) => ctx.reply(`Сейчас я могу выполнить следующие команды: ${txt.cmd}`))
bot.hears('Привет', (ctx) => ctx.reply(`Ну привет, ${ctx.message.from.first_name}, хочешь выбрать велосипед? 
Если да, то нажимай -> /start`))
bot.launch()



// stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))