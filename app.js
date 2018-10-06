const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const bot = new Telegraf("627515245:AAGooNX-2v8n1WIe_N1BiAUI4WSkGf_Lr9k");
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "bmdlss1nc-mysql.services.clever-cloud.com",
    user: "uniginu57n4qjrse",
    password: "4XSDrSt1s832RhuxpXC",
    database:"bmdlss1nc"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});




//menu

bot.use(Telegraf.log());

bot.command('start',ctx => {
    var chatid = ctx.from.id;
    var firstname = ctx.from.first_name;
    var bal = 0;
    var tim=new Date();
    var address='';
    var user = {id: chatid,balance: bal, firstname: firstname,tim:tim,address:address,claim:tim};
    con.query("insert into `account` SET ?", user, function (error, results) {
        if (error) {
            console.log(error);
            ctx.reply('your account is already created',Markup
                .keyboard([
                    ['🐈Kitties', '☀️Farm'], // Row1 with 2 buttons
                    [' 💵Balance', '👨‍👨‍👧‍👧Affiliate'], // Row2 with 2 buttons
                    ['⚙️Settings', '🎉Market'],
                    ['🎭Chat',' 🎁Bonus'] // Row3 with 3 buttons Row3 with 3 buttons
                ])

                .resize()
                .extra())
            return;
        } else {
            ctx.reply('account created succesfully', Markup
                .keyboard([
                    ['🐈Kitties', '☀️Farm'], // Row1 with 2 buttons
                    [' 💵Balance', '👨‍👨‍👧‍👧Affiliate'], // Row2 with 2 buttons
                    ['⚙️Settings', '🎉Market'],
                      ['🎭Chat',' 🎁Bonus'] // Row3 with 3 buttons
                ])

                .resize()
                .extra())
        }
    })
})
bot.hears('🎁Bonus',ctx => {
    var bonus = Math.abs(Math.random()).toFixed(2) * 100;
    var dt=new Date().toLocaleDateString()
    var chatid = ctx.from.id;
    var sql = "update `account` set `balance` =`balance`+" + bonus + ", `claim` = '" + dt + "' where `id` = '" + chatid + "'";
    con.query(sql, function(err, results) {
        if (results.affectedRows > 0) {
            ctx.reply('Daily bonus:'+bonus+'🌟');
            console.log(dt)
        } else {
            console.log(err);
        }
    });
})





bot.hears('💵Balance',ctx => {
    var chatid = ctx.from.id;
    con.query("SELECT balance,lstbonus FROM account WHERE id="+chatid, function (err, result, fields) {
        if (err) throw err;
        ctx.reply('Your balance is: '+result[0].balance+'🌟\n'+'BTC: '+result[0].lstbonus.toFixed(5)+'💵'+'\n\n1000🌟=0.001 BTC')
    })
})











bot.hears('🐈Kitties',ctx => {
    ctx.replyWithHTML('<b>here you can buy kitties which wiil be mining stars 🌟.After collecting stars you can sell them in the market 🎉 and exchange them for real 💵 \n\n 1000 🌟=0.001 Btc</b>',
        Extra.HTML().markup((m) =>
            m.inlineKeyboard([
                m.callbackButton('🛒Buy', '🛒Buy'),
                m.callbackButton('🐈My kitties', '🐈My kitties'),
            ])))
})












bot.hears('🔍 Menu',ctx => {
    ctx.reply('Main Menu',Markup
        .keyboard([
            ['🐈Kitties', '☀️Farm'], // Row1 with 2 buttons
            [' 💵Balance', '👨‍👨‍👧‍👧Affiliate'], // Row2 with 2 buttons
            ['⚙️Settings', '🎉Market'],
            ['🎭Chat',' 🎁Bonus'] // Row3 with 3 buttons Row3 with 3 buttons
        ])

        .resize()
        .extra())

})





bot.action('🛒Buy',ctx=>{
    ctx.replyWithPhoto({ url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fcat-304318_1280.png?1538384531547' },
        Extra.load({ caption: 'price 0.001💵 BTC\nproduces 10🌟 per hour' })
            .markdown()
            .markup((m) =>
                m.inlineKeyboard([
                    m.callbackButton('🌟Buy red kitty', '🌟 Buy red kitty')
                ])
            )
    )
    ctx.replyWithPhoto({ url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fcats-30746_1280.png?1538384744873' },
        Extra.load({ caption: 'price 0.002💵 BTC\nproduces 50🌟 per hour' })
            .markdown()
            .markup((m) =>
                m.inlineKeyboard([
                    m.callbackButton('🌟Buy brown kitty', 'Buy brown kitty')
                ])
            )
    )



    ctx.replyWithPhoto({ url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fcartoon-1296251_1280.png?1538384573491' },
        Extra.load({ caption: 'price 0.01💵 BTC\nproduces 100🌟 per hour' })
            .markdown()
            .markup((m) =>
                m.inlineKeyboard([
                    m.callbackButton('🌟Buy leopard kitty', '🌟Buy leopard kitty')
                ])
            )
    )






    ctx.replyWithPhoto({ url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fleopard-47727_1280.png?1538384700257' },
        Extra.load({ caption: 'price 0.02💵 BTC\nproduces 150🌟 per hour' })
            .markdown()
            .markup((m) =>
                m.inlineKeyboard([
                    m.callbackButton('🌟Buy cheetah kitty', '🌟Buy cheetah kitty')
                ])
            )
    )




    ctx.replyWithPhoto({ url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fanimal-2029797_1280.png?1538385099144' },
        Extra.load({ caption: 'price 0.05💵 BTC\nproduces 500🌟 per hour' })
            .markdown()
            .markup((m) =>
                m.inlineKeyboard([
                    m.callbackButton('🌟Buy blue kitty', '🌟Buy blue kitty')
                ])
            )
    )




    ctx.replyWithPhoto({ url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fanimal-1297724_1280.png?1538384808550' },
        Extra.load({ caption: 'price 1💵 BTC\nproduces 2000🌟 per hour' })
            .markdown()
            .markup((m) =>
                m.inlineKeyboard([
                    m.callbackButton('🌟Buy cute kitty', '🌟Buy cute kitty')
                ])
            )
    )






})

bot.action('🌟Buy cute kitty',ctx=>{
    ctx.answerCbQuery(`you dont have enough funds to ${ctx.match}!`)
})





































bot.startPolling()

