const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      authProvider: "local",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      message: "Failed to register user",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user || !user.password) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Failed to login",
    });
  }
};

const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        message: "Google credential is required",
      });
    }

    if (!process.env.GOOGLE_CLIENT_ID) {
      console.error("GOOGLE_CLIENT_ID is not configured");

      return res.status(500).json({
        message: "Google authentication is not configured",
      });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (
      !payload ||
      !payload.sub ||
      !payload.email ||
      payload.email_verified !== true
    ) {
      return res.status(401).json({
        message: "Google account could not be verified",
      });
    }

    const googleId = payload.sub;
    const email = payload.email.trim().toLowerCase();
    const name = payload.name || email.split("@")[0];

    let user = await User.findOne({
      googleId,
    });

    if (!user) {
      user = await User.findOne({
        email,
      });

      if (user) {
        if (
          user.authProvider === "local" &&
          !payload.email_verified
        ) {
          return res.status(409).json({
            message: "Please verify your email before linking accounts",
          });
        }

        user.googleId = googleId;

        if (!user.authProvider) {
          user.authProvider = "google";
        }

        await user.save();
      } else {
        user = await User.create({
          name,
          email,
          googleId,
          authProvider: "google",
        });
      }
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Google login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Google login error:", error.message);

    res.status(401).json({
      message: "Google authentication failed",
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(
      req.user.userId
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Profile error:", error);

    res.status(500).json({
      message: "Failed to fetch profile",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  googleLogin,
  getProfile,
};