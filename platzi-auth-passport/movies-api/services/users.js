const bcrypt = require("bcrypt");

const MongoLib = require("../lib/mongo");

class UsersService {
  constructor() {
    this.collection = "users";
    this.mongoDB = new MongoLib();
  }

  async getUser({ email }) {
    const [user] = await this.mongoDB.getAll(this.collection, { email });
    return user;
  }

  async createUser({ user: { name, email, password } }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const createUserId = await this.mongoDB.create(this.collection, {
      name,
      email,
      password: hashedPassword
    });

    return createUserId;
  }

  async getOrCreateUser({ user }) {
    const queriedUser = await this.getUser({ email: user.email });

    if (queriedUser) {
      return queriedUser;
    }

    await this.createUser({ user });

    return await this.getUser({ email: user.email });
  }
}

module.exports = UsersService;
