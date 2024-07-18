'use strict';

const crypto = require("crypto")

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi } */) {
    // You can extend functionality here if needed
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // @ts-ignore
    const io = require('socket.io')(strapi.server.httpServer, {
      cors: "*",
      methods: ["GET", "POST"],
      credentials: true,
      transports: ['websocket']
    });

    io.on('connection', (socket) => {
      console.log('A user connected');


      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });

      socket.on('chat message', (msg) => {
        io.emit('chat message', {
          ...msg,
          sender_id: msg.sender_id + 1,
          message_id: crypto.randomUUID()
        });
      });
    });

    strapi.io = io;
  }
};
