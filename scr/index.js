const express = require('express');
const app = express();
const graphiqlExpress = require('./graphql-express');
const categorySchema = require('./schemas/categorySchema');
const productSchema = require('./schemas/productSchema');
const userSchema = require('./schemas/userSchema');
const shoppingCartSchema = require('./schemas/shoppingCartSchema');

require('./database');

app.use(require('./routes/index.routes'));
app.set('port', 3000);
app.set('view engine', 'pug');

graphiqlExpress.useSchema(app, '/category-endpoint', categorySchema);
graphiqlExpress.useSchema(app, '/product-endpoint', productSchema);
graphiqlExpress.useSchema(app, '/user-endpoint', userSchema);
graphiqlExpress.useSchema(app, '/shopping-cart-endpoint', shoppingCartSchema);

app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});
