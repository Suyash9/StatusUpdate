module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // Function that returns the tweets posted by the logged in user from the Tweets table

    const inputTable=context.bindings.inputTable;
    inputTable.sort(compare);

    if(inputTable.length>0){
        
        context.res = {
            status: 200,
            body: JSON.stringify(inputTable)
        };
        context.done();
    }
    else {
        context.res = {
            status: 400,
            body: JSON.stringify("Tweet something using the tweet box")
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