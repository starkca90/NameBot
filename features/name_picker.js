module.exports = function(controller) {
    
    controller.hears(async (message) => message.text && message.text.toLowerCase() == 'refresh', ['message'], async (bot, message) => {
        await bot.reply(message, 'OK, refreshing room attendees');

        try {
            
            bot.api.memberships.list({roomId: message.channel})
            .then(function(memberships) {
                for (var i = 0; i < members.length; i++) {
                    console.log(members[i]);
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