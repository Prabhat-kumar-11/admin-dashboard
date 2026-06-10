const ActivityLog = require('../models/ActivityLog');

// Log activity to database
exports.logActivity = async (userId, action, description, metadata = null, req = null) => {
  try {
    const ipAddress = req ? req.ip || req.connection.remoteAddress : null;
    const userAgent = req ? req.headers['user-agent'] : null;

    await ActivityLog.create({
      userId,
      action,
      description,
      metadata,
      ipAddress,
      userAgent,
    });
  } catch (error) {
    console.error('Error logging activity:', error);
  }
};
