import User from '../Models/Usermodel.js';
import createError from 'http-errors';

export const createUser = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      throw createError(401, "Accès réservé à l'administrateur");
    }

    const newUser = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(createError(404, 'Utilisateur non trouvé avec cet identifiant'));
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
    if (req.user._id === req.params.id && req.user.role === 'admin') {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });

      if (!user) {
        return next(createError(404, 'Utilisateur non trouvé avec cet identifiant'));
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
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return next(createError(404, 'Utilisateur non trouvé avec cet identifiant'));
    }

    res.status(204).json({
      status: 'success'
    });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    // Vérification si l'admin met à jour son propre profil
    if (req.user.role === 'admin' && req.user._id === req.params.id) {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });

      if (!user) {
        return next(createError(404, 'Utilisateur non trouvé avec cet identifiant'));
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

