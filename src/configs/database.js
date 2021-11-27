import { connect } from 'mongoose';

const initDbConnection = () => {
  connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to Mongo Database'))
    .catch((err) => console.log(err));
};

export default initDbConnection;
