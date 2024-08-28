const express= require('express');
const app = express();
const redis = require('redis');
const client = redis.createClient();
const { promisify } = require('util');

const listProducts = [
    { id: 1, name: 'Suitcase 250', price: 50, stock: 4 },
    { id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
    { id: 3, name: 'Suitcase 650', price: 350, stock: 2 },
    { id: 4, name: 'Suitcase 1050', price: 550, stock: 5 },
  ];

const getItemById = (id)=>{
    return listProducts.find(item=> item.id === id);
}

const getCurrentReservedStockById = async(itemId)=>{
    const getAsync = promisify(client.get).bind(client);
    const reservedStock = await getAsync(`item.${itemId}`);
    if (!reservedStock){
        return 0;
    }
    return reservedStock;
}

const reserveStockById = async (itemId, stock)=>{
    const item = getItemById(itemId);
    if (!item){
        throw new Error('Item not found');
    }
    let reservedStock = await getCurrentReservedStockById(itemId);
    const toBeReserved = stock + parseInt(reservedStock);
    if (item.stock < toBeReserved){
        return(new Error('Not enough stock available'));
    }
    client.set(`item.${itemId}`, toBeReserved);
};


app.get('/list_products', (req, res)=>{
    const products = listProducts.map((product)=>{
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            initialAvailableQuantity: product.stock
        }
    });
    return res.json(products);
});

app.get('/list_products/:itemId',async (req, res)=>{
    const itemId = parseInt(req.params.itemId);
    let item = getItemById(itemId);
    console.log(item);
    if(!item){
        return res.status(404).json({status: 'Item not found'});
    }
    const reservedStock = await getCurrentReservedStockById(itemId);
    console.log(`reservedStock: ${reservedStock}`);
    item = {
        id: itemId,
        name: item.name,
        price: item.price,
        initialAvailableQuantity: item.stock,
        currentQuentity: item.stock - reservedStock
    };
    res.json(item);
})
app.get('/reserve_product/:itemId', async(req, res)=>{
    const itemId = parseInt(req.params.itemId);
    let item = getItemById(itemId);
    if(!item){
        return res.status(404).json({status: 'Product not found'});
    };
    try{
        reserveStockById(itemId, 1);
        res.status(200).json({
            status: 'Reservation confirmed',
            itemId: itemId
        });

    }catch(err){
        return res.status(400).json({
            status: err.message,
            itemId: parseInt(req.params.itemId)
        })
    }
});

app.listen(1245, ()=>{
    console.log('API is running on port 1245');
});
