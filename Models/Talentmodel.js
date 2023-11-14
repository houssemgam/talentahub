import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const talentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skills: { type: String, required: true },
  experience: { type: String, required: true },
  approved: { type: Boolean, default: false }, // Champ pour suivre l'état d'approbation
  // Autres champs spécifiques aux talents
});

talentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

talentSchema.methods.comparePassword = async function (password) {
  const passwordMatch = await bcrypt.compare(password, this.password);
  const isTalent = this.role === 'talent';

  return passwordMatch && isTalent;
};

const Talent = mongoose.model('Talent', talentSchema);

export default Talent;