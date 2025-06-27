import Tag from "../models/tagModel.js";

// @desc    Get all tags
// @route   GET /api/tags
// @access  Public
export const getTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tags" });
  }
};

// @desc    Create a new tag
// @route   POST /api/tags
// @access  Public
export const createTag = async (req, res) => {
  try {
    const { name, slug } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Tag name is required" });
    }

    const tagSlug = slug ? slug : name.toLowerCase().replace(/\s+/g, "-");

    const newTag = new Tag({ name, slug: tagSlug });
    const savedTag = await newTag.save();
    res.status(201).json(savedTag);
  } catch (error) {
    res.status(500).json({ message: "Failed to create tag" });
  }
};

// @desc    Delete a tag
// @route   DELETE /api/tags/:id
// @access  Public
export const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByIdAndDelete(id);
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }
    res.json({ message: "Tag deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete tag" });
  }
};

// @desc    Update a tag
// @route   PUT /api/tags/:id
// @access  Public
export const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;

    const tagSlug = slug ? slug : name.toLowerCase().replace(/\s+/g, "-");

    const updatedTag = await Tag.findByIdAndUpdate(
      id,
      { name, slug: tagSlug },
      { new: true }
    );

    if (!updatedTag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    res.json(updatedTag);
  } catch (error) {
    res.status(500).json({ message: "Failed to update tag" });
  }
};