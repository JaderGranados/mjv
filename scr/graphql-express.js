const graphqlExpress = require('express-graphql');

module.exports = {
    useSchema: (app, url, schema) => {
        app.use(url, graphqlExpress({
            schema: schema,
            rootValue: global,
            graphiql: true
        }));
    }
};