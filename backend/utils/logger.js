const logActivity = (userId, action) => {
  console.log(
    `[${new Date().toISOString()}] User: ${userId} Action: ${action}`
  );
};

module.exports = logActivity;