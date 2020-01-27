module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    /* Function that returns the tweets posted by the users followed by the logged in user, i.e., the 
       timeline of the user from the Tweets table */
    
    const inputTweets=context.bindings.inputTweets;

    const inputFollowing=context.bindings.inputFollowing;
    const following = inputFollowing.map(a => a.RowKey);
    var tweets = new Array();

    following.forEach(function(follow){
        (inputTweets.filter(function(user){
            return user.PartitionKey == follow;
        })).forEach(function(obj){
            tweets.push(obj);
        });
    });
    
    tweets.sort(compare);

    if(tweets.length>0){
        context.res = {
            status: 200,
            body: JSON.stringify(tweets)
        };
        context.done();
    }
    else {
        context.res = {
            status: 400,
            body: JSON.stringify("Follow other users to see their tweets")
        };
        context.done();
    }
};

function compare(x, y) {
    let a = parseInt(x.RowKey);
    let b = parseInt(y.RowKey);
    if (a > b) { 
        return -1;
    } else if (a < b) {
        return 1;
    } else {
        return 0;
    }
}