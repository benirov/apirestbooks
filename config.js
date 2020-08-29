'use strict'

module.exports =
{
  port: process.env.PORT || 31387,
  db: process.env.MONGODB_URI || 'mongodb://default:default123@ds231387.mlab.com/apibooks',
  SECRET_TOKEN : 'mykeytoken'
}