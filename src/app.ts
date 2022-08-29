import express from 'express';
import loginRoutes from './routes/login.routes';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.routes';
import orderRoutes from './routes/order.routes';
import error from './middlewares/error.middleware';

const app = express();

app.use(express.json());
app.use('/login', loginRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use(error);

export default app;
