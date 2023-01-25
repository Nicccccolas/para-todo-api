require('dotenv').config()

module.exports = {
  api: {
    //! port: process.env.PORT ? process.env.PORT : 3000,
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'http://localhost:3000/',
    jwtSecret: process.env.JWT_SECRET,
    emailPass: process.env.MAIL_PASS
  },
  db: process.env.DATABASE_URI_DEV
}