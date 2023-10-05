const { Schema, model } = require('mongoose');


const productSchema = new Schema({
  UPC: {
    type: String,
    allowNull: true,
  },
  brand: String,
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  category: [String],
});

const Product = model('Product', productSchema);

module.exports = Product;
