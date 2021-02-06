const graphql = require('graphql')

const {
    GraphQLSchema,
    GraphQLObjectType
} = graphql;
const query = require('../queries/ProductQueries');
const mutation = require('../mutations/ProductMutations');

module.exports = new GraphQLSchema({
  query: query,
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: mutation
  })
});