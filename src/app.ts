import express from 'express';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.routes';
import error from './middlewares/error.middleware';

const app = express();

app.use(express.json());
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use(error);

export default app;
