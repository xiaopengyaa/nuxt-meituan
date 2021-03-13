const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Menus = new Schema({
  id: {
    type: String,
    require: true,
  },
  value: {
    type: Array,
    require: true,
  },
})

module.exports = mongoose.model('Menus', Menus)
