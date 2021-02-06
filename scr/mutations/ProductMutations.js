const graphql = require('graphql')
const {
    GraphQLNonNull,
    GraphQLString, 
    GraphQLBoolean 
} = graphql;

const graphqlTypes = require('../graphqlTypes/graphqltypes');
const productsModel = require('../models/products');


module.exports = {
    addproduct: {
        type: graphqlTypes.productType,
        /* define the arguments that we should pass to the mutation
           here we require both book name and the author name 
           the id will be generated automatically 
        */
        args: {
            name: {
                type: new GraphQLNonNull(GraphQLString),
            },
            description: {
                type: new GraphQLNonNull(GraphQLString),
            },
            category: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve: async (root, args) => {

            const uModel = new productsModel(args);
            const newProduct = await uModel.save();
            if (!newProduct) {
                throw new Error("Error. Couldn't create a new product");
            }
            return newProduct;
        }
    },
    updateproduct: {
        type: graphqlTypes.productType,
        args: {
            _id: {
                type: new GraphQLNonNull(GraphQLString)
            },
            name: {
                type: GraphQLString,
            },
            description: {
                type: GraphQLString,
            },
            active: {
                type: GraphQLBoolean
            },
            category: {
                type: GraphQLString
            }
        },
        resolve: async (root, args) => {
            //const updatedCategory = await categoriesModel.findByIdAndDelete(args._id;
            const updatedProduct = await productsModel.findByIdAndUpdate(args._id, args);
            if (!updatedProduct) {
                throw new Error("Error. Couldn't update the product with id " + args._id);
            }
            return updatedProduct;
        }
    },
    deleteproduct: {
        type: graphqlTypes.productType,
        args: {
            _id: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve: async (root, args) => {
            const removedProduct = await productsModel.findByIdAndUpdate(args._id, {active: false})
            if (!removedProduct) {
                throw new Error('error')
            }
            return removedProduct;
        }
    }
}