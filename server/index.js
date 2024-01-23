require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
const xss = require('xss-clean');
const cors = require('cors');

// database
const connectDB = require('./db/connect');

// routers
const authRouter = require('./routes/authRoutes');
const projectRouter = require('./routes/projectRoutes');

// middleware
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');


app.use(cors());
app.use(xss());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static('./public'));
app.use(fileupload());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/projects', projectRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
      try {
            await connectDB(process.env.MONGO_URL)
            app.listen(port, () => console.log(`Server is listening on port ${port}`)) 
      } catch (err) {
            console.log(err);
      }
}
// http://localhost:3000/api/v1/projects/add
start();