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

  //createdBy: {type: ObjectId, ref: 'User', required: true},
})

// schema.statics.generateHash = function(password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_FACTOR))
// }

// schema.methods.validatePassword = function(password) {
//   return bcrypt.compareSync(password, this.password)
// }

module.exports = mongoose.model(schemaName, schema)
