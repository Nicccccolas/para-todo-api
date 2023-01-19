const bcrypt = require('bcrypt')

const hash = myPlainTextPassword => bcrypt.hashSync(myPlainTextPassword, 10)

const comparePassword = (myPlainTextPassword, password) => bcrypt.compareSync(myPlainTextPassword, password)

module.exports = {
  hash,
  comparePassword
}