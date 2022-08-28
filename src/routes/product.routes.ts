import { Router } from 'express';
import productController from '../controllers/product.controller';

const route = Router();

route.get('/', productController.getAll);
route.post('/', productController.create);

export default route;
