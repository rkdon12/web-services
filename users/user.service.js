const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

//init fetch all users
async function getAll() {
  const users = await db.User.findAll();
  return users;
}

//init fetch user via ID
async function getById(id){
  return await getUser(id);
}

//init create user
async function create(params){
  if (await db.User.findOne({ where: { email: params.email }})){
    throw 'Email "' + params.email +'" is already registered';
  }

  const user = new db.User(params);

  //hash password
  user.passwordHash = await bcrypt.hash(params.password, 10);

  //save user
  await user.save();
}

//init update of User details
async function update(id, params){
  const user = await getUser(id);

  //validate
  const usernameChanged = params.username && user.username !== params.username;
  if(usernameChanged && await db.User.findOne({ where: { username: params,username } })) {
    throw 'Username "' + params.username +'" is already taken';
  }

  //hash password if ut was  entered
  if(params.password){
    params.passwordHash = await bcrypt.hash(params.password, 10);
  }

  //copy params to user and save
  Object.assign(user, params);
  await user.save();
}

// init delete user
async function _delete(id){
  const user = await getUser(id);
  await user.destroy();
}

//helper function to find user vian // ID
async function getUser(id){
  const user = await db.User.findByPk(id);
  if(!user) throw 'User not found';
  return user;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};
