var colors = require('colors');

var error = 'ERROR:'.bgRed + ' ';
var warning = 'WARN:'.bgYellow.black + ' ';
var success = 'SUCCESS'.bgGreen + ' ';

// Files        =       magenta
// DB           =       red
// DBManager    =       cyan
// Route        =       green

module.exports = {
    warning: {
        routePrefix : function (routeName, fileName) {
            var warnMessage = warning + 'The route ' + routeName.green;
                warnMessage += ' was imported. \n';
                warnMessage += '      It\'s beacuse the file name does not have ';
                warnMessage += 'the prefix "route".\n';
                warnMessage += '      In the file: ' + fileName.magenta;
            console.warn(warnMessage);
        }
    }
}
