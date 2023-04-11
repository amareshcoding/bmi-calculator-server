import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    //check if user already exists or not
    const isUserExist = await User.findOne({ email: email });
    if (isUserExist)
      return res
        .status(400)
        .send('Email Already Exists, Try with another Email');

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    //new user with hashed password
    const newUser = new User({
      userName,
      email,
      password: passwordHash,
    });
    const savedUser = await newUser.save();

    //return the user credentials
    res.status(201).json({
      _id: savedUser._id,
      userName: savedUser.userName,
      email: savedUser.email,
      isDeleted: savedUser.isDeleted,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //find the user by given email
    const user = await User.findOne({ email: email, isDeleted: false });

    //if the user is not found return with error message
    if (!user) return res.status(400).json({ message: 'User does not exist!' });

    //check the given password with saved password
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched)
      return res.status(400).json({ message: 'Invalid credentials!' });

    //create a new token with user id
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    //return the user credentials and token
    res.status(200).json({
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        isDeleted: user.isDeleted,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const logout = async (req, res) => {
  //append a random value (or a random hashed number) to the the middle of the existing token
  //to make it harder for anyone to reverse it and obtain the previously valid token,
  try {
    let randomNumberToAppend = toString(Math.floor(Math.random() * 1000 + 1));
    let randomIndex = Math.floor(Math.random() * 10 + 1);
    let hashedRandomNumberToAppend = await bcrypt.hash(
      randomNumberToAppend,
      randomIndex
    );

    // now just concat the hashed random number to the end of the token
    req.token = req.token + hashedRandomNumberToAppend;
    return res.status(200).json('logout');
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const getProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    //find the user
    const user = await User.findOne({
      _id: userId,
      isDeleted: false,
    });

    res.status(200).json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      isDeleted: user.isDeleted,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export { register, login, logout, getProfile };
