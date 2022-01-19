const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');

/**
 * @dotenv import dotenv for environment variables
 */
require('dotenv').config({ path: '.env'});
/**
 * Import models here
 */

const User = require('./models/User');
const Post = require('./models/Post');

/**
 * @mongodb connections here , 
 * @note characters like [ ], # and others needs to be escapped. below is a proper way of connecting to mongo db
 * see more on mongo atlas documentation for errors.
 */

mongoose
    .connect(
        process.env.MONGO_URI, 
        {
            user: process.env.MONGODB_USER,
            pass: process.env.MONGODB_PASSWORD,
            useNewUrlParser: true
        }
    )
    .then(() => console.log("Mongo DB successfully connected"))
    .catch(err => console.log(err))

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
        addTodo: (_, { task, completed}) => {
            const todo = { task, completed }
            todos.push(todo)
            return todo;
        }
    }
}

/**
 * use models that was created to apollo server in @constext 
 */
const server = new ApolloServer({
    typeDefs, resolvers,
    context:{
        User,
        Post
    }
});




server.listen().then(({ url }) =>{
    console.log( url)
})