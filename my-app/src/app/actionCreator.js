
export const joinRoom = (room, sender) => {
    return {
        type: "JOIN_ROOM",
        meta: {
            remote: true,
            roomId: room,
            user: sender
        }
    }
}

export const sendMessage = (sender, message, room) => {
    return {
        type: "SEND_MESSAGE_TO_ROOM",
        meta: {
            remote: true,
            roomId: room,
            sender: sender,
            message: message
        }
    }


}

export const userReady = (user, roomId) => {
    return {
        type: "USER_READY",
        meta: {
            remote:true,
            user: user,
            roomId: roomId
        }
    }
}

export const userWon = (user, roomId) => {
    return {
        type: "USER_WON",
        meta: {
            remote: true,
            user: user,
            roomId: roomId
        }
    }
}

export const userOutOfTime = (roomId) => {
    return {
        type: "USER_OUT_TIME",
        meta:{
            remote: true,
            roomId: roomId
        }
    }
}

export const resetRoundSocket = () => {
    return {
        type: "socket/resetRound",

    }
}
