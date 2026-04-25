// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ✅ MongoDB connect
// mongoose.connect("mongodb://127.0.0.1:27017/behaviorDB")
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log(err));

// // ✅ Schema
// const ActivitySchema = new mongoose.Schema({
//   user: String,
//   typing: Number,
//   mouse: String,
//   status: String,
//   login: String,
//   logout: String
// });

// const Activity = mongoose.model("Activity", ActivitySchema);

// // 🔐 LOGIN API
// app.post("/login", async (req, res) => {
//   const { username } = req.body;

//   const activity = new Activity({
//     user: username,
//     typing: 0,
//     mouse: "Not Recorded",
//     status: "Active",
//     login: new Date().toLocaleTimeString(),
//     logout: "-"
//   });

//   await activity.save();

//   res.json({ status: "success", name: username });
// });

// app.post("/update-activity", async (req, res) => {
//   const { user, typing, mouse, status } = req.body;

//   await Activity.findOneAndUpdate(
//     { user, logout: "-" },
//     { typing, mouse, status }
//   );

//   res.json({ status: "updated" });
// });

// // 📊 GET ALL (Admin)
// app.get("/activity", async (req, res) => {
//   const data = await Activity.find().sort({ _id: -1 });
//   res.json(data);
// });

// app.listen(5000, () => console.log("🚀 Server running on port 5000"));










// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ✅ MongoDB connect
// mongoose.connect("mongodb://127.0.0.1:27017/behaviorDB")
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log(err));


// // ✅ Schema (UPDATED 🔥)
// const ActivitySchema = new mongoose.Schema({
//   user: String,
//   typing: Number,
//   mouse: String,
//   status: String,
//   login: String,
//   logout: String,

//   // 🔥 NEW FIELDS
//   keystrokes: Array,
//   mouseData: Array,

//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// const Activity = mongoose.model("Activity", ActivitySchema);


// // 🔐 LOGIN API (FIXED - duplicate avoid)
// app.post("/login", async (req, res) => {
//   const { username } = req.body;

//   try {
//     // ❗ check already active session
//     const existing = await Activity.findOne({
//       user: username,
//       logout: "-"
//     });

//     if (existing) {
//       return res.json({
//         status: "success",
//         name: username,
//         message: "Already logged in"
//       });
//     }

//     const activity = new Activity({
//       user: username,
//       typing: 0,
//       mouse: "Not Recorded",
//       status: "Active",
//       login: new Date().toLocaleTimeString(),
//       logout: "-"
//     });

//     await activity.save();

//     res.json({ status: "success", name: username });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });


// // 🎯 UPDATE ACTIVITY (TRAINING DATA FULL SAVE)
// app.post("/update-activity", async (req, res) => {
//   const { user, typing, mouse, status, keystrokes, mouseData } = req.body;

//   try {
//     await Activity.findOneAndUpdate(
//       { user, logout: "-" },
//       {
//         typing,
//         mouse,
//         status,
//         keystrokes,   // 🔥 FULL SAVE
//         mouseData     // 🔥 FULL SAVE
//       }
//     );

//     res.json({ status: "updated" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });


// // 🔴 LOGOUT API (NEW 🔥)
// app.post("/logout", async (req, res) => {
//   const { user } = req.body;

//   try {
//     await Activity.findOneAndUpdate(
//       { user, logout: "-" },
//       { logout: new Date().toLocaleTimeString() }
//     );

//     res.json({ status: "logged out" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });


// // 📊 GET ALL (Admin Dashboard)
// app.get("/activity", async (req, res) => {
//   try {
//     const data = await Activity.find().sort({ createdAt: -1 });
//     res.json(data);
//   } catch (err) {
//     res.status(500).json([]);
//   }
// });


// app.listen(5000, () => console.log("🚀 Server running on port 5000"));






// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ✅ MongoDB connect
// mongoose.connect("mongodb://127.0.0.1:27017/behaviorDB")
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log(err));

// // ✅ Schema
// const ActivitySchema = new mongoose.Schema({
//   user: String,
//   typing: Number,
//   mouse: String,
//   status: String,
//   login: String,
//   logout: String,
//   keystrokes: Array,
//   mouseData: Array,
//   createdAt: { type: Date, default: Date.now }
// });

// const Activity = mongoose.model("Activity", ActivitySchema);


// // 🔐 LOGIN ACTIVITY
// app.post("/login", async (req, res) => {
//   try {
//     const { username } = req.body;

//     if (!username) {
//       return res.status(400).json({ status: "error" });
//     }

//     // avoid duplicate active session
//     const existing = await Activity.findOne({
//       user: username,
//       logout: "-"
//     });

//     if (existing) {
//       return res.json({ status: "success", message: "Already logged in" });
//     }

//     const activity = new Activity({
//       user: username,
//       typing: 0,
//       mouse: "Not Recorded",
//       status: "Active",
//       login: new Date().toLocaleTimeString(),
//       logout: "-"
//     });

//     await activity.save();

//     res.json({ status: "success" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });


// // 🔄 UPDATE ACTIVITY
// app.post("/update-activity", async (req, res) => {
//   try {
//     const { user, typing, mouse, status, keystrokes, mouseData } = req.body;

//     await Activity.findOneAndUpdate(
//       { user, logout: "-" },
//       { typing, mouse, status, keystrokes, mouseData }
//     );

//     res.json({ status: "updated" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });


// // 🔴 LOGOUT
// app.post("/logout", async (req, res) => {
//   try {
//     const { user } = req.body;

//     await Activity.findOneAndUpdate(
//       { user, logout: "-" },
//       { logout: new Date().toLocaleTimeString() }
//     );

//     res.json({ status: "logged out" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });


// // 📊 GET ALL
// app.get("/activity", async (req, res) => {
//   try {
//     const data = await Activity.find().sort({ createdAt: -1 });
//     res.json(data);
//   } catch (err) {
//     res.status(500).json([]);
//   }
// });

// // 📊 DASHBOARD STATS API
// app.get("/stats", async (req, res) => {
//   try {
//     const total = await Activity.countDocuments();

//     const active = await Activity.countDocuments({ status: "Active" });

//     const alerts = await Activity.countDocuments({ status: "Alert" });

//     const logout = await Activity.countDocuments({
//       logout: { $ne: "-" }
//     });

//     res.json({
//       total,
//       active,
//       alerts,
//       logout
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });


// // ✅ IMPORTANT FIX
// app.listen(5001, () => console.log("🚀 Server running on port 5001"));













// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// /* ===========================
//    ✅ MongoDB Connection
// =========================== */
// mongoose.connect("mongodb://127.0.0.1:27017/behaviorDB")
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log(err));


// /* ===========================
//    ✅ Schema
// =========================== */
// const ActivitySchema = new mongoose.Schema({
//   user: String,
//   typing: Number,
//   mouse: String,
//   status: String,
//   login: String,
//   logout: String,
//   keystrokes: Array,
//   mouseData: Array,
//   createdAt: { type: Date, default: Date.now }
// });

// const Activity = mongoose.model("Activity", ActivitySchema);


