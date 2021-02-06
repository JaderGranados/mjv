import GraphQLClient from 'graphql-js-client';
 
// This is the generated type bundle from graphql-js-schema
import types from '../../scr/graphqlTypes/graphqltypes';
 
const client = new GraphQLClient(types.productType, {
  url: 'http:localhost:3000/product-endpoint',
  fetcherOptions: {
    headers: `Authorization: Basic aGV5LXRoZXJlLWZyZWluZCA=`
  }
});

const query = client.query(
    root => {
        root.add('products', products => {
            products.add('name');
            products.addConnection('category', {args:{first:3}}, category => {
                category.add('name')
            });
        })
    }
);

client.send(query).then(({model, data}) => {
    objects = model;
    console.log(model);
    console.log(data);
});