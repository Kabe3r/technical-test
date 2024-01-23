const CustomError = require('../errors');
const { isTokenValid } = require('../utils');

const authenticateUser = async (req, res, next) => {
      let token;
      
      const authHeader = req.headers.authorization;
      
      if (authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1];
      } else if (req.cookies.token) {
            token = req.signedCookies.token;
      }

      if (!token) {
            throw new CustomError.UnauthenticatedError('Authentication Invalid');
      }

      try {
            const { name, userId, role } = isTokenValid({ token });
            
            req.user = { name, userId, role };
            next();
      } catch (err) {
            console.log(err);
            throw new CustomError.UnauthenticatedError('Authentication Invalid')
      }
}

module.exports = {
      authenticateUser
}