// /* ===========================
//    🔐 LOGIN ACTIVITY
// =========================== */
// app.post("/login", async (req, res) => {
//   try {
//     const { username } = req.body;

//     if (!username) {
//       return res.status(400).json({ status: "error", message: "Username required" });
//     }

//     // ❗ avoid duplicate session
//     const existing = await Activity.findOne({
//       user: username,
//       logout: "-"
//     });

//     if (existing) {
//       return res.json({
//         status: "success",
//         message: "Already logged in"
//       });
//     }

//     const activity = new Activity({
//       user: username,
//       typing: 0,
//       mouse: "Not Recorded",
//       status: "Active",
//       login: new Date().toLocaleTimeString(),
//       logout: "-"
//     });

//     await activity.save();

//     res.json({ status: "success" });

//   } catch (err) {
//     console.log("LOGIN ERROR:", err);
//     res.status(500).json({ status: "error" });
//   }
// });


// /* ===========================
//    🔄 UPDATE ACTIVITY
// =========================== */
// app.post("/update-activity", async (req, res) => {
//   try {
//     const { user, typing, mouse, status, keystrokes, mouseData } = req.body;

//     if (!user) {
//       return res.status(400).json({ status: "error", message: "User required" });
//     }

//     const updated = await Activity.findOneAndUpdate(
//       { user: user, logout: "-" },
//       {
//         typing,
//         mouse,
//         status,
//         keystrokes,
//         mouseData
//       },
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ status: "not found" });
//     }

//     res.json({ status: "updated" });

//   } catch (err) {
//     console.log("UPDATE ERROR:", err);
//     res.status(500).json({ status: "error" });
//   }
// });


// /* ===========================
//    🔴 LOGOUT
// =========================== */
// app.post("/logout", async (req, res) => {
//   try {
//     const { user } = req.body;

//     if (!user) {
//       return res.status(400).json({ status: "error" });
//     }

//     const updated = await Activity.findOneAndUpdate(
//       { user: user, logout: "-" },
//       { logout: new Date().toLocaleTimeString() }
//     );

//     if (!updated) {
//       return res.status(404).json({ status: "not found" });
//     }

//     res.json({ status: "logged out" });

//   } catch (err) {
//     console.log("LOGOUT ERROR:", err);
//     res.status(500).json({ status: "error" });
//   }
// });


// /* ===========================
//    📊 GET ALL ACTIVITY
// =========================== */
// app.get("/activity", async (req, res) => {
//   try {
//     const data = await Activity.find().sort({ createdAt: -1 });
//     res.json(data);
//   } catch (err) {
//     res.status(500).json([]);
//   }
// });


// /* ===========================
//    📊 DASHBOARD STATS (FIXED 🔥)
// =========================== */
// app.get("/stats", async (req, res) => {
//   try {
//     const total = await Activity.countDocuments();

//     // ✅ ACTIVE USERS (logout illa)
//     const active = await Activity.countDocuments({
//       logout: "-"
//     });

//     // ✅ ALERT + WARNING
//     const alerts = await Activity.countDocuments({
//       status: { $in: ["Alert", "Warning"] }
//     });

//     // ✅ LOGGED OUT USERS
//     const logout = await Activity.countDocuments({
//       logout: { $ne: "-" }
//     });

//     res.json({
//       total,
//       active,
//       alerts,
//       logout
//     });

//   } catch (err) {
//     console.log("STATS ERROR:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });


// /* ===========================
//    🚀 SERVER START
// =========================== */
// app.listen(5001, () =>
//   console.log("🚀 Server running on port 5001")
// );
















// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ✅ MongoDB connect
// mongoose.connect("mongodb://127.0.0.1:27017/behaviorDB")
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log(err));

// // ✅ Schema
// const ActivitySchema = new mongoose.Schema({
//   user: String,
//   typing: Number,
//   mouse: String,
//   status: String,
//   login: String,
//   logout: String,
//   keystrokes: Array,
//   mouseData: Array,
//   createdAt: { type: Date, default: Date.now }
// });

// const Activity = mongoose.model("Activity", ActivitySchema);



// // 🔥 AUTO CREATE ACTIVITY (IMPORTANT FIX)
// app.post("/sync-login", async (req, res) => {
//   try {
//     const { username } = req.body;

//     if (!username) {
//       return res.status(400).json({ status: "error" });
//     }

//     const existing = await Activity.findOne({
//       user: username,
//       logout: "-"
//     });

//     if (existing) {
//       return res.json({ status: "exists" });
//     }

//     const activity = new Activity({
//       user: username,
//       typing: 0,
//       mouse: "Not Recorded",
//       status: "Active",
//       login: new Date().toLocaleTimeString(),
//       logout: "-"
//     });

//     await activity.save();

//     res.json({ status: "created" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });



// // 🔄 UPDATE ACTIVITY
// app.post("/update-activity", async (req, res) => {
//   try {
//     const { user, typing, mouse, status, keystrokes, mouseData } = req.body;

//     await Activity.findOneAndUpdate(
//       { user, logout: "-" },
//       { typing, mouse, status, keystrokes, mouseData }
//     );

//     res.json({ status: "updated" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });



// // 🔴 LOGOUT
// app.post("/logout", async (req, res) => {
//   try {
//     const { user } = req.body;

//     await Activity.findOneAndUpdate(
//       { user, logout: "-" },
//       { logout: new Date().toLocaleTimeString() }
//     );

//     res.json({ status: "logged out" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });



// // 📊 STATS (ADMIN)
// app.get("/stats", async (req, res) => {
//   try {
//     const total = await Activity.countDocuments();
//     const active = await Activity.countDocuments({ status: "Active" });
//     const alerts = await Activity.countDocuments({ status: "Alert" });
//     const logout = await Activity.countDocuments({ logout: { $ne: "-" } });

//     res.json({ total, active, alerts, logout });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });



// app.listen(5001, () => console.log("🚀 Server running on port 5001"));




























// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ✅ MongoDB connect
// mongoose.connect("mongodb://127.0.0.1:27017/behaviorDB")
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log(err));

// // ✅ Schema
// const ActivitySchema = new mongoose.Schema({
//   user: String,
//   typing: Number,
//   mouse: String,
//   status: String,
//   login: String,
//   logout: String,
//   keystrokes: Array,
//   mouseData: Array,
//   createdAt: { type: Date, default: Date.now }
// });

// const Activity = mongoose.model("Activity", ActivitySchema);


// // 🔐 LOGIN ACTIVITY (🔥 MAIN FIX)
// app.post("/login", async (req, res) => {
//   try {
//     const { username } = req.body;

//     if (!username) {
//       return res.status(400).json({ status: "error" });
//     }

//     const existing = await Activity.findOne({
//       user: username,
//       logout: "-"
//     });

//     // 👉 create only if not active
//     if (!existing) {
//       await Activity.create({
//         user: username,
//         typing: 0,
//         mouse: "Not Recorded",
//         status: "Active",
//         login: new Date().toLocaleTimeString(),
//         logout: "-"
//       });
//     }

//     res.json({ status: "success" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });


