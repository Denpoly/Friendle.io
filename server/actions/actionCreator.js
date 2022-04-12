module.exports = { 
        emitMessage : (message, sender) => {
        return{
            type: "messages/setMessages",
            message: message,
            sender: sender
            }
    },
        sendRoomUsers : (users) => {
            return {
                type: "socket/sendRoomUsers",
                users: users
            }
    },
        startRound : (time, word) => {
            return {
                type:"socket/startRound",
                word: word,
                time: time
            }
    },
        newWord: (word) => {
            return {
                type: "guesses/newWord",
                newWord: word
            }
        },

        resetRoundGame: () => {
            return {
                type: "guesses/resetRound"
            }
        },
        userReady: (user) => {
            return{
                type: "socket/userReady",
                user: user
            }
        }
}
