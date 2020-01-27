module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // Function that returns the username specified from the Users table

    const inputUser=context.bindings.inputUser;

    if(inputUser.length > 0){
        var user = inputUser.map(a => a.PartitionKey);
        context.res = {
            status: 200,
            body: JSON.stringify(user)
        };
        context.done();
    } else{
        context.res = {
            status: 400,
            body: JSON.stringify("No users with this username exist")
        };
        context.done();
    }
};