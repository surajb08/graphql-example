const Express = require("express");
const ExpressGraphQL = require("express-graphql");
const Mongoose = require("mongoose");
const schema = require('./schema/schema')

// const {
//     GraphQLID,
//     GraphQLString,
//     GraphQLList,
//     GraphQLNonNull,
//     GraphQLObjectType,
//     GraphQLSchema
// } = require("graphql");

var app = Express();

Mongoose.connect('mongodb+srv://readwrite:readwritepassword@mongo-cluster-60jyo.mongodb.net/test?retryWrites=true&w=majority')
Mongoose.connection.once('open', ()=>{
    console.log('MongoDB Atlas Connected');
    
})

app.use('/graphql', ExpressGraphQL({
    schema,
    graphiql: true
}));




app.listen(4000, ()=>{
    console.log("Listening on 4000");
    
    
})