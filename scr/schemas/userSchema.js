const graphql = require('graphql')

const {
    GraphQLSchema,
    GraphQLObjectType
} = graphql;
const query = require('../queries/UserQueries');
const mutation = require('../mutations/UserMutations');

module.exports = new GraphQLSchema({
  query: query,
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: mutation
  })
});