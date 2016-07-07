var mongoose = require('mongoose')
var Schema = mongoose.Schema

var applySchema = new Schema({
  applicationId: { type: String, required: true },
  recipientName: { type: String, required: true },
  recipientPhone: { type: String, required: true },
  status: { type: Number, default: 1 },
  applyTime: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Apply', applySchema)
