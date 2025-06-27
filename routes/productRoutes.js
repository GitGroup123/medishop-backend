import express from 'express';
import { getProducts, createProduct, deleteProduct, getProductById, updateProduct, getAllProducts } from '../controllers/productController.js';
import { productImageUpload } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.get('/products', getProducts);
router.post('/products', productImageUpload, createProduct);

router.get('/products/:id', getProductById);
router.put('/products/:id', productImageUpload, updateProduct);

router.delete('/products/:id', deleteProduct);
router.get('/allproducts/:id', getAllProducts);

export default router;