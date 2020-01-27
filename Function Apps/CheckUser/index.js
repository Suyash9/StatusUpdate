module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // Function that checks if username and corresponding password exist in Users table

    const inputTable=context.bindings.inputTable;

    if(inputTable != undefined){
        context.res = {
            status: 200,
            body: JSON.stringify(inputTable.PartitionKey)
        };
        context.done();
    }
    else {
        context.res = {
            status: 400,
            body: JSON.stringify("Please sign up before logging in")
        };
        context.done();
    }
};