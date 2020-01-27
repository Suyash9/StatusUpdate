module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    /* Function that stores a new tweet along with the username of the user who posted it and the time 
       it was posted in the Tweets table */

    const outputTable=context.bindings.outputTable;

    var username=req.query.username || req.body.username
    var row = new Date().getTime()
    var tweet=req.query.tweet || req.body.tweet

    var tableData = {
        PartitionKey: username,
        RowKey: row,
        tweet: tweet
    };

    context.bindings.outputTable = tableData;
    context.res = {
        status: 200,
        body: "Storing tweet by " + username + " : " + tweet
    };
};