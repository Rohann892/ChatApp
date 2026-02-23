import { Server } from "socket.io";

let io;
const userSocketMap = {};

const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        const userId = socket.handshake.query.userId;
        if (userId !== undefined) {
            userSocketMap[userId] = socket.id
        }

        io.emit('getOnlineUsers', Object.keys(userSocketMap));

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
            delete userSocketMap[userId];
        });
    });

    return io;
};

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId]
}

export { initSocket, io };