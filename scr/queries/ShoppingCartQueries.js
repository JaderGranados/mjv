const graphql = require('graphql')

const {
  GraphQLObjectType,
  GraphQLList
} = graphql;

const shoppingCartModel = require('../models/shopping-cart');
const ShoppingCartType = require('../graphqlTypes/graphqltypes').shoppingcartType;
// Query
module.exports = new GraphQLObjectType({
  name: 'Query',
  fields:  ()=> {
    return {
      shoppingcarts: {
        type: new GraphQLList(ShoppingCartType),
        resolve:  async () => {
          const shoppingcarts = await shoppingCartModel.find({active: true});
          if (!shoppingcarts) {
            throw new Error('error while fetching data');
          }
          return shoppingcarts.map(val => {
            return {
              id: val._id,
            }
          });
        }
      },
      allshoppingcarts:{
        type: new GraphQLList(ShoppingCartType),
        resolve: async () => {
          const shoppingcarts = await shoppingCartModel.find();
          if (!shoppingcarts) {
            throw new Error('error while fetching data');
          }
          return shoppingcarts.map(val => {
            return {
                id: val._id
            }
          });
        }
      }
    }
  }
})