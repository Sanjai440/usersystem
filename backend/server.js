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
























const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/behaviorDB")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));


// ================= USER SCHEMA =================
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },

  trainingCompleted: {
    type: Boolean,
    default: false
  },

  examCompleted: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model("User", UserSchema);


// ================= ACTIVITY SCHEMA =================
const ActivitySchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId, // ✅ FIXED
  username: String,

  typing: Number,
  mouse: String,
  status: String,

  login: String,
  logout: { type: String, default: "-" },

  keystrokes: Array,
  mouseData: Array,

  createdAt: { type: Date, default: Date.now }
});

const Activity = mongoose.model("Activity", ActivitySchema);


// ================= 🔐 LOGIN =================
app.post("/login", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ status: "error" });
    }

    // 👉 find or create user
    let user = await User.findOne({ username });

    if (!user) {
      user = await User.create({ username });
    }

    // 👉 create activity session
    const existing = await Activity.findOne({
      username,
      logout: "-"
    });

    if (!existing) {
      await Activity.create({
        userId: user._id,
        username: username,
        typing: 0,
        mouse: "Not Recorded",
        status: "Active",
        login: new Date().toLocaleTimeString(),
        logout: "-"
      });
    }

    res.json({
      status: "success",
      user: {
        id: user._id,
        name: user.username,
        trainingCompleted: user.trainingCompleted,
        examCompleted: user.examCompleted
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error" });
  }
});


// ================= 📊 GET USER =================
app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= 🧪 SAVE TRAINING DATA =================
app.post("/training-data", async (req, res) => {
  try {
    const { userId, typedText, keystrokes, mouseData } = req.body;

    const user = await User.findById(userId);

    await Activity.create({
      userId,
      username: user.username,
      typing: typedText.length,
      mouse: "Recorded",
      status: "TrainingCompleted",
      login: new Date().toLocaleTimeString(),
      logout: "-",
      keystrokes,
      mouseData
    });

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= 🧪 COMPLETE TRAINING =================
app.post("/complete-training", async (req, res) => {
  try {
    const { userId } = req.body;

    await User.findByIdAndUpdate(userId, {
      trainingCompleted: true
    });

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= 🧪 COMPLETE EXAM =================
app.post("/complete-exam", async (req, res) => {
  try {
    const { userId } = req.body;

    await User.findByIdAndUpdate(userId, {
      examCompleted: true
    });

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= 🔄 UPDATE ACTIVITY =================
app.post("/update-activity", async (req, res) => {
  try {
    const { username, typing, mouse, keystrokes, mouseData } = req.body;

    await Activity.findOneAndUpdate(
      { username, logout: "-" },
      {
        typing,
        mouse,
        keystrokes,
        mouseData
      }
    );

    res.json({ status: "updated" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error" });
  }
});


// ================= 🔴 LOGOUT =================
app.post("/logout", async (req, res) => {
  try {
    const { username } = req.body;

    await Activity.findOneAndUpdate(
      { username, logout: "-" },
      {
        logout: new Date().toLocaleTimeString(),
        status: "LoggedOut"
      }
    );

    res.json({ status: "logged out" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error" });
  }
});


// ================= 📊 STATS =================
app.get("/stats", async (req, res) => {
  try {
    const total = await Activity.countDocuments();

    const active = await Activity.countDocuments({
      logout: "-"
    });

    const logout = await Activity.countDocuments({
      logout: { $ne: "-" }
    });

    const alerts = await Activity.countDocuments({
      status: "Warning"
    });

    res.json({
      total,
      active,
      logout,
      alerts
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});


// ================= 📋 ALL DATA =================
app.get("/activity", async (req, res) => {
  try {
    const data = await Activity.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json([]);
  }
});


// ================= 🚀 SERVER =================
app.listen(5000, () => console.log("🚀 Server running on port 5000"));