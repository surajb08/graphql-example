import { GraphQLID, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLInt } from "graphql";

const _ = require('lodash');

const Book = require('../models/book')
const Author = require('../models/author')



const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name : {type: GraphQLString},
        genre : {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent,args){    
                return Author.findById(parent.author)
            }
        }
    })
});


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name : {type: GraphQLString},
        age : {type: GraphQLInt},
        books : {
            type : new GraphQLList(BookType),
            resolve(parent,args){
                return Book.find({author:parent.id})
            }
        }
    })
});



const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id:{type:GraphQLID}},
            resolve(parent, args){
                return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type:GraphQLID}},
            resolve(parent,args){
                return Author.findById(args.id)
            }
        },
        
        books:{
            type: GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({});
            }
        },
        
        authors:{
            type: GraphQLList(AuthorType),
            resolve(parent, args){
                return Author.find({});
            }
        }
    }
});


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addAuthor:{
            type: AuthorType,
            args: {
                name: {type:new GraphQLNonNull(GraphQLString)},
                age: {type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                let author = Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook:{
            type: BookType,
            args: {
                name: {type:new GraphQLNonNull(GraphQLString)},
                genre: {type:new GraphQLNonNull(GraphQLString)},
                author: {type:new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let book = Book({
                    name: args.name,
                    genre: args.genre,
                    author: args.author
                });
                return book.save();
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});


// var books = [
//     {name: 'Name of the Wind', genre:'Fantacy', id:'1', author:'1'},
//     {name: 'The Long Earth', genre:'Sci-Fi', id:'2', author:'3'},
//     {name: 'The third Empire', genre:'History', id:'3', author:'2'},
//     {name: 'Name of the Wind', genre:'Fantacy', id:'4', author:'1'},
//     {name: 'Somthing on the Earth', genre:'Sci-Fi', id:'2', author:'3'},
//     {name: 'Fire stored in heart', genre:'History', id:'3', author:'2'}
// ]


// var authors =[
//     {name: 'Patrick Rothfuss', age: 44, id:'1'},
//     {name: 'Brandon Sanderson', age: 42, id:'2'},
//     {name: 'Terry Pratchett', age: 66, id:'3'},
// ]