const graphql = require('graphql')
const {
    GraphQLNonNull,
    GraphQLString, 
    GraphQLBoolean ,
    GraphQLList
} = graphql;

const ShoppingCartType = require('../graphqlTypes/graphqltypes').shoppingcartType;
const shoppingcartModel = require('../models/shopping-cart');


module.exports = {
    addshoppingcart: {
        type: ShoppingCartType,
        /* define the arguments that we should pass to the mutation
           here we require both book name and the author name 
           the id will be generated automatically 
        */
        args: {
            user: {
                type: new GraphQLNonNull(GraphQLString),
            },
            products: {
                type: new GraphQLList(GraphQLString),
            }
        },
        resolve: async (root, args) => {

            const uModel = new shoppingcartModel(args);
            const newShoppingCart = await uModel.save();
            if (!newShoppingCart) {
                throw new Error("Error. Couldn't create a new user");
            }
            return newShoppingCart;
        }
    },
    updateshoppingcart: {
        type: ShoppingCartType,
        args: {
            _id: {
                type: new GraphQLNonNull(GraphQLString)
            },
            user: {
                type: GraphQLString,
            },
            products: {
                type: new GraphQLList(GraphQLString),
            }
        },
        resolve: async (root, args) => {
            //const updatedCategory = await categoriesModel.findByIdAndDelete(args._id;
            const updatedShoppingCart = await shoppingcartModel.findByIdAndUpdate(args._id, args);
            if (!updatedShoppingCart) {
                throw new Error("Error. Couldn't update the user with id " + args._id);
            }
            return updatedShoppingCart;
        }
    },
    deleteuser: {
        type: ShoppingCartType,
        args: {
            _id: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve: async (root, args) => {
            const removedShoppingCart = await shoppingcartModel.findByIdAndUpdate(args._id, {active: false})
            if (!removedShoppingCart) {
                throw new Error('error')
            }
            return removedShoppingCart;
        }
    }
}