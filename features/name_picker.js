const webex = require('webex')
const webex = webex.init({
    credentials: {
        access_token: process.env.ACCESS_TOKEN
    }
});

module.exports = function(controller) {
    
    controller.hears(async (message) => message.text && message.text.toLowerCase() == 'refresh', ['message'], async (bot, message) => {
        await bot.reply(message, 'OK, refreshing room attendees');

        try {
            let members = await webex.memberships.get(message.channel);
        
            for (var i = 0; i < members.length; i++) {
                console.log(members[i]);
            }

        } catch (err) {
            console.log(err);
        }

    });

    controller.hears(async (message) => message.text && message.text.toLowerCase() == 'select', ['message'], async (bot, message) => {
        await bot.reply(message, 'Pikachu, I choose you!');
    });
}