import mongoose from 'mongoose';

import * as config from './index.js';
import seedDb from '../utils/seed.js';

const connectDB = () => {
  const opts = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  mongoose
    .connect(config.dbUrl, opts)
    .then(() => {
      console.log('DB connected...');

      // Seed database
      seedDb()
        .then(() => {
          console.log('DB seeded...');
        })
        .catch((err) => {
          console.log('Error in seeding DB', err);
        });
    })
    .catch((err) => console.log(`Fail to connect DB ${err}`));
};

export default connectDB;
