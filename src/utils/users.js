const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "..", "..", "data", "users.json");
const usersDirectoryPath = path.dirname(usersFilePath);

function ensureUsersFileExists() {
  if (!fs.existsSync(usersDirectoryPath)) {
    fs.mkdirSync(usersDirectoryPath, { recursive: true });
  }

  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, "{}", "utf8");
  }
}

function loadUsers() {
  ensureUsersFileExists();

  const rawData = fs.readFileSync(usersFilePath, "utf8");

  if (!rawData.trim()) {
    return {};
  }

  return JSON.parse(rawData);
}

function saveUsers(users) {
  ensureUsersFileExists();
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf8");
}

module.exports = {
  loadUsers,
  saveUsers,
};