// // 🔄 UPDATE ACTIVITY (training/exam)
// app.post("/update-activity", async (req, res) => {
//   try {
//     const { user, typing, mouse, status, keystrokes, mouseData } = req.body;

//     await Activity.findOneAndUpdate(
//       { user, logout: "-" },
//       { typing, mouse, status, keystrokes, mouseData }
//     );

//     res.json({ status: "updated" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });


// // 🔴 LOGOUT
// app.post("/logout", async (req, res) => {
//   try {
//     const { user } = req.body;

//     await Activity.findOneAndUpdate(
//       { user, logout: "-" },
//       { logout: new Date().toLocaleTimeString() }
//     );

//     res.json({ status: "logged out" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });


// // 📊 ADMIN STATS
// app.get("/stats", async (req, res) => {
//   try {
//     const total = await Activity.countDocuments();

//     const active = await Activity.countDocuments({
//       status: "Active"
//     });

//     const alerts = await Activity.countDocuments({
//       status: "Alert"
//     });

//     const logout = await Activity.countDocuments({
//       logout: { $ne: "-" }
//     });

//     res.json({
//       total,
//       active,
//       alerts,
//       logout
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });


// // 📋 ALL DATA (optional)
// app.get("/activity", async (req, res) => {
//   try {
//     const data = await Activity.find().sort({ createdAt: -1 });
//     res.json(data);
//   } catch {
//     res.status(500).json([]);
//   }
// });


// // 🚀 START SERVER
// app.listen(5001, () => console.log("🚀 Server running on port 5001"));





















// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ✅ MongoDB connect
// mongoose.connect("mongodb://127.0.0.1:27017/behaviorDB")
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log(err));


// // ✅ Schema
// const ActivitySchema = new mongoose.Schema({
//   user: String,
//   typing: Number,
//   mouse: String,
//   status: String,
//   login: String,
//   logout: String,
//   keystrokes: Array,
//   mouseData: Array,
//   createdAt: { type: Date, default: Date.now }
// });

// const Activity = mongoose.model("Activity", ActivitySchema);



// // 🔐 LOGIN
// app.post("/login", async (req, res) => {
//   try {
//     const { username } = req.body;

//     if (!username) {
//       return res.status(400).json({ status: "error" });
//     }

//     const existing = await Activity.findOne({
//       user: username,
//       logout: "-"
//     });

//     if (!existing) {
//       await Activity.create({
//         user: username,
//         typing: 0,
//         mouse: "Not Recorded",
//         status: "Active",
//         login: new Date().toLocaleTimeString(),
//         logout: "-"
//       });
//     }

//     res.json({ status: "success" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });



// // 🔄 UPDATE ACTIVITY
// app.post("/update-activity", async (req, res) => {
//   try {
//     const { user, typing, mouse, keystrokes, mouseData } = req.body;

//     await Activity.findOneAndUpdate(
//       { user, logout: "-" },
//       {
//         typing,
//         mouse,
//         keystrokes,
//         mouseData
//       }
//     );

//     res.json({ status: "updated" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });



// // 🔴 LOGOUT
// app.post("/logout", async (req, res) => {
//   try {
//     const { user } = req.body;

//     await Activity.findOneAndUpdate(
//       { user, logout: "-" },
//       {
//         logout: new Date().toLocaleTimeString(),
//         status: "LoggedOut"
//       }
//     );

//     res.json({ status: "logged out" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });



// // 📊 STATS (FINAL FIXED LOGIC)
// app.get("/stats", async (req, res) => {
//   try {
//     const total = await Activity.countDocuments();

//     const active = await Activity.countDocuments({
//       logout: "-"
//     });

//     const logout = await Activity.countDocuments({
//       logout: { $ne: "-" }
//     });

//     const alerts = await Activity.countDocuments({
//       status: "Alert"
//     });

//     res.json({
//       total,
//       active,
//       alerts,
//       logout
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });



// // 📋 ALL DATA
// app.get("/activity", async (req, res) => {
//   try {
//     const data = await Activity.find().sort({ createdAt: -1 });
//     res.json(data);
//   } catch {
//     res.status(500).json([]);
//   }
// });



// // 🚀 SERVER
// app.listen(5001, () => console.log("🚀 Server running on port 5001"));




















// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());


// // ✅ MongoDB connect
// mongoose.connect("mongodb://127.0.0.1:27017/behaviorDB")
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log(err));


// // ✅ Schema
// const ActivitySchema = new mongoose.Schema({
//   user: String,
//   typing: Number,
//   mouse: String,
//   status: String,
//   login: String,
//   logout: { type: String, default: "-" },
//   keystrokes: Array,
//   mouseData: Array,
//   createdAt: { type: Date, default: Date.now }
// });

// const Activity = mongoose.model("Activity", ActivitySchema);


// // 🔐 LOGIN
// app.post("/login", async (req, res) => {
//   try {
//     const { username } = req.body;

//     if (!username) {
//       return res.status(400).json({ status: "error" });
//     }

//     // already active check
//     const existing = await Activity.findOne({
//       user: username,
//       logout: "-"
//     });

//     if (!existing) {
//       await Activity.create({
//         user: username,
//         typing: 0,
//         mouse: "Not Recorded",
//         status: "Active",
//         login: new Date().toLocaleTimeString(),
//         logout: "-"
//       });
//     }

//     res.json({ status: "success" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });


// // 🔄 UPDATE ACTIVITY
// app.post("/update-activity", async (req, res) => {
//   try {
//     const { user, typing, mouse, keystrokes, mouseData } = req.body;

//     await Activity.findOneAndUpdate(
//       { user, logout: "-" },
//       {
//         typing,
//         mouse,
//         keystrokes,
//         mouseData
//       }
//     );

//     res.json({ status: "updated" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });


// // 🔴 LOGOUT
// app.post("/logout", async (req, res) => {
//   try {
//     const { user } = req.body;

//     await Activity.findOneAndUpdate(
//       { user, logout: "-" },
//       {
//         logout: new Date().toLocaleTimeString(),
//         status: "LoggedOut"
//       }
//     );

//     res.json({ status: "logged out" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });


// // // 📊 STATS (FIXED + RELIABLE)
// // app.get("/stats", async (req, res) => {
// //   try {
// //     const total = await Activity.countDocuments();

// //     const active = await Activity.countDocuments({
// //       logout: "-"
// //     });

// //     const logout = await Activity.countDocuments({
// //       logout: { $ne: "-" }
// //     });

// //     const alerts = await Activity.countDocuments({
// //       status: "Alert"
// //     });

// //     res.json({
// //       total,
// //       active,
// //       logout,
// //       alerts
// //     });

// //   } catch (err) {
// //     console.log(err);
// //     res.status(500).json({ error: "Server error" });
// //   }
// // });








// app.get("/stats", async (req, res) => {
//   try {
//     const total = await Activity.countDocuments();

//     const active = await Activity.countDocuments({
//       logout: "-"
//     });

//     const logout = await Activity.countDocuments({
//       logout: { $ne: "-" }
//     });

//     const alerts = await Activity.countDocuments({
//       status: "Warning"
//     });

