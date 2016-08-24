var colors = require('colors');

var error = 'ERROR:'.bgRed + ' ';
var warning = 'WARN:'.bgYellow.black + ' ';
var success = 'SUCCESS'.bgGreen + ' ';

// Files        =       magenta
// DB           =       red
// DBManager    =       cyan
// Route        =       green

module.exports = {
    error: {
        bdConnectionError: function (gestorName, dbName, err) {
            var errorMessage = error + 'Trying to connect to database: ';
                errorMessage += dbName.red + ' on ' + gestorName.cyan;
            console.log(errorMessage, err);
        }
    },
    success: {
        bdConnectionSuccess: function (gestorName, dbName) {
            var successMessage = success + gestorName.cyan;
                successMessage += ' connection succefull to database: ';
                successMessage += dbName.red;
            console.log(successMessage);
        }
    }
}
