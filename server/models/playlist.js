var mongoose = require('mongoose')
// var bcrypt = require('bcryptjs')
var Schema = mongoose.Schema
var ObjectId = mongoose.SchemaTypes.ObjectId
var schemaName = "Playlist"
// const SALT_FACTOR = 13

var schema = new Schema({
  name:{type: String},
  songs:[{
    
  }]
})

module.exports = mongoose.model(schemaName, schema)
