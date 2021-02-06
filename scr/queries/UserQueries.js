const graphql = require('graphql')

const {
  GraphQLObjectType,
  GraphQLList
} = graphql;

const userModel = require('../models/users');
const UserType = require('../graphqlTypes/graphqltypes').userType;
// Query
module.exports = new GraphQLObjectType({
  name: 'Query',
  fields:  ()=> {
    return {
      users: {
        type: new GraphQLList(UserType),
        resolve:  async () => {
          const users = await userModel.find({active: true});
          if (!users) {
            throw new Error('error while fetching data');
          }
          return users.map(val => {
            return {
              id: val._id,
              name: val.name,
              lastname: val.lastname,
              username: val.username,
              password: val.password,
              active: val.active,
              createAt: val.createAt
            }
          });
        }
      },
      allUsers:{
        type: new GraphQLList(UserType),
        resolve: async () => {
          const users = await userModel.find();
          if (!users) {
            throw new Error('error while fetching data');
          }
          return users.map(val => {
            return {
                id: val._id,
                name: val.name,
                lastname: val.lastname,
                username: val.username,
                password: val.password,
                active: val.active,
                createAt: val.createAt
            }
          });
        }
      }
    }
  }
})