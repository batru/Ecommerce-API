import express from 'express';
const router = express.Router();

import {
 stkPush,
 stkCallback
} from '../controllers/lipanaMpesa.js';
// import { protect, admin } from '../middleware/authMiddleWare.js';
import { safaricomToken} from '../utils/safaricomToken.js'

router.route('/stk/:orderId').post(safaricomToken, stkPush);

router.route('/callback').post(stkCallback);
export default router;
