var mongoose = require('mongoose')
// var bcrypt = require('bcryptjs')
var Schema = mongoose.Schema
var ObjectId = mongoose.SchemaTypes.ObjectId
var schemaName = "Song"
// const SALT_FACTOR = 13

var schema = new Schema({
  artistName:{type: String},
  collectionName: {type: String},
  trackName: {type: String},
  artworkUrl60: {type: String},
  previewUrl: {type: String},
  trackId: {type: Number},
  trackPrice: {type: Number},
  playlistId: {type: ObjectId, ref: 'playlist', required: true}
  //createdBy: {type: ObjectId, ref: 'User', required: true},
})

// schema.statics.generateHash = function(password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_FACTOR))
// }

// schema.methods.validatePassword = function(password) {
//   return bcrypt.compareSync(password, this.password)
// }

module.exports = mongoose.model(schemaName, schema)
