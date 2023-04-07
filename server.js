const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/.env` });
const app = require(`${__dirname}/typeDefs`);
const mongoose = require("mongoose");
const { graphqlHTTP } = require('express-graphql');
const express = require('express');
const PORT = process.env.PORT || 3000
//const app = express()
// DB Connection
//const DB = `mongodb+srv://Assignment-1:VWi8eWZL73T7e2Ns@cluster0.jsbnmvo.mongodb.net/?retryWrites=true&w=majority`;
//mongoose.set('strictQuery', true); 
//mongoose.connect(DB).then(() => {
   // console.log("DB has been successfully connected");
//});

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

const app1 = express();
app1.use('/graphql', graphqlHTTP({
  graphiql: true
}));

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests");
  })
});
/*
connectDB().then(() =>{ })

const port = process.env.PORT || 9000;
app.listen(port, () => {
   
  console.log(`🚀 Server ready at http://localhost:${port}`)


});
*/
