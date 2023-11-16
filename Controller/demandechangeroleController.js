import User from '../Models/Usermodel.js';
import Talent from '../Models/Talentmodel.js';
import Admin from '../Models/Adminmodel.js';
import Notification from '../Models/Notificationmodel.js';



export const soumettreDemande = async (req, res) => {
  try {
    const { skills, experience, email, password } = req.body;

    // Vérification si l'utilisateur existe déjà dans la base de données
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new Error('L\'utilisateur n\'existe pas');
    }

    const talent = new Talent({
      skills,
      experience,
      email,
      password
    });

    await talent.save();

    const user = await User.findOne({ email });

    const notification = new Notification({
      recipient: Admin._id,
      message: `Demande de changement de rôle pour ${user.email}`
    });

    await notification.save();

    res.status(201).json({ message: "Demande soumise" });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Une erreur est survenue lors de la soumission de la demande' });
  }
}

  export const demanderChangementRole = async (req, res) => {
    try {
      const { userId } = req.body;

      // Recherche de l'utilisateur dans le modèle User
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('Utilisateur introuvable');
      }

      // Envoi d'une notification à l'administrateur pour la demande de changement de rôle
      const admin = await Admin.findOne(); // Vous pouvez ajuster cette recherche pour trouver l'administrateur approprié
      const notification = new Notification({
        recipient: admin._id,
        message: `Demande de changement de rôle de l'utilisateur ${user.email}`, // Mise à jour de la référence user.username à user.email
      });
      await notification.save();

      res.status(200).json({ message: 'Demande de changement de rôle envoyée à l\'administrateur avec succès' });
    } catch (error) {
      res.status(500).json({ message: error.message || 'Une erreur est survenue lors de l\'envoi de la demande de changement de rôle' });
    }
  }
  export const accepterChangementRole = async (req, res) => {
    try {
      const { userId } = req.body;

      // Recherche de l'utilisateur dans le modèle User
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('Utilisateur introuvable');
      }

      // Mettre à jour le rôle de l'utilisateur dans la base de données
      user.role = 'talent';
      await user.save();

      // Envoyer une notification à l'utilisateur
      const notification = new Notification({
        recipient: user._id,
        message: 'Votre demande de changement de rôle a été acceptée avec succès',
      });
      await notification.save();

      res.status(200).json({ message: 'Demande de changement de rôle acceptée avec succès' });
    } catch (error) {
      res.status(500).json({ message: error.message || 'Une erreur est survenue lors de l\'acceptation de la demande de changement de rôle' });
    }
  }

  export const refuserChangementRole = async (req, res) => {
    try {
      const { userId } = req.body;

      // Recherche de l'utilisateur dans le modèle User
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('Utilisateur introuvable');
      }

      // Envoyer une notification à l'utilisateur
      const notification = new Notification({
        recipient: user._id,
        message: 'Votre demande de changement de rôle a été refusée',
      });
      await notification.save();

      res.status(200).json({ message: 'Demande de changement de rôle refusée avec succès' });
    } catch (error) {
      res.status(500).json({ message: error.message || 'Une erreur est survenue lors du refus de la demande de changement de rôle' });
    }
  }