//     res.json({
//       total,
//       active,
//       logout,
//       alerts
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });












// // 📋 ALL DATA
// app.get("/activity", async (req, res) => {
//   try {
//     const data = await Activity.find().sort({ createdAt: -1 });
//     res.json(data);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json([]);
//   }
// });


// // 🚀 SERVER
// app.listen(5001, () => console.log("🚀 Server running on port 5001"));


















// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ✅ MongoDB connect
// mongoose.connect("mongodb://127.0.0.1:27017/behaviorDB")
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log(err));


// // ================= USER SCHEMA (NEW) =================
// const UserSchema = new mongoose.Schema({
//   username: String,

//   trainingCompleted: {
//     type: Boolean,
//     default: false
//   },

//   examCompleted: {
//     type: Boolean,
//     default: false
//   }
// });

// const User = mongoose.model("User", UserSchema);


// // ================= ACTIVITY SCHEMA =================
// const ActivitySchema = new mongoose.Schema({
//   user: String,
//   typing: Number,
//   mouse: String,
//   status: String,
//   login: String,
//   logout: { type: String, default: "-" },
//   keystrokes: Array,
//   mouseData: Array,
//   createdAt: { type: Date, default: Date.now }
// });

// const Activity = mongoose.model("Activity", ActivitySchema);


// // ================= 🔐 LOGIN (UPDATED) =================
// app.post("/login", async (req, res) => {
//   try {
//     const { username } = req.body;

//     if (!username) {
//       return res.status(400).json({ status: "error" });
//     }

//     // 👉 user create / find
//     let user = await User.findOne({ username });

//     if (!user) {
//       user = await User.create({ username });
//     }

//     // 👉 activity create
//     const existing = await Activity.findOne({
//       user: username,
//       logout: "-"
//     });

//     if (!existing) {
//       await Activity.create({
//         user: username,
//         typing: 0,
//         mouse: "Not Recorded",
//         status: "Active",
//         login: new Date().toLocaleTimeString(),
//         logout: "-"
//       });
//     }

//     res.json({
//       status: "success",
//       user: {
//         id: user._id,
//         name: user.username,
//         trainingCompleted: user.trainingCompleted,
//         examCompleted: user.examCompleted
//       }
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });


// // ================= 📊 GET USER =================
// app.get("/user/:id", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// // ================= 🧪 COMPLETE TRAINING =================
// app.post("/complete-training", async (req, res) => {
//   try {
//     const { userId } = req.body;

//     await User.findByIdAndUpdate(userId, {
//       trainingCompleted: true
//     });

//     res.json({ success: true });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// // ================= 🔄 UPDATE ACTIVITY =================
// app.post("/update-activity", async (req, res) => {
//   try {
//     const { user, typing, mouse, keystrokes, mouseData } = req.body;

//     await Activity.findOneAndUpdate(
//       { user, logout: "-" },
//       {
//         typing,
//         mouse,
//         keystrokes,
//         mouseData
//       }
//     );

//     res.json({ status: "updated" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });


// // ================= 🔴 LOGOUT =================
// app.post("/logout", async (req, res) => {
//   try {
//     const { user } = req.body;

//     await Activity.findOneAndUpdate(
//       { user, logout: "-" },
//       {
//         logout: new Date().toLocaleTimeString(),
//         status: "LoggedOut"
//       }
//     );

//     res.json({ status: "logged out" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });


// // ================= 📊 STATS =================
// app.get("/stats", async (req, res) => {
//   try {
//     const total = await Activity.countDocuments();

//     const active = await Activity.countDocuments({
//       logout: "-"
//     });

//     const logout = await Activity.countDocuments({
//       logout: { $ne: "-" }
//     });

//     const alerts = await Activity.countDocuments({
//       status: "Warning"
//     });

//     res.json({
//       total,
//       active,
//       logout,
//       alerts
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });


// // ================= 📋 ALL DATA =================
// app.get("/activity", async (req, res) => {
//   try {
//     const data = await Activity.find().sort({ createdAt: -1 });
//     res.json(data);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json([]);
//   }
// });


// // ================= 🚀 SERVER =================
// app.listen(5000, () => console.log("🚀 Server running on port 5000"));
























// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ✅ MongoDB connect
// mongoose.connect("mongodb://127.0.0.1:27017/behaviorDB")
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log(err));


// // ================= USER SCHEMA =================
// const UserSchema = new mongoose.Schema({
//   username: { type: String, unique: true },

//   trainingCompleted: {
//     type: Boolean,
//     default: false
//   },

//   examCompleted: {
//     type: Boolean,
//     default: false
//   }
// });

// const User = mongoose.model("User", UserSchema);


// // ================= ACTIVITY SCHEMA =================
// const ActivitySchema = new mongoose.Schema({
//   userId: mongoose.Schema.Types.ObjectId, // ✅ FIXED
//   username: String,

//   typing: Number,
//   mouse: String,
//   status: String,

//   login: String,
//   logout: { type: String, default: "-" },

//   keystrokes: Array,
//   mouseData: Array,

//   createdAt: { type: Date, default: Date.now }
// });

// const Activity = mongoose.model("Activity", ActivitySchema);


// // ================= 🔐 LOGIN =================
// app.post("/login", async (req, res) => {
//   try {
//     const { username } = req.body;

//     if (!username) {
//       return res.status(400).json({ status: "error" });
//     }

//     // 👉 find or create user
//     let user = await User.findOne({ username });

//     if (!user) {
//       user = await User.create({ username });
//     }

//     // 👉 create activity session
//     const existing = await Activity.findOne({
//       username,
//       logout: "-"
//     });

//     if (!existing) {
//       await Activity.create({
//         userId: user._id,
//         username: username,
//         typing: 0,
//         mouse: "Not Recorded",
//         status: "Active",
//         login: new Date().toLocaleTimeString(),
//         logout: "-"
//       });
//     }

//     res.json({
//       status: "success",
//       user: {
//         id: user._id,
//         name: user.username,
//         trainingCompleted: user.trainingCompleted,
//         examCompleted: user.examCompleted
//       }
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });


// // ================= 📊 GET USER =================
// app.get("/user/:id", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// // ================= 🧪 SAVE TRAINING DATA =================
// app.post("/training-data", async (req, res) => {
//   try {
//     const { userId, typedText, keystrokes, mouseData } = req.body;

//     const user = await User.findById(userId);

//     await Activity.create({
//       userId,
//       username: user.username,
//       typing: typedText.length,
//       mouse: "Recorded",
//       status: "TrainingCompleted",
//       login: new Date().toLocaleTimeString(),
//       logout: "-",
//       keystrokes,
//       mouseData
//     });

//     res.json({ success: true });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// // ================= 🧪 COMPLETE TRAINING =================
// app.post("/complete-training", async (req, res) => {
//   try {
//     const { userId } = req.body;

//     await User.findByIdAndUpdate(userId, {
//       trainingCompleted: true
//     });

//     res.json({ success: true });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// // ================= 🧪 COMPLETE EXAM =================
// app.post("/complete-exam", async (req, res) => {
//   try {
//     const { userId } = req.body;

