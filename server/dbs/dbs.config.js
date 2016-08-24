/*  Autor Bioshark.mx
    Descripción: Información de conexión las bases de datos */

module.exports = {
    sqlServer: {
        sensa: {
            server: 'sensaweb.database.windows.net',
            user: 'sensa',
            password: '8Rucretr',
            database: 'sensa',
            alias: 'sensa',
            windowsAzure: true
        }
        // test: {
        //     // server: '189.174.211.99',
        //     server: '192.168.1.74',
        //     user: 'sa',
        //     password: 'sql',
        //     database: 'Sensa_developer',
        //     alias: 'sensa',
        //     windowsAzure: false
        // }
    },
    mysql: {
        // test: {
        //     host: 'localhost',
        //     user: 'root',
        //     password: 'mysql',
        //     database: 'sakila',
        //     alias: 'sakila'
        // },
        // world: {
        //     host: 'localhost',
        //     user: 'root',
        //     password: 'mysql',
        //     database: 'world',
        //     alias: 'wolrd'
        // },
        sensa: {
            host: 'localhost',
            user: 'root',
            password: 'mysql',
            database: 'concredito',
            alias: 'concredito'
        }
    }
};
