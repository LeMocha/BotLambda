module.exports = {
    isBot : function(user){
        if(user.bot === true){
            return "Oui"
        }
        else {
            return "Non"
        }
    },
};