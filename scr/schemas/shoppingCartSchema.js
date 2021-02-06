const graphql = require('graphql')

const {
    GraphQLSchema,
    GraphQLObjectType
} = graphql;
const query = require('../queries/ShoppingCartQueries');
const mutation = require('../mutations/ShoppingCartMutations');

module.exports = new GraphQLSchema({
  query: query,
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: mutation
  })
});