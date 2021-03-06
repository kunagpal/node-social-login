/**
 * Created by kunag_000 on 22-06-2015.
 */
var uri = 'mongodb://localhost:27017/social';
var mongo = require('mongodb').MongoClient;

exports.fetch = function(doc, callback)
{
    var onConnect = function(err, db)
    {
        if(err)
        {
            callback(err);
        }
        else
        {
            var onFind = function(err, user)
            {
                db.close();
                if(err)
                {
                    callback(err);
                }
                else
                {
                    callback(null, user);
                }
            };
            console.log(doc);
            db.collection('users').findOne({_id : doc}, onFind);
        }
    };
    mongo.connect(uri, onConnect);
};

exports.count = function(callback) {
    var onConnect = function(err, db)
    {
        if(err)
        {
            callback(err);
        }
        else
        {
            var onCount = function(err, count)
            {
                db.close();
                if(err)
                {
                    callback(err);
                }
                else
                {
                    callback(null, count);
                }
            };
            db.collection('users').count(onCount);
        }
    };
    mongo.connect(uri, onConnect);
};

exports.find = function(doc, callback)
{
    var onConnect = function(err, db)
    {
        if(err)
        {
            callback(err);
        }
        else
        {
            var onFind = function(err, user)
            {
                db.close();
                if(err)
                {
                    callback(err);
                }
                else
                {
                    callback(null, user);
                }
            };
            db.collection('users').findOne(doc, onFind);
        }
    };
    mongo.connect(uri, onConnect);
};

exports.save = function(doc, callback)
{
    var onConnect = function(err, db)
    {
        if(err)
        {
            callback(err);
        }
        else
        {
            var onSave = function(err)
            {
                db.close();
                if(err)
                {
                    callback(err);
                }
                else
                {
                    callback(null, doc);
                }
            };
            db.collection('users').save(doc, onSave);
        }
    };
    mongo.connect(uri, onConnect);
};

exports.findOrInsert = function(doc, user, callback)
{
    var onConnect = function(err, db)
    {
        if(err)
        {
            callback(err);
        }
        else
        {
            var onQuery = function(err, rec)
            {
                if(err)
                {
                    callback(err);
                }
                else
                {
                    callback(null, rec.value || user);
                }
            };
            db.collection('users').findOneAndUpdate(doc, {$setOnInsert : user}, {upsert : true, new : true, returnOriginal : true}, onQuery);
        }
    };
    mongo.connect(uri, onConnect);
};