// backend/routes/tagRoutes.js
import express from 'express';
import {
  getTags,
  createTag,
  updateTag,
  deleteTag,
} from '../controllers/tagController.js';

const router = express.Router();

router.get('/', getTags);
router.post('/', createTag);
router.put('/:id', updateTag);
router.delete('/:id', deleteTag);

export default router;