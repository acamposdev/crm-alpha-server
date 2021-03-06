let userSocketService = require('../service/users.socket.service').getInstance();

/**
 * [function description]
 * @param  {Object} io [description]
 * @return {Object}    [description]
 */
module.exports = function(io) {

  /**
   * [on description]
   * @param  {Object} 'connection'    [description]
   * @param  {Object} function(socket [description]
   * @return {Object}                 [description]
   */
  io.on('connection', function(socket) {
    logger.log('debug', '(socket.controller) Usuario conectado!');

    io.emit('message', 'User connected...OK');
    
    /**
     * [on description]
     * @param  {Object} 'disconnect' [description]
     * @param  {Object} function(    [description]
     * @return {Object}              [description]
     */
    socket.on('disconnect', function() {
      /** TODO implementar desconexion */
    });

    socket.on('connect user', function(user) {

      // Set the user in socket
      socket.user = user;

      // Add user to users socket matrix
      userSocketService.put(socket);
    });
  });
}
