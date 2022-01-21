const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const fs = require('fs')
const path = require('path');


/**
 * Read typeDefs.gql
 */

const filePath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(filePath, 'utf-8')
const resolvers = require('./resolvers');


/**
 * @dotenv import dotenv for environment variables
 * @import Mongoose models
 */
require('dotenv').config({ path: '.env'});
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

/**
 * Create apollo serve with typedefs, reslovers and context
 * use models that was created to apollo server in @context 
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