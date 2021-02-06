const graphql = require('graphql')

const {
  GraphQLObjectType,
  GraphQLList
} = graphql;

const categoryModel = require('../models/categories');
const CategoryTypes = require('../graphqlTypes/graphqltypes').categoryType;
// Query
module.exports = new GraphQLObjectType({
  name: 'Query',
  fields:  ()=> {
    return {
      categories: {
        type: new GraphQLList(CategoryTypes),
        resolve:  async () => {
          const categories = await categoryModel.find({active: true});
          if (!categories) {
            throw new Error('error while fetching data');
          }
          return categories.map(val => {
            return {
              id: val._id,
              name: val.name,
              description: val.description,
              active: val.active,
              createAt: val.createAt
            }
          });
        }
      },
      allCategories:{
        type: new GraphQLList(CategoryTypes),
        resolve: async () => {
          const categories = await categoryModel.find();
          if (!categories) {
            throw new Error('error while fetching data');
          }
          return categories.map(val => {
            return {
              id: val._id,
              name: val.name,
              description: val.description,
              active: val.active,
              createAt: val.createAt
            }
          });
        }
      }
    }
  }
})