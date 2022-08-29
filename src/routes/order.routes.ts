import { Router } from 'express';
import orderController from '../controllers/order.controller';
import authentication from '../middlewares/auth.middleware';

const router = Router();

router.get('/', orderController.getAll);
router.post('/', authentication, orderController.create);

export default router;
