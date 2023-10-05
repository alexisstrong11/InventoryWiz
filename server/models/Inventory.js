const { Schema, model } = require('mongoose');



const { Product } = require('./Product');

const inventorySchema = new Schema({
    inventoryName: {
        type: String,
        required: true,
    },
    priceTotal: {
        type: Number,
        allowNull: false,
        default: 0,
    },
    productList: {
        type: [Product],
        allowNull: true
        }
    },
    {
        toJSON: {
            virtuals: true,
        }
});


inventorySchema.pre('save', async function (next) {
    if (!this.isNew && this.isModified('productList')) {
        this.total = this.products?.reduce((acc, product) => {
            return acc + product.price;
        }, 0)
    } else {
        this.priceTotal = 0;
    }

    next();
});


const Inventory = model('Inventory', inventorySchema);

module.exports = Inventory;