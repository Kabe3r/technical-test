const jwt = require('jsonwebtoken');

const createJWT = ({ payload }) => {
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '10d'
      });
      return token;
}

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);


const attachCookiesToResponse = ({ res, user }) => {
      const token = createJWT({ payload: user });

      // console.log(token)

      const oneDay = 1000 * 60 * 60 * 24;

      res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'development',
            signed: true,
            expires: new Date(Date.now() + oneDay)
      });

      return token;

}

module.exports = {
      createJWT,
      isTokenValid,
      attachCookiesToResponse
}