import faker from 'faker';

import User from '../models/user.model.js';

const seedDb = async () => {
  console.log('Seeding database...');

  if ((await User.countDocuments({ role: 'ADMIN' })) === 0) {
    const adminUser = await User({
      provider: 'email',
      email: `admin@email.com`,
      password: '123456',
      name: faker.name.findName(),
      avatar: faker.image.avatar(),
      role: 'ADMIN',
    }).save();
  }

  if ((await User.countDocuments({ role: 'USER' })) === 0) {
    // create 3 users
    for (let index = 0; index < 3; index++) {
      const user = await User({
        provider: 'email',
        email: `user${index}@email.com`,
        password: '123456',
        name: faker.name.findName(),
        avatar: faker.image.avatar(),
        role: 'USER',
      }).save();
    }
  }
};

export default seedDb;
