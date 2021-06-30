module.exports = {
    isBot : function(user){
        if(user.user.bot == true){
            return "Oui"
        }
        else {
            return "Non"
        }
    },
    musicTime : function(hours, minutes, seconds){
        if (hours === 0) {
            if (minutes === 0) {
               return `0${seconds}`.slice(-2)+"s"
            }
            else {
                return `0${minutes}`.slice(-2)+"m "+`00${seconds}`.slice(-2)+"s"
            }
        }
        else {
            return `0${hours}`.slice(-2)+"h "+`00${minutes}`.slice(-2)+"m "+`00${seconds}`.slice(-2)+"s"
        }
    },
    logTime : function(d = new Date){
        return `00${d.getDate()}`.slice(-2)+"/"+`00${d.getMonth()+1}`.slice(-2)+"/"+`${d.getFullYear()}`+" - "+`00${d.getHours()}`.slice(-2)+":"+`00${d.getMinutes()}`.slice(-2)+":"+`00${d.getSeconds()}`.slice(-2)
    },
};