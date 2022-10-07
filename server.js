const app = require('./app');
const mongoose = require('mongoose');

// DB Connection
const db = process.env.MONGODB_URI || 'mongodb+srv://quiz:quiz@cluster0.n1pwvkp.mongodb.net/quizapp?retryWrites=true&w=majority';

// Connect to MongoDB instance
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.log('MongoDB connection error: ' + err));

const port = process.env.PORT || 4002;

app.listen(port, () => console.log(`Server started on port: ${port}`));
