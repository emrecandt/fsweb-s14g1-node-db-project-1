const { getById, getByName } = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  // KODLAR BURAYA
  // Not: Validasyon için Yup(şu an yüklü değil!) kullanabilirsiniz veya kendiniz manuel yazabilirsiniz.
const {budget, name} = req.body;
const numBudget = Number(budget);
req.body.budget = numBudget;

if (name === undefined || budget === undefined) {
    return res.status(400).json({
      message: "name and budget are required",
    });
  }

const trimmedName = name.trim();
req.body.name = trimmedName; 

if (trimmedName.length < 3 || trimmedName.length > 100) {
  return res.status(400).json({message: "name of account must be between 3 and 100"});
}

if (Number.isNaN(numBudget) || typeof budget!=="number") {
  return res.status(400).json({message: "budget of account must be a number"});
}

if (numBudget < 0 || numBudget > 1000000) {
  return res.status(400).json({message: "budget of account is too large or too small"});
}

next();
  



}

exports.checkAccountNameUnique = async(req, res, next) => {
  const {name} = req.body;
  const trimName = name.trim();
  const checkAcc = await getByName(trimName);
  if(checkAcc) return res.status(400).json({message: "that name is taken" });
  next();
}

exports.checkAccountId = async (req, res, next) => {
  const checkId  = await getById(req.params.id);
  if(!checkId) {return res.status(404).json({message: "account not found"})}else{
    next();
  }
}

