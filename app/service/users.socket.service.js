/**
 * @class
 * 
 * Singleton for socket associated to users manteniacne
 */
function UserSocketSingleton() {

    // Instance stores a reference to the Singleton
    var instance;

    // users socket matirx
    var users = {};

    function init() {

        // Singleton
    
        /**
         * Method for add socket to users matric by id
         * @param {socket.io} socket socket of user connected
         */
        function put(socket) {
            users[socket.user.userId] = socket;
            logger.debug('(UserSocketSingleton) put: ' , socket.user);
        }

        /**
         * Method for get socket associated to user by userId
         * @param {String} userId User identifier
         */
        function get(userId) {
            logger.debug('(UserSocketSingleton) get: ' , users[userId].user);
            return users[userId];
        }
    
        /**
         * Method for remove socket from users by userId
         * @param {String} userId User identifier
         */
        function remove(userId) {
            delete users[userId];
            logger.debug('(UserSocketSingleton) remove: ' , userId);
        }

        /**
         * Method for trace users object
         */
        function read() {
            logger.debug('(UserSocketSingleton) users: ' , users);
        }
    
        return {
            put,
            get, 
            remove, 
            read
        };
    
      };
    
      return {
    
        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function () {
    
          if ( !instance ) {
            instance = init();
          }
    
          return instance
        }
    
    };
};
    
module.exports = new UserSocketSingleton();

/*
var uss = new UserSocketSingleton().getInstance();
uss.put({
    user: {
        id: 1,
        userId: 1,
        username: 'acampos'
    }
});

uss.read();
*/