//     await User.findByIdAndUpdate(userId, {
//       examCompleted: true
//     });

//     res.json({ success: true });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// // ================= 🔄 UPDATE ACTIVITY =================
// app.post("/update-activity", async (req, res) => {
//   try {
//     const { username, typing, mouse, keystrokes, mouseData } = req.body;

//     await Activity.findOneAndUpdate(
//       { username, logout: "-" },
//       {
//         typing,
//         mouse,
//         keystrokes,
//         mouseData
//       }
//     );

//     res.json({ status: "updated" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });


// // ================= 🔴 LOGOUT =================
// app.post("/logout", async (req, res) => {
//   try {
//     const { username } = req.body;

//     await Activity.findOneAndUpdate(
//       { username, logout: "-" },
//       {
//         logout: new Date().toLocaleTimeString(),
//         status: "LoggedOut"
//       }
//     );

//     res.json({ status: "logged out" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });


// // ================= 📊 STATS =================
// app.get("/stats", async (req, res) => {
//   try {
//     const total = await Activity.countDocuments();

//     const active = await Activity.countDocuments({
//       logout: "-"
//     });

//     const logout = await Activity.countDocuments({
//       logout: { $ne: "-" }
//     });

//     const alerts = await Activity.countDocuments({
//       status: "Warning"
//     });

//     res.json({
//       total,
//       active,
//       logout,
//       alerts
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });


// // ================= 📋 ALL DATA =================
// app.get("/activity", async (req, res) => {
//   try {
//     const data = await Activity.find().sort({ createdAt: -1 });
//     res.json(data);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json([]);
//   }
// });


// // ================= 🚀 SERVER =================
// app.listen(5000, () => console.log("🚀 Server running on port 5000"));












// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();

// app.use(cors());
// app.use(express.json());

// // ================= MongoDB =================
// mongoose.connect("mongodb://127.0.0.1:27017/behaviorDB")
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log(err));


// // ================= USER SCHEMA =================
// const UserSchema = new mongoose.Schema({
//   username: { type: String, unique: true },
//   email: String,
//   password: String,
//   trainingCompleted: { type: Boolean, default: false },
//   examCompleted: { type: Boolean, default: false }
// });

// const User = mongoose.model("User", UserSchema);


// // ================= ACTIVITY SCHEMA =================
// const ActivitySchema = new mongoose.Schema({
//   userId: mongoose.Schema.Types.ObjectId,
//   username: String,
//   typing: Number,
//   mouse: String,
//   status: String,
//   login: String,
//   logout: { type: String, default: "-" },
//   keystrokes: Array,
//   mouseData: Array,
//   createdAt: { type: Date, default: Date.now }
// });

// const Activity = mongoose.model("Activity", ActivitySchema);


// // ================= 🟢 REGISTER (FIX ADDED) =================
// app.post("/register", async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//       return res.status(400).json({ status: "error", msg: "missing fields" });
//     }

//     let existing = await User.findOne({
//       $or: [{ username }, { email }]
//     });

//     if (existing) {
//       return res.json({ status: "exists" });
//     }

//     const newUser = await User.create({
//       username,
//       email,
//       password
//     });

//     res.json({
//       status: "success",
//       userId: newUser._id
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });


// // ================= LOGIN =================
// app.post("/login", async (req, res) => {
//   try {
//     const { username } = req.body;

//     let user = await User.findOne({ username });

//     if (!user) {
//       return res.status(400).json({ status: "fail" });
//     }

//     const existing = await Activity.findOne({
//       username,
//       logout: "-"
//     });

//     if (!existing) {
//       await Activity.create({
//         userId: user._id,
//         username,
//         typing: 0,
//         mouse: "Not Recorded",
//         status: "Active",
//         login: new Date().toLocaleTimeString(),
//         logout: "-"
//       });
//     }

//     res.json({
//       status: "success",
//       user: {
//         id: user._id,
//         name: user.username,
//         trainingCompleted: user.trainingCompleted,
//         examCompleted: user.examCompleted
//       }
//     });

//   } catch (err) {
//     res.status(500).json({ status: "error" });
//   }
// });


// // ================= TRAINING COMPLETE =================
// app.post("/complete-training", async (req, res) => {
//   const { userId } = req.body;

//   await User.findByIdAndUpdate(userId, {
//     trainingCompleted: true
//   });

//   res.json({ success: true });
// });


// // ================= EXAM COMPLETE =================
// app.post("/complete-exam", async (req, res) => {
//   const { userId } = req.body;

//   await User.findByIdAndUpdate(userId, {
//     examCompleted: true
//   });

//   res.json({ success: true });
// });


// // ================= ACTIVITY UPDATE =================
// app.post("/update-activity", async (req, res) => {
//   const { username, typing, mouse, keystrokes, mouseData } = req.body;

//   await Activity.findOneAndUpdate(
//     { username, logout: "-" },
//     { typing, mouse, keystrokes, mouseData }
//   );

//   res.json({ status: "updated" });
// });


// // ================= LOGOUT =================
// app.post("/logout", async (req, res) => {
//   const { username } = req.body;

//   await Activity.findOneAndUpdate(
//     { username, logout: "-" },
//     {
//       logout: new Date().toLocaleTimeString(),
//       status: "LoggedOut"
//     }
//   );

//   res.json({ status: "logged out" });
// });


// // ================= STATS =================
// app.get("/stats", async (req, res) => {
//   const total = await Activity.countDocuments();
//   const active = await Activity.countDocuments({ logout: "-" });
//   const logout = await Activity.countDocuments({ logout: { $ne: "-" } });
//   const alerts = await Activity.countDocuments({ status: "Warning" });

//   res.json({ total, active, logout, alerts });
// });


// // ================= ALL ACTIVITY =================
// app.get("/activity", async (req, res) => {
//   const data = await Activity.find().sort({ createdAt: -1 });
//   res.json(data);
// });


// // ================= SERVER =================
// app.listen(5000, () => {
//   console.log("🚀 Node Server running on port 5000");
// });










// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bcrypt = require("bcrypt");

// const app = express();

// app.use(cors());
// app.use(express.json());

// // ================= DB =================
// mongoose.connect("mongodb://127.0.0.1:27017/behaviorDB")
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch(err => console.log(err));


// // ================= USER =================
// const UserSchema = new mongoose.Schema({
//   username: { type: String, unique: true },
//   email: String,
//   password: String,
//   trainingCompleted: { type: Boolean, default: false },
//   examCompleted: { type: Boolean, default: false }
// });

// const User = mongoose.model("User", UserSchema);


// // ================= REGISTER =================
// app.post("/register", async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//       return res.json({ status: "fail", msg: "missing fields" });
//     }

//     let existing = await User.findOne({
//       $or: [{ username }, { email }]
//     });

//     if (existing) {
//       return res.json({ status: "exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.create({
//       username,
//       email,
//       password: hashedPassword
//     });

//     res.json({ status: "success" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });


// // ================= LOGIN (STRICT) =================
// app.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     if (!username || !password) {
//       return res.json({ status: "fail" });
//     }

//     const user = await User.findOne({ username });

