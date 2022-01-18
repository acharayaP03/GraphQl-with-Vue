const { ApolloServer, gql } = require('apollo-server');

const todos = [
    { 
        task: "Wash my car.",
        completed: false
    },
    {
        task: "Buy work shoes",
        completed: false
    }
]

/**
 * create a typedefs for apolloserver
 */
const typeDefs = gql`
    type Todo {
        task: String
        completed: Boolean
    }

    type Query {
        todos: [Todo]
    }
`
const server = new ApolloServer({
    typeDefs
});

server.listen().then(({ url }) =>{
    console.log( url)
})