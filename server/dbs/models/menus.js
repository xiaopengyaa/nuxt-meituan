const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Menus = new Schema({
  menu: {
    type: Array,
    require: true,
  },
})

module.exports = mongoose.model('Menus', Menus)
