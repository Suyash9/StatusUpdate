module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // Function that returns tweets that contain the specified characters from the Tweets table

    const inputTable=context.bindings.inputTable;
    var search = req.query.search || req.body.search;
    var searchString = String("\\b("+search+")\\b");
    var searchedTweets = new Array();

    inputTable.filter(function(tweetRecord){
        return (tweetRecord.tweet).match(searchString);
    }).forEach(function(obj){
        searchedTweets.push(obj);
    });

    if(searchedTweets.length>0){
        context.res = {
            status: 200,
            body: JSON.stringify(searchedTweets.slice(0,20))
        };
        context.done();
    }
    else {
        context.res = {
            status: 400,
            body: JSON.stringify("No tweets containing this phrase exist")
        };
        context.done();
    }
};