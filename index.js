const express = require('express')
const { graphqlHTTP } = require('express-graphql');
var data = require('./data')

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLFloat
} = require('graphql')
const app = express()

const authors = data.authors();
const books = data.books();
const students = data.students();
const colleges = data.colleges();

// Object Types
const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'This represents a book written by an author',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type:new GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve: (book) => {
        return authors.find(author => author.id === book.authorId)
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This represents a author of a book',
  fields: () => ({
    id: { type:new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    books: {
      type: new GraphQLList(BookType),
      resolve: (author) => {
        return books.filter(book => book.authorId === author.id)
      }
    }
  })
})

const StudentType = new GraphQLObjectType({
  name: 'Student',
  description: 'This represents a Students in the university.',
  fields: () => ({
    id: { type:new GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLString },
    email: { type:new GraphQLNonNull(GraphQLString) },
    collegeId: { type:new GraphQLNonNull(GraphQLString) },
    college: {
      type: CollegeType,
      resolve: (student) => {
        return colleges.find(college => college.id === student.collegeId)
      }
    }
  })
})

const CollegeType = new GraphQLObjectType({
  name: 'College',
  description: 'This represents a College in the university.',
  fields: () => ({
    id: { type:new GraphQLNonNull(GraphQLString) },
    name: { type:GraphQLString },
    rating: { type:new GraphQLNonNull(GraphQLFloat) },
    term: { type:new GraphQLNonNull(GraphQLInt) },
    students: {
      type: new GraphQLList(StudentType),
      resolve: (college) => {
        return students.filter(student => student.collegeId === college.id)
      }
    }
  })
})

/////     QUERY
const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    book: {
      type: BookType,
      description: 'A Single Book',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => books.find(book => book.id === args.id)
    }, 
    books: { 
      type: new GraphQLList(BookType),
      description: 'List of All Books',
      resolve: () => books 
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: 'List of All Authors',
      resolve: () => authors
    },
    author: {
      type: AuthorType,
      description: 'A Single Author',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => authors.find(author => author.id === args.id)
    },
    students: {
      type: new GraphQLList(StudentType),
      description: 'List of All Students',
      resolve: () => students
    },
    student: {
      type: StudentType,
      description: 'A Single Student',
      args: {
        id: { type: GraphQLString },
      },
      resolve: (parent, args) =>  students.find(student => student.id === args.id) 
      
    },
    colleges: {
      type: new GraphQLList(CollegeType),
      description: 'List of All Colleges',
      resolve: () => colleges
    },
    college: {
      type: CollegeType,
      description: 'A Single College',
      args: {
        id:{type:GraphQLString}
      },
      resolve: (parent, args) =>colleges.find(college => college.id === args.id)
    }

  })
})

//TODO: Make a new Mutation
/////     MUTATION
const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addBook: {
      type: BookType,
      description: 'Add a book',
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => {
        const book = { id: books.length + 1, name: args.name, authorId: args.authorId }
        books.push(book)
        return book
      }
    },
    addAuthor: {
      type: AuthorType,
      description: 'Add an author',
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => {
        const author = { id: authors.length + 1, name: args.name }
        authors.push(author)
        return author
      }
    }
    ,
    addStudent: {
      type: StudentType,
      description: 'Add a new student',
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        collegeId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        let id = students[students.length - 1].id; //"ETS101/11" 
        let idString = id.split("ETS")[1];
        let ids = idString.split("/")[0];
        let lastId = parseInt(ids) + 1;
        const ID = `ETS${lastId}/11`;
        const student = { id: ID, name: args.name, email: args.email, collegeId: args.collegeId };
        students.push(student);
        return student;

      }
    },
    addCollege: {
      type: CollegeType,
      description: 'Add a new College ',
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        rating: { type: new GraphQLNonNull(GraphQLFloat) },
        term: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) =>{
        const college = { id: args.id, name: args.name, rating: args.rating, term: args.term };
        colleges.push(college);
        return college;
      }
    }
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true   
}))

app.listen(3000, () =>
  console.log('✌️ Server Running at http://localhost:3000/graphql')
);