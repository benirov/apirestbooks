'use strict'

module.exports =
{
  port: process.env.PORT || 31387,
  db: process.env.MONGODB_URI || 'mongodb+srv://user123:KVCC334aLdlYo7xx@apibooks.anvtj.mongodb.net/apibooks?retryWrites=true&w=majority',
  SECRET_TOKEN : 'mykeytoken'
}