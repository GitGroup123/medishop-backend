import Category from '../models/categoryModel.js';

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);

    const { name, slug: providedSlug } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const slug = providedSlug || name.toLowerCase().replace(/\s+/g, '-');

    const existing = await Category.findOne({ name });
    if (existing) return res.status(400).json({ error: 'Category already exists' });

    const image = req.file ? `/uploads/categories/${req.file.filename}` : null;

    const category = new Category({ name, slug, image });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deleted = await Category.findByIdAndDelete(categoryId);

    if (!deleted) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ message: 'Server error while deleting category' });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name, slug } = req.body;
    const image = req.file ? `categories/${req.file.filename}` : undefined;

    const updatedFields = { name, slug };
    if (image) updatedFields.image = image;

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updatedFields,
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(updatedCategory);
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ message: 'Server error while updating category' });
  }
};

