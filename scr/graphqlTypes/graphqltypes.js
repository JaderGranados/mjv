const { GraphQLList } = require('graphql');
const graphql = require('graphql')

const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean
} = graphql;

const { GraphQLDateTime } = require('graphql-iso-date');
const categories = require('../models/categories');
const products = require('../models/products');
const users = require('../models/users');
const shoppingCarts = require('../models/shopping-cart');

const categoryType = new GraphQLObjectType({
    name: 'category',
    fields: () => {
        return {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            name: {
                type: GraphQLString
            },
            description: {
                type: GraphQLString
            },
            active: {
                type: GraphQLBoolean
            },
            createAt: {
                type: GraphQLDateTime
            },
            products: {
                type: new GraphQLList(productType),
                resolve: async (parent) => {
                    const productsQuery = await products.find({ category: parent.id });
                    if (!productsQuery) {
                        throw new Error("Error obteniendo la categoría");
                    }
                    return productsQuery.map(val => {
                        return {
                            id: val._id,
                            name: val.name,
                            description: val.description,
                            active: val.active,
                            createAt: val.createAt,
                            category: parent.id
                        }
                    });
                }
            }
        }
    }
});

const productType = new GraphQLObjectType({
    name: 'products',
    fields: () => {
        return {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            name: {
                type: GraphQLString
            },
            description: {
                type: GraphQLString
            },
            active: {
                type: GraphQLBoolean
            },
            createAt: {
                type: GraphQLDateTime
            },
            category: {
                type: categoryType,
                resolve: (parent) => {
                    const val = categories.findById(parent.category);
                    if (!val) {
                        throw new Error("Error obteniendo la categoría");
                    }
                    return val;
                    // return {
                    //     id: val._id,
                    //     name: val.name,
                    //     description: val.description,
                    //     active: val.active,
                    //     createAt: val.createAt
                    // }
                }
            }
        }
    }
});

const userType = new GraphQLObjectType({
    name: 'users',
    fields: () => {
        return {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            name: {
                type: GraphQLString
            },
            lastname: {
                type: GraphQLString
            },
            username: {
                type: GraphQLString
            },
            password: {
                type: GraphQLString
            },
            active: {
                type: GraphQLBoolean
            },
            createAt: {
                type: GraphQLDateTime
            },
            shoppingcart: {
                type: shoppingcartType,
                resolve: async (parent) => {
                    const user = await shoppingCarts.findOne({user: parent.id});

                    //console.log(user);
                    if (!user){
                        throw new Error("Can't get shoppingcart");
                    }

                    return {
                        id: user._id
                    }
                }
            }
        }
    }
});

const shoppingcartType = new GraphQLObjectType({
    name: 'shoppingcart',
    fields: () => {
        return {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            user: {
                type: new GraphQLNonNull(userType)
            },
            products: {
                type: new GraphQLList(productType)
            },
            active: {
                type: GraphQLBoolean
            },
            createAt: {
                type: GraphQLDateTime
            },
            user: {
                type: userType,
                resolve: async (parent) => {
                    const shoppingcartVar = await shoppingCarts.findById(parent.id);

                    console.log(shoppingcartVar);
                    if(!shoppingcartVar){
                        throw new Error("Shopping cart doesn't exist");
                    }
                    const val = await users.findById(shoppingcartVar.user);

                    return {
                        id: val._id,
                        name: val.name,
                        lastname: val.lastname,
                        username: val.username,
                        password: val.password,
                        active: val.active,
                        createAt: val.createAt
                      };
                }
            },
            products: {
                type: new GraphQLList(productType),
                resolve: async (parent) => {
                    const shoppingcart = await shoppingCarts.findById(parent.id);

                    if(!shoppingcart){
                        throw new Error("Shoppin cart doesn't exist");
                    }
                    return shoppingcart.products.map(val => {
                        const product = products.findById(val);
                        return product;
                    });
                }
            }
        }
    }
});

module.exports = {
    categoryType,
    productType,
    userType,
    shoppingcartType
}