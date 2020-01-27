module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // Function that stores a new username and password in the Users table.
    // It also makes sure that the username entered has not been used already.
    
    const outputTable=context.bindings.outputTable;

    var username=req.query.username || req.body.username
    var password=req.query.password || req.body.password

    var tableData = {
        PartitionKey: username,
        RowKey: password
    };

    const inputTable = context.bindings.inputTable;

    if (inputTable.length == 0){
        context.bindings.outputTable = tableData;
        context.res = {
            status: 200,
            body: JSON.stringify("Thank you for signing up. Please login to access your homepage.")
        };
    }else{
        context.res = {
            status: 400,
            body: JSON.stringify("Username already in use. Please enter a different username to sign up.")
        };
    }
};