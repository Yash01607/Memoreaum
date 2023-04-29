import jwt from 'jsonwebtoken';

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const isJWTAuth = token.length < 500;

    let decodedData;

    if (token && isJWTAuth) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};
