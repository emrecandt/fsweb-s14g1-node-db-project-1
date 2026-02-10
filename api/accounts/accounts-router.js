const router = require('express').Router();
const { checkAccountPayload, checkAccountId, checkAccountNameUnique } = require('./accounts-middleware');
const { getAll, getById, create, deleteById, updateById } = require("./accounts-model");
router.get('/', async (req, res, next) => {
  try {
    const accounts = await getAll();
    res.status(200).json(accounts);
  } catch (err) {
    next(err);
  }


})

router.get('/:id', checkAccountId, async (req, res, next) => {
  try {
    const account = await getById(req.params.id);
    res.status(200).json(account)
  } catch (err) {
    next(err)
  }

})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const [newest] = await create(req.body);
    const newAccount = await getById(newest);
    res.status(201).json(newAccount);


  } catch (err) {
    next(err);
  }

})

router.put('/:id', checkAccountPayload, checkAccountId, async (req, res, next) => {
  try {
    await updateById(req.params.id, req.body);
    const findAccount = await getById(req.params.id);
    res.status(200).json(findAccount);
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    const deleteAccount = await deleteById(req.params.id);
    res.status(200).json(deleteAccount);
  } catch (err) {
    next(err);
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message || "Sunucu hatası",
  });
})

module.exports = router;
