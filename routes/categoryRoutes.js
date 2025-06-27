import express from 'express';
import { getCategories, createCategory, deleteCategory, updateCategory } from '../controllers/categoryController.js';
import { upload } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', upload.single('image'), createCategory);
router.put('/:id', upload.single('image'), updateCategory);
router.delete('/:id', deleteCategory);

export default router;