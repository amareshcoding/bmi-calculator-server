import mongoose from 'mongoose';

//connecting to mongodb server
mongoose.set('strictQuery', false);
const mongoConnect = async () => {
  return mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default mongoConnect;
