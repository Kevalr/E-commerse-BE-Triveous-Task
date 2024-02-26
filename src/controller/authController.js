const bcrypt = require("bcrypt");
const { createUser, getUserByEmail } = require("../services/authService");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    const user = await getUserByEmail(email);
    console.log("user -> ", user);
    if (user.rows?.length) {
      return res.json({ err: "Email Already Exists" });
    }

    const hashedpass = await bcrypt.hash(String(password), 10);

    const result = await createUser({ name, email, password: hashedpass });

    console.log("result ==> ", result);

    res.status(202).json({ success: true, msg: "User created successfully" });
  } catch (error) {
    console.log("error =>", error);
    res.status(500).json({
      message: "Error while signing up user",
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await getUserByEmail(email);

    if(result?.rowCount === 0) {
      return res.status(400).json({ err: "Username Or Password Is Incorrect" });
    }

    const validPassword = await bcrypt.compare(String(password), result.rows[0].password);
    
    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { userId: result.rows[0].id },
      process.env.JWT_SECRET || "12345678",
      { expiresIn: "1d" }
    );
    res.status(200).json({
      message: "User signed in Successfully",
      data: {
        token,
        user: {
          name: result.rows[0].name,
          email: result.rows[0].email,
      },
    }});

  } catch (error) {
    console.log("error =>", error);
    res.status(500).json({
      message: "Error while signing in user",
    });
  }
}

module.exports = { signUp, signIn };
