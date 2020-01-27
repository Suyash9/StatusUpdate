module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // Function that returns the users that the logged in user is following from the Follow table

    const inputTable=context.bindings.inputTable;
    var following = inputTable.map(a => a.RowKey);
    
    if(following.length>0){
        context.res = {
            status: 200,
            body: JSON.stringify(following)
        };
    }
    else {
        context.res = {
            status: 400,
            body: JSON.stringify("You are not following anyone yet")
        };
    }
};