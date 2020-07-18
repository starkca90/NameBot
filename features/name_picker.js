const cards = require('../lib/cards');
const ACData = require('adaptivecards-templating');
const MongoDB = require ('../lib/mongodb');

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
                        MongoDB.userInsert(memberships.items[i].personId, memberships.items[i].personDisplayName, message.channel)
                    }
                }
            });
        
        } catch (err) {
            console.log(err);
        }

    });

    controller.hears(async (message) => message.text && message.text.toLowerCase() == 'select', ['message'], async (bot, message) => {

        try {
            let userId = await MongoDB.userSelect(message.channel);

            if (userId != null) {
                let selectedUser = await bot.api.people.get(userId.user);
                let phoneNumber = '5555555555'

                var cardTemplate = new ACData.Template(cards['selection']);

                if (selectedUser.phoneNumbers.length > 0) {
                    phoneNumber = selectedUser.phoneNumbers[0].value;
                }
    
                var cardPayload = cardTemplate.expand({
                    $root: {
                        "user": {
                            "avatar": selectedUser.avatar,
                            "displayName": selectedUser.displayName
                        },
                        "properties": [
                            {
                                "key": "Email",
                                "value": selectedUser.emails[0]
                            },
                            {
                                "key": "Phone",
                                "value": phoneNumber
                            }
                        ]
                    }
                })
        
                await bot.reply(message, {
                    text: selectedUser.nickName + ', I choose you!',
                    // markdown: '<@personEmail:' + selectedUser.emails[0] + '|' + selectedUser.nickName + '>, I choose you!',
                    attachments: cardPayload
                });

                await bot.reply(message, {
                    text: selectedUser.nickName + ', I choose you!',
                    markdown: '<@personEmail:' + selectedUser.emails[0] + '|' + selectedUser.nickName + '>, I choose you!',
                });
            } else {
                await bot.reply(message, 'Well this is awkward, I don\'t have a name');
            }
    
 

        } catch (err) {
            console.log(err);
        }

    });
}