import Attribute from '../models/attributeModel.js';

// @desc    Get all attributes
// @route   GET /api/attributes
// @access  Public
export const getAttributes = async (req, res) => {
  try {
    const attributes = await Attribute.find();
    res.json(attributes);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Create a new attribute
// @route   POST /api/attributes
// @access  Public
export const createAttribute = async (req, res) => {
  try {
    const { name, values } = req.body;
    const newAttribute = new Attribute({ name, values });
    await newAttribute.save();
    res.status(201).json(newAttribute);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Delete an attribute
// @route   DELETE /api/attributes/:id
// @access  Public
export const deleteAttribute = async (req, res) => {
  try {
    const { id } = req.params;
    await Attribute.findByIdAndDelete(id);
    res.json({ message: 'Attribute deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Update an attribute
// @route   PUT /api/attributes/:id
// @access  Public
export const updateAttribute = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, values } = req.body;
    const updated = await Attribute.findByIdAndUpdate(
      id,
      { name, values },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Add values to an existing attribute
// @route   POST /api/attributes/:id/values
// @access  Public
export const addAttributeValue = async (req, res) => {
  try {
    const { id } = req.params;
    const { values } = req.body;

    const attribute = await Attribute.findById(id);
    if (!attribute) {
      console.log('Attribute not found');
      return res.status(404).json({ error: 'Attribute not found' });
    }

    const newValues = Array.from(new Set([...attribute.values, ...values]));
    attribute.values = newValues;
    await attribute.save();

    res.status(200).json(attribute);
  } catch (error) {
    console.error('Failed to add attribute values:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};