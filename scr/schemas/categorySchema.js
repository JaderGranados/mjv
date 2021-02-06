const graphql = require('graphql')

const {
    GraphQLSchema,
    GraphQLObjectType
} = graphql;
const query = require('../queries/CategoryQueries');
const mutation = require('../mutations/CategoryMuntations');

module.exports = new GraphQLSchema({
  query: query,
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: mutation
  })
});