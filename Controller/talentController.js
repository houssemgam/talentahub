import Talent from '../Models/Talentmodel.js';
import createError from 'http-errors';
import bcrypt from 'bcrypt';

export const getTalent = async (req, res, next) => {
  try {
    const talent = await Talent.findById(req.params.id);

    if (!talent) {
      return next(createError(404, 'Talent not found with this ID'));
    }

    // Check if the talent is accessing their own profile
    if (req.user._id === req.params.id) {
      res.json({
        status: 'success',
        results: talent
      });
    } else {
      throw createError(401, 'Unauthorized');
    }
  } catch (err) {
    next(err);
  }
};

export const updateTalent = async (req, res, next) => {
  try {
    // Check if the talent is updating their own profile
    if (req.user._id === req.params.id) {
      const talent = await Talent.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });

      if (!talent) {
        return next(createError(404, 'Talent not found with this ID'));
      }

      res.json({
        status: 'success',
        talent
      });
    } else {
      throw createError(401, 'Unauthorized');
    }
  } catch (err) {
    next(err);
  }
};

export const deleteTalent = async (req, res, next) => {
  try {
    // Check if the talent is deleting their own profile
    if (req.user._id === req.params.id) {
      const deletedTalent = await Talent.findByIdAndDelete(req.params.id);

      if (!deletedTalent) {
        return next(createError(404, 'Talent not found with this ID'));
      }

      res.status(204).json({
        status: 'success'
      });
    } else {
      throw createError(401, 'Unauthorized');
    }
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    // Check if the talent is updating their own profile
    if (req.user._id === req.params.id) {
      // Rest of the code for updating the profile
    } else {
      throw createError(401, 'Unauthorized');
    }
  } catch (err) {
    next(err);
  }
};
