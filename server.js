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

    type Mutation {
        addTodo(task: String, completed: Boolean): Todo
    }
`
/**
 * @resolver returns the root query that we define on gql typeDefs
 */

 const resolvers = {
    Query: {
        todos: function() {
            return todos
        }
    },
    Mutation: {
        addTodo: (_, args) => {
            const todo = { task: args.task, completed: args.completed}
            todos.push(todo)
            return todo;
        }
    }
}

const server = new ApolloServer({
    typeDefs, resolvers
});




server.listen().then(({ url }) =>{
    console.log( url)
})