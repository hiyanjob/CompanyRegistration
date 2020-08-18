module.exports = function (err) {
    var errMessage = 'Something wrong', requiredFields = [], message;
    for (let field in err.errors) {
        if (err.errors[field].kind === "required") {
            requiredFields.push(field)
        }
        else if (err.errors[field].kind === 'user defined') {
            message = 'The given value is not unique';
        }
    }

    if (requiredFields.length > 0) {
        errMessage = "Following fields are required : " + requiredFields.join(", ");
    }
    else if (message !== undefined ) {
        errMessage = message
    }
    
    return errMessage;
}