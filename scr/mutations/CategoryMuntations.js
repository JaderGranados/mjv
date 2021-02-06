const graphql = require('graphql')
const {
    GraphQLNonNull,
    GraphQLString, 
    GraphQLBoolean 
} = graphql;

const CategoryType = require('../graphqlTypes/graphqltypes').categoryType;
const categoriesModel = require('../models/categories');


module.exports = {
    addcategory: {
        type: CategoryType,
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
            }
        },
        resolve: async (root, args) => {

            const uModel = new categoriesModel(args);
            const newCategory = await uModel.save();
            if (!newCategory) {
                throw new Error("Error. Couldn't create a new category");
            }
            return newCategory;
        }
    },
    updatecategory: {
        type: CategoryType,
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
            }
        },
        resolve: async (root, args) => {
            //const updatedCategory = await categoriesModel.findByIdAndDelete(args._id;
            const updatedCategory = await categoriesModel.findByIdAndUpdate(args._id, args);
            if (!updatedCategory) {
                throw new Error("Error. Couldn't update the category with id " + args._id);
            }
            return updatedCategory;
        }
    },
    deletecategory: {
        type: CategoryType,
        args: {
            _id: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve: async (root, args) => {
            const removedCategory = await categoriesModel.findByIdAndUpdate(args._id, {active: false})
            if (!removedCategory) {
                throw new Error('error')
            }
            return removedCategory;
        }
    }
}