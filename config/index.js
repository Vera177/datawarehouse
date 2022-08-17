module.exports = {
    env: process.env.NODE_ENV || 'develop',	
    port: process.env.PORT || 3000,
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 27017,
        name: process.env.DB_NAME || 'warehouse',
        user: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || ''
    }
}