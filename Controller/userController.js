import User from '../Models/Usermodel.js';
import createError from 'http-errors';
import bcrypt from 'bcrypt';

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(createError(404, 'Utilisateur non trouvé avec cet ID'));
    }

    res.json({
      status: 'success',
      results: user
    });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    // Vérification si l'utilisateur met à jour son propre profil
    if (req.user._id === req.params.id) {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });

      if (!user) {
        return next(createError(404, 'Utilisateur non trouvé avec cet ID'));
      }

      res.json({
        status: 'success',
        user
      });
    } else {
      throw createError(401, 'Non autorisé');
    }
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    // Vérification si l'utilisateur supprime son propre profil
    if (req.user._id === req.params.id) {
      const deletedUser = await User.findByIdAndDelete(req.params.id);

      if (!deletedUser) {
        return next(createError(404, 'Utilisateur non trouvé avec cet ID'));
      }

      res.status(204).json({
        status: 'success'
      });
    } else {
      throw createError(401, 'Non autorisé');
    }
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    if (req.user.role !== req.params.role) {
      return res.status(401).send('Non autorisé');
    }

    // Reste du code
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
    try {
      const { token, password } = req.body;
  
      // Recherchez l'utilisateur avec le jeton de réinitialisation
      const user = await User.findOne({ resetPasswordToken: token });
  
      // Vérifiez si l'utilisateur existe et si le jeton n'a pas expiré
      if (!user || user.resetPasswordExpires < Date.now()) {
        return res.status(400).json({ message: 'Le jeton de réinitialisation est invalide ou a expiré.' });
      }
  
      // Générez un nouveau sel et hachez le nouveau mot de passe
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Mettez à jour le mot de passe de l'utilisateur
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
  
      return res.status(200).json({ message: 'Le mot de passe a été réinitialisé avec succès.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Une erreur s\'est produite lors de la réinitialisation du mot de passe.' });
    }
  };
  
