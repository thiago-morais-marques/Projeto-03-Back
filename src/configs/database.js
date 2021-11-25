import { connect } from 'mongoose';

const initDbConnection = () => {
  connect(process.env.MONGODB_URI) //colocar URL localhost
    .then(() => console.log('Connected to Mongo Database'))
    .catch((err) => console.log(err));
};

export default initDbConnection;
