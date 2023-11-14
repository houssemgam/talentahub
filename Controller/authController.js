import User from '../Models/Usermodel.js';
import bcrypt from 'bcrypt';
import createError from 'http-errors';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import jwt from'jsonwebtoken';



export const sendPasswordResetEmail = async (user) => {
  // Générer le jeton de réinitialisation
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Enregistrer le jeton dans la base de données
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 heure d'expiration

  try {
    await user.save();
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de l'enregistrement du jeton de réinitialisation");
  }

  // Envoyer l'email de réinitialisation
  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // Remplacez par le serveur SMTP approprié
    port: 587,
    secure: false,
    auth: {
      user: 'riadhlabidi690@gmail.com', // Remplacez par votre adresse email
      pass: 'riadh12345', // Remplacez par votre mot de passe
    }
  });

  const mailOptions = {
    from: 'riadhlabidi690@gmail.com', // Remplacez par votre adresse email
    to: user.email,
    subject: 'Réinitialisation du mot de passe',
    text: 'Voici votre lien de réinitialisation de mot de passe : ' + resetToken,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé : ' + info.response);
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de l'envoi de l'email de réinitialisation");
  }
};
export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    // Rechercher l'utilisateur avec le jeton de réinitialisation
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    // Vérifier si l'utilisateur existe et si le jeton est valide
    if (!user) {
      throw createError(400, 'Le jeton de réinitialisation est invalide ou a expiré');
    }

    // Mettre à jour le mot de passe de l'utilisateur
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Le mot de passe a été réinitialisé avec succès' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message || 'Une erreur est survenue lors de la réinitialisation du mot de passe' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(401, 'Email invalides');
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw createError(401, 'Password invalides');
    }

    // Générer un token d'authentification
    const token = await signAccessToken(user._id);

    // Générer le refresh token
    const refreshToken = generateRefreshToken(user._id);

    res.status(200).json({ token, refreshToken });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message || 'Une erreur est survenue lors de la connexion' });
  }
};


export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createError(409, 'Cet utilisateur existe déjà');
    }

    // Créer un nouvel utilisateur
    const newUser = new User({ email, password, role: 'user' });
    await newUser.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message || 'Une erreur est survenue lors de l\'inscription' });
  }
};
export const logout = (req, res) => {
  // Détruire la session de l'utilisateur
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ message: 'Erreur lors de la déconnexion' });
    } else {
      res.clearCookie('connect.sid'); // Supprimer le cookie de session
      res.status(200).json({ message: 'Déconnexion réussie' });
    }
  });
};


const signAccessToken = (userId) => {
  const token = jwt.sign({ userId }, 'your_secret_key', { expiresIn: '1h' });
  return token;
}


const generateRefreshToken = (userId) => {
  const refreshToken = jwt.sign({ userId }, 'your_refresh_secret_key', { expiresIn: '7d' });
  return refreshToken;
};