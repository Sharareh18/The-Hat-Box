const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// find all categories 
router.get('/', async (req, res) => {
  try {
    const dbCategoryData = await Category.findAll({
      include: [
        {
          model: Product
        }
      ],
    });
    res.status(200).json(dbCategoryData);
  }
  catch (err) {
    res.status(400).json(err);
  };
});

// The `/api/categories/id` endpoint
// find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const dbCategoryData = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product
        }
      ],
    });
    if (!dbCategoryData) {
      res.status(404).json({ message: 'Could not find category with this ID' });
      return;
    }
    res.status(200).json(dbCategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// create a new category
router.post('/', async (req, res) => {
  try {
    const dbCategoryData = await Category.create(req.body);
    res.status(200).json(dbCategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const dbCategoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!dbCategoryData[0]) {
      res.status(404).json({ message: 'No category found with this ID' });
      return;
    }
    res.status(200).json(dbCategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const dbCategoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this ID' });
      return;
    }
    res.status(200).json(dbCategoryData);
  } catch (err) {
    res.status(400).json(err);
  };
});

module.exports = router;
