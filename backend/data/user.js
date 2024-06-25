// backend/data/user.js
const { v4: generateId } = require("uuid");
const { NotFoundError } = require("../util/errors");
const { readData, writeData } = require("./util");

async function add(data) {
  const storedData = await readData();
  const userId = generateId();
  if (!storedData.users) {
    storedData.users = [];
  }
  storedData.users.push({ ...data, id: userId });
  await writeData(storedData);
  return { id: userId, email: data.email.toLowerCase(), name: data.name };
}

async function get(email) {
  const storedData = await readData();
  if (!storedData.users || storedData.users.length === 0) {
    throw new NotFoundError("Could not find any users.");
  }

  const user = storedData.users.find(
    (user) => user.email === email.toLowerCase()
  );
  if (!user) {
    throw new NotFoundError("Could not find user for email " + email);
  }

  return user;
}

exports.add = add;
exports.get = get;
