const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Standard URI format: mongodb://[dbuser:dbpassword]@[host]:port/dbname, details set in .env
let uri = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST + '/' + process.env.DB + '?retryWrites=true&w=majority';

async function nameInsert(user, displayName, roomId) {
    var entry = {
        user: user,
        displayName: displayName,
        roomId: roomId,
        selected: false,
    }

    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    try {
        const names = client.db().collection(process.env.COL_NAMES);

        await names.insertOne(entry);
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }

}

module.exports = {
    userInsert: function (user, displayName, roomId) {
        console.log('MongoDB: userInsert ' + user + ' ' + displayName + ' ' + roomId);

        nameInsert(user, displayName, roomId)
    },

    userSelect: async function (roomId) {
        console.log('MongoDB: userSelect');

        const client = await MongoClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        try {
            const names = client.db().collection(process.env.COL_NAMES);

            let res = await names.find({
                roomId: roomId,
                selected: false
            }).toArray();

            if (res.length > 0) {
                let selection = Math.floor(Math.random() * res.length);

                console.log(res[selection].user);
                console.log(roomId);
    
                await names.updateOne(
                    {user: res[selection].user,
                    roomId: roomId},
                    {$set: {selected: true}},
                    {upsert: true}
                );
    
                return res[selection];
            } else {
                return null;
            }


        } catch (err) {
            console.log(err);
        } finally {
            await client.close();
        }

    }
};