import User from '../Models/Usermodel.js';
import Talent from '../Models/Talentmodel.js';
import createError from 'http-errors';

export const createUser = async (req, res, next) => {
  try {
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
    // Checking if the user is updating their own profile
    if (req.user._id === req.params.id) {
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

export const authenticateUser = (req, res, next) => {
  // Vérifiez ici si l'utilisateur est authentifié et s'il a le rôle d'administrateur
  // Vous pouvez utiliser des mécanismes d'authentification tels que JWT, sessions, ou tout autre mécanisme de votre choix

  if (req.user && req.user.role === 'admin') {
    // L'utilisateur est authentifié et est un administrateur
    next();
  } else {
    // L'utilisateur n'est pas authentifié ou n'a pas le rôle d'administrateur
    return res.status(401).json({ message: 'Non autorisé' });
  }
};

export const approveTalent = async (req, res, next) => {
  try {
    const { talentId } = req.params;

    // Vérifiez si l'utilisateur est un administrateur en appelant la fonction d'authentification
    authenticateUser(req, res, async () => { // Ajoutez le mot-clé async ici
      // Mettez à jour le champ "approved" dans le modèle Talent pour le talent correspondant
      const talent = await Talent.findByIdAndUpdate(talentId, { approved: true });

      if (!talent) {
        return next(createError(404, 'Talent non trouvé avec cet identifiant'));
      }

      res.json({
        status: 'success',
        talent
      });
    });
  } catch (err) {
    next(err);
  }
};
