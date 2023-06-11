import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';

// middleware
import errorHandlerMiddleware from './middleware/error-handler';
import notFoundMiddleware from './middleware/not-found';

// security packages
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

import cookieParser from 'cookie-parser';

// DB and authenticate user
import connectDB from './db/connect';

// router
import companyRouter from './routes/companyRoutes'

app.use(express.json());
app.use(cookieParser());

app.use(helmet());
app.use(mongoSanitize());

app.use('/api/company', companyRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
