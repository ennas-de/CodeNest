// backend/socket.js
const socketIO = require("socket.io");

// Function to initialize Socket.io and attach it to the server
const initializeSocket = (server) => {
  const io = socketIO(server);

  // Store active collaboration rooms and their users
  const collaborationRooms = new Map();

  io.on("connection", (socket) => {
    console.log("A user connected!");

    // Socket.io code update event
    socket.on("codeUpdate", ({ roomId, code }) => {
      handleCodeUpdate(roomId, code);
    });

    // Socket.io join room event
    socket.on("joinRoom", ({ roomId }) => {
      socket.join(roomId);
    });

    // Socket.io disconnection event
    socket.on("disconnect", () => {
      console.log("A user disconnected!");

      // Clean up empty rooms when a user disconnects
      collaborationRooms.forEach((room, roomId) => {
        if (room.users.has(socket.id)) {
          room.users.delete(socket.id);
          if (room.users.size === 0) {
            collaborationRooms.delete(roomId);
            console.log(`Room ${roomId} has been closed due to inactivity.`);
          }
        }
      });
    });
  });

  // Function to handle real-time code updates in a collaboration room
  const handleCodeUpdate = (roomId, code) => {
    if (!collaborationRooms.has(roomId)) {
      return;
    }

    // Update the code in the room
    collaborationRooms.get(roomId).code = code;

    // Emit the updated code to all clients in the room except the sender
    socket.to(roomId).emit("codeUpdated", { code });
  };

  return io;
};

module.exports = initializeSocket;