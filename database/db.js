const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(
      `Database connected successfully at ${connect.connection.host}`
    );
  } catch (error) {
    console.log(`Database connection error`, error);
    process.exit(1);
  }
};

module.exports = connectToDb;
