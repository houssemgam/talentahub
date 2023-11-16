import Talent from '../Models/Talentmodel.js';
import createError from 'http-errors';

// Afficher le profil du talent
export const getTalentProfile = async (req, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      return next(createError(403, 'Accès refusé'));
    }

    const talentUser = await Talent.findById(req.params.id);

    if (!talentUser) {
      return next(createError(404, 'Utilisateur talent non trouvé avec cet identifiant'));
    }

    // Vérifier si l'utilisateur est le propriétaire du compte
    if (talentUser.user.toString() !== req.user._id.toString()) {
      return next(createError(403, 'Accès refusé'));
    }

    res.json({
      status: 'success',
      results: talentUser
    });
  } catch (err) {
    next(err);
  }
};

export const updateTalentProfile = async (req, res, next) => {
  try {
    const talentId = req.params.id;
    const talentUser = await Talent.findByIdAndUpdate(talentId, req.body, {
      new: true,
      runValidators: true
    });

    if (!talentUser) {
      const error = createError(404, 'Profil talent non trouvé');
      return next(error);
    }

    // Vérifier si l'utilisateur est le propriétaire du compte
    if (!req.user || !req.user._id || talentUser.user.toString() !== req.user._id.toString()) {
      return next(createError(403, 'Accès refusé'));
    }

    res.json({
      status: 'success',
      results: talentUser
    });
  } catch (err) {
    next(err);
  }
};



export const deleteTalentProfile = async (req, res, next) => {
  try {
    const talentId = req.params.id;
    const talent = await Talent.findById(talentId);

    // Vérifier si le profil talent existe
    if (!talent) {
      return next(createError(404, 'Profil talent non trouvé'));
    }

    // Vérifier si l'utilisateur est le propriétaire du compte
    if (talent.user.toString() !== req.user._id.toString()) {
      return next(createError(403, 'Accès refusé'));
    }

    // Supprimer le profil de talent
    await Talent.findByIdAndDelete(talentId);

    res.status(204).json({
      status: 'success'
    });
  } catch (err) {
    next(err);
  }
};



