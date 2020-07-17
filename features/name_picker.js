const MongDB = require ('../lib/mongodb')

module.exports = function(controller) {
    
    controller.hears(async (message) => message.text && message.text.toLowerCase() == 'refresh', ['message'], async (bot, message) => {
        await bot.reply(message, 'OK, refreshing room attendees');

        try {
            let botId = await bot.api.people.get('me')
            console.log(botId.id)
            bot.api.memberships.list({roomId: message.channel})
            .then(function(memberships) {
                for (var i = 0; i < memberships.length; i++) {
                    console.log(memberships.items[i].personId);
                    
                    if (memberships.items[i].personId == botId.id) {
                        console.log('That\'s Me!')
                    } else {
                        MongDB.userInsert(memberships.items[i].personId, message.channel)
                    }
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