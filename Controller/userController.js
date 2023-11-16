import User from '../Models/Usermodel.js';
import createError from 'http-errors';
import bcrypt from 'bcrypt';




export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(createError(404, 'Utilisateur non trouvé avec cet ID'));
    }

    // Vérification du rôle de l'utilisateur
    if (req.user && req.user._id && req.user._id.toString() === req.params.id) {
      // Vérification du rôle de l'utilisateur
      if (req.user.role === 'admin') {
        // Si l'utilisateur est un administrateur, il peut accéder à tous les profils
        res.json({
          status: 'success',
          results: user
        });
      } else {
        // Si l'utilisateur n'est pas un administrateur, il ne peut accéder qu'à son propre profil
        res.json({
          status: 'success',
          results: {
            _id: user._id,
            username: user.username,
            email: user.email
            // Ajoutez d'autres propriétés spécifiques au profil que vous souhaitez afficher
          }
        });
      }
    } else {
      throw createError(401, 'Non autorisé');
    }
  } catch (err) {
    next(err);
  }
};



export const updateUser = async (req, res, next) => {
  try {
    // Vérification si l'utilisateur est authentifié et si l'objet req.user est défini
    if (req.user && req.user._id.toString() === req.params.id) {
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
    // Vérification si l'utilisateur supprime son propre profil ou s'il a le rôle d'administrateur
    if ((req.user && req.user._id === req.params.id) || (req.user && req.user.role === 'admin')) {
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
    // Vérification si l'utilisateur est authentifié et si l'objet req.user est défini
    if (req.user && req.user._id === req.params.id) {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

      if (!updatedUser) {
        throw createError(404, 'Utilisateur non trouvé avec cet ID');
      }

      res.status(200).json({
        status: 'success',
        data: updatedUser
      });
    } else {
      throw createError(401, 'Non autorisé');
    }
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

    // Vérification si l'utilisateur met à jour son propre mot de passe
    if (req.user._id === user._id) {
      // Générez un nouveau sel et hachez le nouveau mot de passe
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Mettez à jour le mot de passe de l'utilisateur
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      return res.status(200).json({ message: 'Le mot de passe a été réinitialisé avec succès.' });
    } else {
      throw createError(401, 'Non autorisé');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Une erreur s\'est produite lors de la réinitialisation du mot de passe.' });
  }
};
