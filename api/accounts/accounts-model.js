const db = require("../../data/db-config")


const getAll = () => {
  // KODLAR BURAYA
  return db("accounts");
}

const getById = id => {
   return db("accounts")
    .where({ id })
    .first();
  // select("id") kolon where({id}) satır fist tek bir nesne
}

const create = account => {
  return db("accounts").insert(account);
  // KODLAR BURAYA
}

const updateById = async (id, account) => {
  
  const updatedAcount = await db("accounts")
    .where({ id })
    .update(account);

  if (!updatedAcount) return null;

  return getById(id);
}

const deleteById = async (id) => {
  const account = await getById(id);
  if(!account) return null;
  await db('accounts').where('id', id).delete();
  return account;

}

const getByName = async(checkName)=>{
  return db("accounts")
    .where({ name: checkName })
    .first();
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getByName
}
