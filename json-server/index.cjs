const fs = require("fs");
const path = require("path");

const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, "db.json"));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

server.use(async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, 1000);
  });

  next();
});

server.post("/users?sign-up", (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    const db = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8")
    );

    const { users = [] } = db;

    const candidate = users.find(
      (user) => user.email === email && user.password === password
    );

    if (candidate) {
      return res.status(409).json({ message: "Such a user already exists." });
    }

    const user = {
      id: Date.now().toString(),
      firstName,
      lastName,
      username,
      email,
      password,
    };

    users.push(user);

    fs.writeFileSync(path.resolve(__dirname, "db.json"), JSON.stringify(db));

    return res.json(user);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});

server.post("/user/sign-in", (req, res) => {
  try {
    const { email, password } = req.body;

    const db = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8")
    );

    const { users = [] } = db;

    const userFromBd = users.find(
      (user) => user.email === email && user.password === password
    );

    if (userFromBd) {
      return res.json(userFromBd);
    }

    return res.status(403).json({ message: "Incorrect e-mail or password." });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});

server.post("/user/sign-out", (req, res) => {
  return res.json({ message: "You have logged out of your account." });
});

server.use(router);

server.listen(8000, () => {
  console.log("server is running on 8000 port");
});
