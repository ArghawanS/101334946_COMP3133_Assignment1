const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });
const app = require(`${__dirname}/typeDefs`);
const mongoose = require("mongoose");
const { graphqlHTTP } = require('express-graphql');
const express = require('express');

// DB Connection
const DB = `mongodb+srv://Assignment-1:VWi8eWZL73T7e2Ns@cluster0.jsbnmvo.mongodb.net/?retryWrites=true&w=majority`;
mongoose.set('strictQuery', true); 
mongoose.connect(DB).then(() => {
    console.log("DB has been successfully connected");
});



const app1 = express();
app1.use('/graphql', graphqlHTTP({
  graphiql: true
}));



const port = process.env.PORT || 9000;
app.listen(port, () => {
   
  console.log(`🚀 Server ready at http://localhost:${port}`)


});

