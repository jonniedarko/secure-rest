
module.exports = {
    isAlphaNumericOnly : function (input)
    {
        var letterNumber = /^[0-9a-zA-Z]+$/;
        if(input.match(letterNumber))
        {
            return true;
        }
        return false;
    },
    isLongEnough : function (input){
        if(input.length >= 6){
            return true;
        }
        return false;
    },
    isGoodPassword : function (input)
    {
        // at least one number, one lowercase and one uppercase letter
        // at least six characters
        var regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        return regex.test(input);
    }
}