//     if (!user) {
//       return res.json({ status: "not_registered" });
//     }

//     const match = await bcrypt.compare(password, user.password);

//     if (!match) {
//       return res.json({ status: "wrong_password" });
//     }

//     res.json({
//       status: "success",
//       userId: user._id,
//       username: user.username
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });


// // ================= ACTIVITY (KEEP SAME) =================
// const ActivitySchema = new mongoose.Schema({
//   userId: mongoose.Schema.Types.ObjectId,
//   username: String,
//   typing: Number,
//   mouse: String,
//   status: String,
//   login: String,
//   logout: { type: String, default: "-" },
//   keystrokes: Array,
//   mouseData: Array,
//   createdAt: { type: Date, default: Date.now }
// });

// const Activity = mongoose.model("Activity", ActivitySchema);


// // ================= LOGIN ACTIVITY =================
// app.post("/start-session", async (req, res) => {
//   const { userId, username } = req.body;

//   await Activity.create({
//     userId,
//     username,
//     typing: 0,
//     mouse: "Not Recorded",
//     status: "Active",
//     login: new Date().toLocaleTimeString(),
//     logout: "-"
//   });

//   res.json({ status: "session_started" });
// });


// // ================= SERVER =================
// app.listen(5000, () => {
//   console.log("🚀 Node Server running on port 5000");
// });



















// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bcrypt = require("bcrypt");

// const app = express();

// app.use(cors());
// app.use(express.json());

// /* ================= DB CONNECT ================= */
// mongoose.connect("mongodb://127.0.0.1:27017/behaviorDB")
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch(err => console.log("❌ DB Error:", err));


// /* ================= USER MODEL ================= */
// const UserSchema = new mongoose.Schema({
//   username: { type: String, unique: true },
//   email: { type: String, unique: true },
//   password: String,
//   trainingCompleted: { type: Boolean, default: false },
//   examCompleted: { type: Boolean, default: false }
// });

// const User = mongoose.model("User", UserSchema);


// /* ================= REGISTER API ================= */
// app.post("/register", async (req, res) => {
//   try {
//     console.log("REGISTER HIT:", req.body);

//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//       return res.status(400).json({ status: "fail", msg: "Missing fields" });
//     }

//     const existing = await User.findOne({
//       $or: [{ username }, { email }]
//     });

//     if (existing) {
//       return res.json({ status: "exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.create({
//       username,
//       email,
//       password: hashedPassword
//     });

//     return res.json({ status: "success" });

//   } catch (err) {
//     console.log("REGISTER ERROR:", err);
//     return res.status(500).json({ status: "error" });
//   }
// });


// /* ================= LOGIN API ================= */
// app.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     if (!username || !password) {
//       return res.json({ status: "fail" });
//     }

//     const user = await User.findOne({ username });

//     if (!user) {
//       return res.json({ status: "not_registered" });
//     }

//     const match = await bcrypt.compare(password, user.password);

//     if (!match) {
//       return res.json({ status: "wrong_password" });
//     }

//     return res.json({
//       status: "success",
//       userId: user._id,
//       username: user.username
//     });

//   } catch (err) {
//     console.log("LOGIN ERROR:", err);
//     return res.status(500).json({ status: "error" });
//   }
// });


// /* ================= OPTIONAL TEST ROUTE ================= */
// app.get("/", (req, res) => {
//   res.send("🚀 Backend is running fine");
// });


// /* ================= ACTIVITY MODEL ================= */
// const ActivitySchema = new mongoose.Schema({
//   userId: mongoose.Schema.Types.ObjectId,
//   username: String,
//   typing: Number,
//   mouse: String,
//   status: String,
//   login: String,
//   logout: { type: String, default: "-" },
//   keystrokes: Array,
//   mouseData: Array,
//   createdAt: { type: Date, default: Date.now }
// });

// const Activity = mongoose.model("Activity", ActivitySchema);


// /* ================= SESSION START ================= */
// app.post("/start-session", async (req, res) => {
//   try {
//     const { userId, username } = req.body;

//     await Activity.create({
//       userId,
//       username,
//       typing: 0,
//       mouse: "Not Recorded",
//       status: "Active",
//       login: new Date().toLocaleTimeString(),
//       logout: "-"
//     });

//     res.json({ status: "session_started" });

//   } catch (err) {
//     console.log("SESSION ERROR:", err);
//     res.status(500).json({ status: "error" });
//   }
// });


// /* ================= SERVER ================= */
// app.listen(5000, () => {
//   console.log("🚀 Server running on http://localhost:5000");
// });































// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bcrypt = require("bcrypt");

// const app = express();

// app.use(cors());
// app.use(express.json());

// /* ================= DB CONNECT ================= */
// mongoose.connect("mongodb://127.0.0.1:27017/behaviorDB")
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch(err => console.log("❌ DB Error:", err));


// /* ================= USER MODEL ================= */
// const UserSchema = new mongoose.Schema({
//   username: { type: String, unique: true },
//   email: { type: String, unique: true },
//   password: String,
//   trainingCompleted: { type: Boolean, default: false },
//   examCompleted: { type: Boolean, default: false }
// });

// const User = mongoose.model("User", UserSchema);


// /* ================= REGISTER API ================= */
// app.post("/register", async (req, res) => {
//   try {
//     console.log("REGISTER HIT:", req.body);

//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//       return res.status(400).json({ status: "fail", msg: "Missing fields" });
//     }

//     const existing = await User.findOne({
//       $or: [{ username }, { email }]
//     });

//     if (existing) {
//       return res.json({ status: "exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.create({
//       username,
//       email,
//       password: hashedPassword
//     });

//     return res.json({ status: "success" });

//   } catch (err) {
//     console.log("REGISTER ERROR:", err);
//     return res.status(500).json({ status: "error" });
//   }
// });


// /* ================= LOGIN API ================= */
// app.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     if (!username || !password) {
//       return res.json({ status: "fail" });
//     }

//     const user = await User.findOne({ username });

//     if (!user) {
//       return res.json({ status: "not_registered" });
//     }

//     const match = await bcrypt.compare(password, user.password);

//     if (!match) {
//       return res.json({ status: "wrong_password" });
//     }

//     return res.json({
//       status: "success",
//       userId: user._id,
//       username: user.username,
//             email: user.email, // 🔥 THIS LINE FIXES YOUR PROBLEM

//     });

//   } catch (err) {
//     console.log("LOGIN ERROR:", err);
//     return res.status(500).json({ status: "error" });
//   }
// });


// /* ================= COMPLETE TRAINING ================= */
// app.post("/complete-training", async (req, res) => {
//   try {
//     const { userId } = req.body;

//     if (!userId) {
//       return res.status(400).json({ status: "fail" });
//     }

//     await User.findByIdAndUpdate(userId, {
//       trainingCompleted: true
//     });

//     res.json({ status: "training_completed" });

//   } catch (err) {
//     console.log("COMPLETE TRAINING ERROR:", err);
//     res.status(500).json({ status: "error" });
//   }
// });


// /* ================= USER STATUS ================= */
// app.get("/user-status/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ status: "not_found" });
//     }

