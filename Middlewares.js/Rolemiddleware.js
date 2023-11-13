export const checkUserRole = (requiredRole) => {
    return (req, res, next) => {
      if (req.user.role === requiredRole) {
        next();
      } else {
        res.status(403).json({
          status: 'error',
          message: 'Accès refusé'
        });
      }
    };
  };

