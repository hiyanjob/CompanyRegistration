var method = function parametchk(data)
{
    if(typeof data ==  undefined  || data == null || data.length == 0 ) return false;
    else return true;
}

module.exports = method;    