//     res.json({
//       trainingCompleted: user.trainingCompleted,
//       examCompleted: user.examCompleted
//     });

//   } catch (err) {
//     console.log("USER STATUS ERROR:", err);
//     res.status(500).json({ status: "error" });
//   }
// });


// /* ================= OPTIONAL TEST ROUTE ================= */
// app.get("/", (req, res) => {
//   res.send("🚀 Backend is running fine");
// });


// /* ================= ACTIVITY MODEL ================= */
// const ActivitySchema = new mongoose.Schema({
//   userId: mongoose.Schema.Types.ObjectId,
//   username: String,
//   typing: Number,
//   mouse: String,
//   status: String,
//   login: String,
//   logout: { type: String, default: "-" },
//   keystrokes: Array,
//   mouseData: Array,
//   createdAt: { type: Date, default: Date.now }
// });

// const Activity = mongoose.model("Activity", ActivitySchema);


// /* ================= SESSION START ================= */
// app.post("/start-session", async (req, res) => {
//   try {
//     const { userId, username } = req.body;

//     await Activity.create({
//       userId,
//       username,
//       typing: 0,
//       mouse: "Not Recorded",
//       status: "Active",
//       login: new Date().toLocaleTimeString(),
//       logout: "-"
//     });

//     res.json({ status: "session_started" });

//   } catch (err) {
//     console.log("SESSION ERROR:", err);
//     res.status(500).json({ status: "error" });
//   }
// });


// /* ================= SERVER ================= */
// app.listen(5000, () => {
//   console.log("🚀 Server running on http://localhost:5000");
// });



























// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bcrypt = require("bcrypt");

// const app = express();

// app.use(cors());
// app.use(express.json());

// /* ================= DB CONNECT ================= */
// mongoose.connect("mongodb://127.0.0.1:27017/behaviorDB")
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch(err => console.log("❌ DB Error:", err));

// /* ================= USER MODEL ================= */
// const UserSchema = new mongoose.Schema({
//   username: { type: String, unique: true },
//   email: { type: String, unique: true },
//   password: String,
//   trainingCompleted: { type: Boolean, default: false },
//   examCompleted: { type: Boolean, default: false },
//   isActive: { type: Boolean, default: false }   // 🔥 ADDED
// });

// const User = mongoose.model("User", UserSchema);

// /* ================= ACTIVITY MODEL ================= */
// const ActivitySchema = new mongoose.Schema({
//   userId: mongoose.Schema.Types.ObjectId,
//   username: String,
//   status: String, // Active / LoggedOut / Alert
//   login: String,
//   logout: { type: String, default: "-" },
//   createdAt: { type: Date, default: Date.now }
// });

// const Activity = mongoose.model("Activity", ActivitySchema);

// /* ================= REGISTER ================= */
// app.post("/register", async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     const existing = await User.findOne({
//       $or: [{ username }, { email }]
//     });

//     if (existing) return res.json({ status: "exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.create({
//       username,
//       email,
//       password: hashedPassword
//     });

//     res.json({ status: "success" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });

// /* ================= LOGIN ================= */
// app.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const user = await User.findOne({ username });
//     if (!user) return res.json({ status: "not_registered" });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.json({ status: "wrong_password" });

//     // 🔥 SET ACTIVE USER
//     await User.findByIdAndUpdate(user._id, { isActive: true });

//     // 🔥 CREATE ACTIVITY (LOGIN)
//     await Activity.create({
//       userId: user._id,
//       username: user.username,
//       status: "Active",
//       login: new Date().toLocaleTimeString()
//     });

//     res.json({
//       status: "success",
//       userId: user._id,
//       username: user.username,
//       email: user.email
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });

// /* ================= LOGOUT ================= */
// app.post("/logout", async (req, res) => {
//   try {
//     const { userId } = req.body;

//     await User.findByIdAndUpdate(userId, { isActive: false });

//     const lastActivity = await Activity.findOne({ userId, status: "Active" })
//       .sort({ createdAt: -1 });

//     if (lastActivity) {
//       lastActivity.status = "LoggedOut";
//       lastActivity.logout = new Date().toLocaleTimeString();
//       await lastActivity.save();
//     }

//     res.json({ status: "logged_out" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });

// /* ================= USER STATUS ================= */
// app.get("/user-status/:userId", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);

//     if (!user) return res.status(404).json({ status: "not_found" });

//     res.json({
//       trainingCompleted: user.trainingCompleted,
//       examCompleted: user.examCompleted,
//       isActive: user.isActive
//     });

//   } catch (err) {
//     res.status(500).json({ status: "error" });
//   }
// });

// /* ================= DASHBOARD STATS ================= */
// app.get("/stats", async (req, res) => {
//   try {
//     const total = await User.countDocuments();

//     const active = await User.countDocuments({ isActive: true });

//     const logout = await Activity.countDocuments({ status: "LoggedOut" });

//     const alerts = await Activity.countDocuments({ status: "Alert" });

//     res.json({
//       total,
//       active,
//       logout,
//       alerts
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });

// /* ================= TEST ROUTE ================= */
// app.get("/", (req, res) => {
//   res.send("🚀 Backend Running Fine");
// });






// const http = require("http");
// const { Server } = require("socket.io");

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });












// /* ================= SERVER ================= */
// app.listen(5000, () => {
//   console.log("🚀 Server running on http://localhost:5000");
// });















// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bcrypt = require("bcrypt");
// const http = require("http");
// const { Server } = require("socket.io");

// const app = express();

// app.use(cors());
// app.use(express.json());

// /* ================= DB CONNECT ================= */
// mongoose.connect("mongodb://127.0.0.1:27017/behaviorDB")
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch(err => console.log("❌ DB Error:", err));

// /* ================= SOCKET SETUP ================= */
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });

// io.on("connection", (socket) => {
//   console.log("🟢 User connected:", socket.id);
// });

// /* ================= USER MODEL ================= */
// const UserSchema = new mongoose.Schema({
//   username: { type: String, unique: true },
//   email: { type: String, unique: true },
//   password: String,
//   trainingCompleted: { type: Boolean, default: false },
//   examCompleted: { type: Boolean, default: false },
//   isActive: { type: Boolean, default: false }
// });

// const User = mongoose.model("User", UserSchema);

// /* ================= ACTIVITY MODEL ================= */
// const ActivitySchema = new mongoose.Schema({
//   userId: mongoose.Schema.Types.ObjectId,
//   username: String,
//   status: String,
//   login: String,
//   logout: { type: String, default: "-" },
//   createdAt: { type: Date, default: Date.now }
// });

// const Activity = mongoose.model("Activity", ActivitySchema);

// /* ================= REGISTER ================= */
// app.post("/register", async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     const existing = await User.findOne({
//       $or: [{ username }, { email }]
//     });

//     if (existing) return res.json({ status: "exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.create({
//       username,
//       email,
//       password: hashedPassword
//     });

//     res.json({ status: "success" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });

// /* ================= LOGIN ================= */
// app.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const user = await User.findOne({ username });
//     if (!user) return res.json({ status: "not_registered" });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.json({ status: "wrong_password" });

