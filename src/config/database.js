const mongoose = require('mongoose')

module.exports = async () => {
  try {
    const {connection} = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB Connected...\nHost: ${connection.host}`);

  } catch (err) {
    console.log(err);
  }
};
