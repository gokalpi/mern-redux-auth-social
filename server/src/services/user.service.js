import User from '../models/user.model.js';

/**
 * Create a user
 * @param {Object} user
 * @returns {Promise<User>}
 */
export async function createUser(user) {
  try {
    const newUser = await User.create(user);
    return newUser;
  } catch (err) {
    throw err;
  }
}

/**
 * Delete user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
export async function deleteUser(id) {
  try {
    const deletedUser = await User.findByIdAndRemove(id);
    return deletedUser;
  } catch (err) {
    throw err;
  }
}

/**
 * Query for users
 * @param {number} page - Current page (default = 1)
 * @param {number} limit - Maximum number of results per page (default = 10)
 * @returns {Promise<User>[]}
 */
export async function getUsers(page = 1, limit = 10) {
  try {
    page = page > 0 ? page : 1;
    limit = limit > 0 ? limit : 10;

    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return users;
  } catch (err) {
    throw err;
  }
}

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
export async function getUser(id) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (err) {
    throw err;
  }
}

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
export async function getUserByEmail(email) {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (err) {
    throw err;
  }
}

/**
 * Get user by facebook id
 * @param {string} facebookId
 * @returns {Promise<User>}
 */
export async function getUserByFacebookId(facebookId) {
  try {
    const user = await User.findOne({ facebookId });
    return user;
  } catch (err) {
    throw err;
  }
}

/**
 * Get user by google id
 * @param {string} googleId
 * @returns {Promise<User>}
 */
export async function getUserByGoogleId(googleId) {
  try {
    const user = await User.findOne({ googleId });
    return user;
  } catch (err) {
    throw err;
  }
}

/**
 * Update user by id
 * @param {ObjectId} id
 * @param {Object} updatedUser
 * @returns {Promise<User>}
 */
export async function updateUser(id, updatedUser) {
  try {
    const existingUser = await User.findByIdAndUpdate(id, updatedUser);
    return existingUser;
  } catch (err) {
    throw err;
  }
}
