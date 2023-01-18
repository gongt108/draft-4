const express = require('express');
const router = express.Router();

// Load Item model
const Item = require('../../models/Item');

// @route GET api/Items/test
// @description tests Items route
// @access Public
router.get('/test', (req, res) => res.send('Item route testing!'));

// @route GET api/Items
// @description Get all Items
// @access Public
router.get('/', (req, res) => {
  Item.find()
    .then(items => res.json(items))
    .catch(err => res.status(404).json({ noitemsfound: 'No Items found' }));
});

// @route GET api/Items/:id
// @description Get single Item by id
// @access Public
router.get('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => res.json(item))
    .catch(err => res.status(404).json({ noitemfound: 'No Item found' }));
});

// @route GET api/Items
// @description add/save Item
// @access Public
router.post('/', (req, res) => {
  Item.create(req.body)
    .then(item => res.json({ msg: 'Item added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this Item' }));
});

// @route GET api/Items/:id
// @description Update Item
// @access Public
router.put('/:id', (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body)
    .then(item => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/Items/:id
// @description Delete Item by id
// @access Public
router.delete('/:id', (req, res) => {
  Item.findByIdAndRemove(req.params.id, req.body)
    .then(item => res.json({ mgs: 'Item entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a Item' }));
});

module.exports = router;