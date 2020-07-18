const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Standard URI format: mongodb://[dbuser:dbpassword]@[host]:port/dbname, details set in .env
let uri = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST + '/' + process.env.DB + '?retryWrites=true&w=majority';

async function nameInsert(user, roomId) {
    var entry = {
        user: user,
        roomId: roomId,
        selected: false,
    }

    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    try {
        const names = client.db().collection(process.env.COL_NAMES);

        names.insertOne(entry);
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }

}

module.exports = {
    userInsert: function (user, roomId) {
        console.log('MongoDB: userInsert ' + user + ' ' + roomId);

        nameInsert(user, roomId)
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