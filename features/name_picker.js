module.exports = function(controller) {
    
    controller.hears(async (message) => message.text && message.text.toLowerCase() == 'refresh', ['message'], async (bot, message) => {
        await bot.reply(message, 'OK, refreshing room attendees');

        try {
            let botId = await bot.api.people.get('me')
            console.log(botId)
            bot.api.memberships.list({roomId: message.channel})
            .then(function(memberships) {
                for (var i = 0; i < memberships.length; i++) {
                    console.log(memberships.items[i].id);
                    console.log()
                }
            });
        
        } catch (err) {
            console.log(err);
        }

    });

    controller.hears(async (message) => message.text && message.text.toLowerCase() == 'select', ['message'], async (bot, message) => {
        await bot.reply(message, 'Pikachu, I choose you!');
    });
}