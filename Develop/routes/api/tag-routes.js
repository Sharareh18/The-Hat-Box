const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Get all tags
// The `/api/tags` endpoint
router.get('/', async (req, res) => {
  try {
    const dbTagData = await Tag.findAll({
      include: [
        { 
          model: Product 
        }
      ],
    });
    res.status(200).json(dbTagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get tags by id
// The `/api/tags/id` endpoint
router.get('/:id', async (req, res) => {
  try {
    const dbTagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product
        }
      ],
    });
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag found with this ID' });
      return;
    }
    res.status(200).json(dbTagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create a new tag
// The `/api/tags` endpoint
router.post('/', async (req, res) => {
  try {
    const dbTagData = await Tag.create(req.body);
    res.status(200).json(dbTagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a tag's name by its `id` value
// The `api/tags/id` endpoint
router.put('/:id', async (req, res) => {
  try {
    const dbTagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!dbTagData[0]) {
      res.status(404).json({ message: 'No tag found with this ID' });
      return;
    }
    res.status(200).json(dbTagData);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

// Delete a tag by its id value
// The `api/tags/id` endpoint
router.delete('/:id', async (req, res) => {
  try {
    const dbTagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag found with this ID' });
      return;
    }
    res.status(200).json(dbTagData);
  }
  catch (err) {
    res.status(400).json(err);
  }
});



module.exports = router;
