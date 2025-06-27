import express from 'express';
import {
  getAttributes,
  createAttribute,
  deleteAttribute,
  updateAttribute,
  addAttributeValue,
} from '../controllers/attributeController.js';

const router = express.Router();

router.get('/', getAttributes);
router.post('/', createAttribute);
router.post('/:id/values', addAttributeValue);
router.put('/:id', updateAttribute);
router.delete('/:id', deleteAttribute);

export default router;