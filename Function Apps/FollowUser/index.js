module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // Function stores a new follow relation in the Follow table.
    /* It also makes sure that the user logged in isn't already following the other user and that the 
       user isn't trying to full themselves */

    const outputTable=context.bindings.outputTable;

    var username=req.query.username || req.body.username
    var follow=req.query.follow || req.body.follow

    var tableData = {
        PartitionKey: username,
        RowKey: follow
    };

    const inputTable = context.bindings.inputTable;
    
    if ((inputTable == null) && (username != follow)){
        context.bindings.outputTable = tableData;
        context.res = {
            status: 200,
            body: JSON.stringify(follow)
        };
    }else{
        context.res = {
            status: 400,
            body: JSON.stringify("You cannot follow yourself or another user you are already following")
        };
    }
};