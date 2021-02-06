const graphql = require('graphql')

const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString
} = graphql;

const productModel = require('../models/products');
const ProductType = require('../graphqlTypes/graphqltypes').productType;

// Query
module.exports = new GraphQLObjectType({
  name: 'Query',
  fields:  ()=> {
    return {
      products: {
        type: new GraphQLList(ProductType),
        resolve:  async () => {
          const products = await productModel.find({active: true});
          if (!products) {
            throw new Error('error while fetching data');
          }
          return products.map(val => {
            return {
              id: val._id,
              name: val.name,
              description: val.description,
              active: val.active,
              createAt: val.createAt,
              category: val.category
            }
          });
        }
      },
      allproducts:{
        type: new GraphQLList(ProductType),
        resolve: async () => {
          const productos = await productModel.find();
          if (!productos) {
            throw new Error('error while fetching data');
          }
          return productos.map(val => {
            return {
              id: val._id,
              name: val.name,
              description: val.description,
              active: val.active,
              createAt: val.createAt,
              category: val.category._id
            }
          });
        }
      },
      searchproducts: {
        type: GraphQLList(ProductType),
        args: {
          search: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: async (_, args) => {
          const produtcs = productModel.find({$or: [
            {"name": {$regex: ".*" + args.search + ".*"}},
            {"description": {$regex: ".*" + args.search + ".*"}},
            {"categories": {name: {$regex: ".*" + args.search + ".*"}} },
            {"categories": {description: {$regex: ".*" + args.search + ".*"}}}
          ]});

          return produtcs;
        }
      },
      productDetail: {
        type: new GraphQLNonNull(ProductType),
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: async (_, args) => {
          const product = productModel.findById(args.id);
          if (!product){
            throw new Error("There is not item with this id")
          }
          return product;
        }
      }
    }
  }
})