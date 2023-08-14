const express = require("express");
const router = express.Router();

// import routes
const authRoutes = require("./auth.routes.js");
const teamRoutes = require("./team.routes.js");
const subTeamRoutes = require("./subteam.routes.js");
const collaborationRoutes = require("./collaboration.routes.js");
const { authenticateToken } = require("../utils/validation.js");

// implement routes
router.use("/auth", authRoutes);
// router.use("/profile", profileRoutes);
router.use("/team", authenticateToken, teamRoutes);
router.use("/subteam", authenticateToken, subTeamRoutes);
router.use("/collaboration", authenticateToken, collaborationRoutes);
// app.use("/api", require("./routes/team.routes.js"));
// app.use("/api", require("./routes/subteam.routes.js"));
// app.use("/api", require("./routes/collaboration.routes.js"));

// export router
module.exports = router;
