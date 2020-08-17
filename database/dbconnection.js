const mongoose = require('mongoose');

module.exports = {
  connect: () => connect(),
  mongoType: () => mongoose.Types,
};

async function connect() {
  const atlasUri =
  'mongodb+srv://springrain:springrain123@springraintest.xjg4k.mongodb.net/springraintest02?retryWrites=true&w=majority'
  if (mongoose.connection.readyState === 0) {
    return await mongoose.connect(atlasUri, {
      useNewUrlParser: true,
      keepAlive: false,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  } else return true;
}
