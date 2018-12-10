const fetch = require('node-fetch')

const findBy = (value, array, field = 'id') =>
  array[array.map(item => item[field]).indexOf(value)]

const generateFakeUsers = count =>
  fetch(`https://randomuser.me/api/?results=${count}`).then(res => res.json())

module.exports = { findBy, generateFakeUsers }
