const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
  loginid: { type: String, default: 'sakura' },
  password: { type: String, default: '' },
});

const Login = mongoose.model('Login', schema);

// // Hash the default password value
const hashDefaultPassword = async () => {
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashedPassword = await bcrypt.hash('Aisu24', salt);
  await Login.findOneAndUpdate({ loginid: 'AisuId' }, { password: hashedPassword }, { upsert: true });
};

hashDefaultPassword();

module.exports = { Login };
