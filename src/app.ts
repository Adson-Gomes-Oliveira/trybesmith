import express from 'express';
import productRoutes from './routes/product.routes';
import error from './middlewares/errorMiddleware';
import 'express-async-errors';

const app = express();

app.use(express.json());
app.use('/products', productRoutes);
app.use(error);

export default app;
