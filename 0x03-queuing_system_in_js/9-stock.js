let listProducts = [
    {
        Id: 1,
        name: 'Suitcase 250', 
        price: 50, 
        initialAvailableQuantity: 4,
        currentQuentity:4
    },
    {
        Id: 2, 
        name:'Suitcase 450', 
        price: 100, 
        initialAvailableQuantity: 10,
        currentQuentity:10
    },
    {
        Id: 3,
        name: 'Suitcase 650',
        price: 350,
        initialAvailableQuantity: 2,
        currentQuentity:2
    },
    {
        Id: 4, 
        name:'Suitcase 1050',
        price: 550,
        initialAvailableQuantity: 5,
        currentQuentity:5
    }
]

const getItemById = (id)=>{
    return listProducts.find(item=> item.Id === id);
}
const express= require('express');
const app = express();
const redis = require('redis');
const client = redis.createClient();

const reserveStockById = (itemId, stock)=>{
    listProducts.map((product)=>{
        if(product.Id === itemId){
            product.currentQuentity = product.currentQuentity - stock;
        }
        return product;
    });
    client.set(`item.${itemId}`, stock);
};

const getCurrentReservedStockById = async(itemId)=>{
    const getAsync = promisify(client.get).bind(client);
    const reservedStock = await getAsync(`item.${itemId}`);
    return reservedStock;
}

app.get('/list_products', (req, res)=>{
    const products = listProducts.map((product)=>{
        return {
            id: product.Id,
            name: product.name,
            price: product.price,
            initialAvailableQuantity: product.initialAvailableQuantity
        }
    });
    return res.json(products);
});

app.get('/list_products/:itemId',(req, res)=>{
    const itemId = parseInt(req.params.itemId);
    const item = getItemById(itemId);
    if(!item){
        return res.status(404).json({status: 'Item not found'});
    }
    return res.json(item);
})
app.get('/reserve_product/:itemId', async(req, res)=>{
    const itemId = parseInt(req.params.itemId);
    const item = getItemById(itemId);
    if(!item){
        return res.status(404).json({status: 'Item not found'});
    }
    const stock = parseInt(req.query.stock);
    if(item.currentQuentity < stock){
        return res.status(400).json({status: 'Not enough stock'});
    }
    reserveStockById(itemId, stock);
    return res.json({status: 'Reservation confirmed'});
});

app.listen(1245, ()=>{
    console.log('API is running on port 1245');
});
