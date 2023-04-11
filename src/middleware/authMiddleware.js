import jwt from 'jsonwebtoken';

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return reject(err);
      resolve(user);
    });
  });
};

const auth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    //split the bearer token and get the [1] which is the token
    const token = req.headers.authorization.split(' ')[1];
    let user;
    try {
      //then call jwt to verify the token
      user = await verifyToken(token);

      //if token is valid then we will put the user retrieved from the token in the req object
      req.userId = user._id;

      //return next() - move to the next middleware
      return next();
    } catch (err) {
      //if token is invalid then we will throw an error
      res.status(401);
      throw new Error('authorization token is not provided or not valid.');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('authorization token is not provided or not valid!');
  }
};

export default auth;