//     // 🔥 ACTIVE
//     await User.findByIdAndUpdate(user._id, { isActive: true });

//     // 🔥 ACTIVITY
//     await Activity.create({
//       userId: user._id,
//       username: user.username,
//       status: "Active",
//       login: new Date().toLocaleTimeString()
//     });

//     // 🔥 LIVE UPDATE
//     io.emit("stats-update");

//     res.json({
//       status: "success",
//       userId: user._id,
//       username: user.username,
//       email: user.email
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });

// /* ================= LOGOUT ================= */
// app.post("/logout", async (req, res) => {
//   try {
//     const { userId } = req.body;

//     await User.findByIdAndUpdate(userId, { isActive: false });

//     const lastActivity = await Activity.findOne({ userId, status: "Active" })
//       .sort({ createdAt: -1 });

//     if (lastActivity) {
//       lastActivity.status = "LoggedOut";
//       lastActivity.logout = new Date().toLocaleTimeString();
//       await lastActivity.save();
//     }

//     // 🔥 LIVE UPDATE
//     io.emit("stats-update");

//     res.json({ status: "logged_out" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });

// /* ================= USER STATUS ================= */
// app.get("/user-status/:userId", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);

//     if (!user) return res.status(404).json({ status: "not_found" });

//     res.json({
//       trainingCompleted: user.trainingCompleted,
//       examCompleted: user.examCompleted,
//       isActive: user.isActive
//     });

//   } catch (err) {
//     res.status(500).json({ status: "error" });
//   }
// });

// /* ================= DASHBOARD STATS ================= */
// app.get("/stats", async (req, res) => {
//   try {
//     const total = await User.countDocuments();
//     const active = await User.countDocuments({ isActive: true });
//     const logout = await Activity.countDocuments({ status: "LoggedOut" });
//     const alerts = await Activity.countDocuments({ status: "Alert" });

//     res.json({
//       total,
//       active,
//       logout,
//       alerts
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: "error" });
//   }
// });


// app.get("/activity", async (req, res) => {
//   try {
//     const data = await Activity.find().sort({ createdAt: -1 });

//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ status: "error" });
//   }
// });


// /* ================= TEST ================= */
// app.get("/", (req, res) => {
//   res.send("🚀 Backend Running Fine");
// });

// /* ================= SERVER START (FIXED) ================= */
// server.listen(5000, () => {
//   console.log("🚀 Server running on http://localhost:5000");
// });

























const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/behaviorDB")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);
});

/* ================= USER MODEL ================= */
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  trainingCompleted: { type: Boolean, default: false },
  examCompleted: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false }
});

const User = mongoose.model("User", UserSchema);

/* ================= ACTIVITY MODEL ================= */
const ActivitySchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  username: String,
  status: String,
  login: String,
  logout: { type: String, default: "-" },
  createdAt: { type: Date, default: Date.now }
});

const Activity = mongoose.model("Activity", ActivitySchema);

/* ================= REGISTER ================= */
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existing = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (existing) return res.json({ status: "exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword
    });

    res.json({ status: "success" });

  } catch (err) {
    res.status(500).json({ status: "error" });
  }
});

/* ================= LOGIN ================= */
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.json({ status: "not_registered" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ status: "wrong_password" });

    await User.findByIdAndUpdate(user._id, { isActive: true });

    await Activity.create({
      userId: user._id,
      username: user.username,
      status: "Active",
      login: new Date().toLocaleTimeString()
    });

    io.emit("stats-update");

    res.json({
      status: "success",
      userId: user._id,
      username: user.username,
      email: user.email
    });

  } catch (err) {
    res.status(500).json({ status: "error" });
  }
});

/* ================= LOGOUT ================= */
app.post("/logout", async (req, res) => {
  try {
    const { userId } = req.body;

    await User.findByIdAndUpdate(userId, { isActive: false });

    const lastActivity = await Activity.findOne({ userId, status: "Active" })
      .sort({ createdAt: -1 });

    if (lastActivity) {
      lastActivity.status = "LoggedOut";
      lastActivity.logout = new Date().toLocaleTimeString();
      await lastActivity.save();
    }

    io.emit("stats-update");

    res.json({ status: "logged_out" });

  } catch (err) {
    res.status(500).json({ status: "error" });
  }
});

/* ================= FIX ADDED: USERS LIST ================= */
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    const formatted = users.map(u => ({
      _id: u._id,
      name: u.username,
      email: u.email,
      role: "User",
      status: u.isActive ? "Active" : "Blocked",
      lastLogin: "-"
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

/* ================= FIX ADDED: STATUS UPDATE ================= */
app.put("/users/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    await User.findByIdAndUpdate(req.params.id, {
      isActive: status === "Active"
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Status update failed" });
  }
});

/* ================= FIX ADDED: DELETE USER ================= */
app.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

/* ================= OTHER ROUTES (UNCHANGED) ================= */
app.get("/user-status/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ status: "not_found" });

    res.json({
      trainingCompleted: user.trainingCompleted,
      examCompleted: user.examCompleted,
      isActive: user.isActive
    });

  } catch (err) {
    res.status(500).json({ status: "error" });
  }
});

app.get("/stats", async (req, res) => {
  try {
    const total = await User.countDocuments();
    const active = await User.countDocuments({ isActive: true });
    const logout = await Activity.countDocuments({ status: "LoggedOut" });
    const alerts = await Activity.countDocuments({ status: "Alert" });

    res.json({ total, active, logout, alerts });

  } catch (err) {
    res.status(500).json({ status: "error" });
  }
});

app.get("/activity", async (req, res) => {
  try {
    const data = await Activity.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ status: "error" });
  }
});





// app.get("/reports", async (req, res) => {
//   try {
//     const { user } = req.query;

//     const userReports = await Activity.find({ username: user });

//     const suspiciousReports = await Activity.find({
//       status: "Alert"
//     });

//     res.json({
//       userReports: userReports.map(r => ({
//         _id: r._id,
//         name: r.username,
//         logins: 1,
//         status: r.status
//       })),
//       suspiciousReports
//     });

//   } catch (err) {
//     res.status(500).json({ error: "Reports fetch failed" });
//   }
// });






app.get("/reports", async (req, res) => {
  try {
    const { user } = req.query;

    const userReportsRaw = await Activity.find({ username: user });

    // group login count per user (real fix)
    const grouped = {};

    userReportsRaw.forEach(item => {
      if (!grouped[item.username]) {
        grouped[item.username] = {
          _id: item.userId,
          name: item.username,
          logins: 0,
          status: item.status
        };
      }
      grouped[item.username].logins += 1;
    });

    const userReports = Object.values(grouped);

    const suspiciousReports = await Activity.find({
      status: "Alert"
    });

    res.json({
      userReports,
      suspiciousReports
    });

  } catch (err) {
    res.status(500).json({ error: "Reports fetch failed" });
  }
});








app.get("/", (req, res) => {
  res.send("🚀 Backend Running Fine");
});

/* ================= SERVER ================= */
server.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});