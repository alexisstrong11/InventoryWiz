const { model, Schema } = require('mongoose');



const productSchema = new Schema({
  UPC: {
    type: String,
  },
  brand: {
    type: String
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  name: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 1,
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
