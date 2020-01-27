module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // Function that returns the followers of the logged in user from the Follow table

    const inputTable=context.bindings.inputTable;
    var followers = inputTable.map(a => a.PartitionKey);
    
    if(followers.length>0){
        context.res = {
            status: 200,
            body: JSON.stringify(followers)
        };
    }
    else {
        context.res = {
            status: 400,
            body: JSON.stringify("No followers yet")
        };
    }
};