const graphql = require('graphql')
const {
    GraphQLNonNull,
    GraphQLString, 
    GraphQLBoolean 
} = graphql;

const UserType = require('../graphqlTypes/graphqltypes').userType;
const usersModel = require('../models/users');


module.exports = {
    adduser: {
        type: UserType,
        /* define the arguments that we should pass to the mutation
           here we require both book name and the author name 
           the id will be generated automatically 
        */
        args: {
            name: {
                type: new GraphQLNonNull(GraphQLString),
            },
            lastname: {
                type: new GraphQLNonNull(GraphQLString),
            },
            username: {
                type: new GraphQLNonNull(GraphQLString),
            },
            password: {
                type: new GraphQLNonNull(GraphQLString),
            }
        },
        resolve: async (root, args) => {

            const uModel = new usersModel(args);
            const newUser = await uModel.save();
            if (!newUser) {
                throw new Error("Error. Couldn't create a new user");
            }
            return newUser;
        }
    },
    updateuser: {
        type: UserType,
        args: {
            _id: {
                type: new GraphQLNonNull(GraphQLString)
            },
            name: {
                type: GraphQLString,
            },
            lastname: {
                type: GraphQLString,
            },
            username: {
                type: GraphQLString,
            },
            password: {
                type: GraphQLString,
            }
        },
        resolve: async (root, args) => {
            //const updatedCategory = await categoriesModel.findByIdAndDelete(args._id;
            const updatedUser = await usersModel.findByIdAndUpdate(args._id, args);
            if (!updatedUser) {
                throw new Error("Error. Couldn't update the user with id " + args._id);
            }
            return updatedUser;
        }
    },
    deleteuser: {
        type: UserType,
        args: {
            _id: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve: async (root, args) => {
            const removedUser = await usersModel.findByIdAndUpdate(args._id, {active: false})
            if (!removedUser) {
                throw new Error('error')
            }
            return removedUser;
        }
    }
}