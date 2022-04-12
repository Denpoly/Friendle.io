const room = (roomName, host) => {
    return {
        roomName: roomName,
        users: [{user: host, score: 0}],
        currentRound : 0,
        timeLimit : 180,

        addUser : function(user) {
            this.users.push({user: user, score: 0});
        },

        startRound : function(){
            this.currentRound++;
        }

    }
}

module.exports = room;