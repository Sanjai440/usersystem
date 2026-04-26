
// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Training.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Training() {
//   const navigate = useNavigate();

//   const targetText =
//     "The quick fox jumps over the lazy dog while typing continuously with different speeds using shift keys, numbers like 12345, and symbols like @#&* to capture accurate keystroke timing and mouse movements.";

//   const [input, setInput] = useState("");
//   const [keystrokes, setKeystrokes] = useState([]);
//   const [mouseData, setMouseData] = useState([]);
//   const [time, setTime] = useState(150); // seconds
//   const [isTyping, setIsTyping] = useState(false);
//   const [isCompleted, setIsCompleted] = useState(false);

//   const keyDownTimes = useRef({});
//   const lastKeyTime = useRef(null);

//   const userId = localStorage.getItem("userId") || "guest_user";

//   useEffect(() => {
//     const done = localStorage.getItem("trainingCompleted");

//     if (done === "true") {
//       navigate("/app/dashboard", { replace: true });
//     }
//   }, [navigate]);

//   useEffect(() => {
//     let timer;

//     if (isTyping && time > 0) {
//       timer = setInterval(() => {
//         setTime((t) => t - 1);
//       }, 1000);
//     }

//     return () => clearInterval(timer);
//   }, [isTyping, time]);

//   const handleKeyDown = (e) => {
//     const now = Date.now();
//     keyDownTimes.current[e.key] = now;

//     const delay = lastKeyTime.current ? now - lastKeyTime.current : 0;

//     setKeystrokes((prev) => [
//       ...prev,
//       { key: e.key, type: "down", time: now, delayFromLastKey: delay },
//     ]);

//     lastKeyTime.current = now;
//   };

//   const handleKeyUp = (e) => {
//     const now = Date.now();
//     const holdTime = now - (keyDownTimes.current[e.key] || now);

//     setKeystrokes((prev) => [
//       ...prev,
//       { key: e.key, type: "up", time: now, holdTime },
//     ]);
//   };

//   const handleChange = (e) => {
//     setInput(e.target.value);
//     if (!isTyping) setIsTyping(true);
//   };

//   useEffect(() => {
//     const move = (e) =>
//       setMouseData((prev) => [
//         ...prev,
//         { type: "move", x: e.clientX, y: e.clientY, time: Date.now() },
//       ]);

//     const click = (e) =>
//       setMouseData((prev) => [
//         ...prev,
//         { type: "click", x: e.clientX, y: e.clientY, time: Date.now() },
//       ]);

//     const scroll = () =>
//       setMouseData((prev) => [
//         ...prev,
//         { type: "scroll", scrollY: window.scrollY, time: Date.now() },
//       ]);

//     window.addEventListener("mousemove", move);
//     window.addEventListener("click", click);
//     window.addEventListener("scroll", scroll);

//     return () => {
//       window.removeEventListener("mousemove", move);
//       window.removeEventListener("click", click);
//       window.removeEventListener("scroll", scroll);
//     };
//   }, []);

//   const words = input.trim().split(/\s+/).filter(Boolean).length;
//   const characters = input.length;

//   const minutes = Math.floor(time / 60);
//   const seconds = time % 60;
//   const handleSubmit = async () => {
//     if (!input.trim()) {
//       toast.warning("⚠️ Please start typing!");
//       return;
//     }

//     const payload = {
//       userId,
//       module: "training",
//       targetText,
//       typedText: input,
//       keystrokes,
//       mouseData,
//       words,
//       characters,
//       timeTaken: 150 - time,
//       timestamp: Date.now(),
//     };

//     try {
//       const res = await fetch("http://localhost:5000/training-data", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (res.ok) {
//         toast.success("✅ Training Completed!");

//         localStorage.setItem("trainingCompleted", "true");
//         setIsCompleted(true);

//         setTimeout(() => {
//           navigate("/app/dashboard", { replace: true });
//         }, 800);
//       } else {
//         toast.error("❌ Server error!");
//       }
//     } catch (err) {
//       console.log(err);
//       toast.error("❌ Server error!");
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     toast.error("❌ Paste not allowed!");
//   };

//   if (isCompleted) {
//     return (
//       <div className="training-page disabled-mode">
//         <h2>🚫 Training Completed</h2>
//         <p>Redirecting...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="training-page">
//       <h2>Keystroke Training</h2>

//       {/* TIMER */}
//       <h1 className="timer">
//         {String(minutes).padStart(2, "0")}:
//         {String(seconds).padStart(2, "0")}
//       </h1>

//       <p className="sentence">{targetText}</p>

//       <textarea
//         value={input}
//         placeholder="Start typing the given sentence here..."
//         onChange={handleChange}
//         onKeyDown={handleKeyDown}
//         onKeyUp={handleKeyUp}
//         onPaste={handlePaste}
//         disabled={time === 0}
//       />

//       <div className="stats">
//         <span>Words: {words}</span>
//         <span>Characters: {characters}</span>
//       </div>

//       <button className="submit" onClick={handleSubmit}>
//         Submit Data
//       </button>

//       <ToastContainer />
//     </div>
//   );
// }

// export default Training;






// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Training.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Training() {
//   const navigate = useNavigate();

//   // ✅ FIXED USER
//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user?.id;

//   const targetText =
//     "The quick fox jumps over the lazy dog while typing continuously with different speeds using shift keys, numbers like 12345, and symbols like @#&* to capture accurate keystroke timing and mouse movements.";

//   const [input, setInput] = useState("");
//   const [keystrokes, setKeystrokes] = useState([]);
//   const [mouseData, setMouseData] = useState([]);
//   const [time, setTime] = useState(150);
//   const [isTyping, setIsTyping] = useState(false);
//   const [isCompleted, setIsCompleted] = useState(false);

//   const keyDownTimes = useRef({});
//   const lastKeyTime = useRef(null);

//   // 🔐 USER CHECK
//   useEffect(() => {
//     if (!userId) {
//       navigate("/");
//     }
//   }, [userId, navigate]);

//   // ⏱ TIMER
//   useEffect(() => {
//     let timer;
//     if (isTyping && time > 0) {
//       timer = setInterval(() => {
//         setTime((t) => t - 1);
//       }, 1000);
//     }
//     return () => clearInterval(timer);
//   }, [isTyping, time]);

//   const handleKeyDown = (e) => {
//     const now = Date.now();
//     keyDownTimes.current[e.key] = now;

//     const delay = lastKeyTime.current ? now - lastKeyTime.current : 0;

//     setKeystrokes((prev) => [
//       ...prev,
//       { key: e.key, type: "down", time: now, delayFromLastKey: delay },
//     ]);

//     lastKeyTime.current = now;
//   };

//   const handleKeyUp = (e) => {
//     const now = Date.now();
//     const holdTime = now - (keyDownTimes.current[e.key] || now);

//     setKeystrokes((prev) => [
//       ...prev,
//       { key: e.key, type: "up", time: now, holdTime },
//     ]);
//   };

//   const handleChange = (e) => {
//     setInput(e.target.value);
//     if (!isTyping) setIsTyping(true);
//   };

//   // 🖱 MOUSE TRACK
//   useEffect(() => {
//     const move = (e) =>
//       setMouseData((prev) => [
//         ...prev,
//         { type: "move", x: e.clientX, y: e.clientY, time: Date.now() },
//       ]);

//     const click = (e) =>
//       setMouseData((prev) => [
//         ...prev,
//         { type: "click", x: e.clientX, y: e.clientY, time: Date.now() },
//       ]);

//     const scroll = () =>
//       setMouseData((prev) => [
//         ...prev,
//         { type: "scroll", scrollY: window.scrollY, time: Date.now() },
//       ]);

//     window.addEventListener("mousemove", move);
//     window.addEventListener("click", click);
//     window.addEventListener("scroll", scroll);

//     return () => {
//       window.removeEventListener("mousemove", move);
//       window.removeEventListener("click", click);
//       window.removeEventListener("scroll", scroll);
//     };
//   }, []);

//   const words = input.trim().split(/\s+/).filter(Boolean).length;
//   const characters = input.length;

//   const minutes = Math.floor(time / 60);
//   const seconds = time % 60;

//   // 🚀 SUBMIT
//   const handleSubmit = async () => {
//     if (!input.trim()) {
//       toast.warning("⚠️ Please start typing!");
//       return;
//     }

//     try {
//       // ✅ SAVE DATA
//       await fetch("http://localhost:5000/training-data", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId,
//           typedText: input,
//           keystrokes,
//           mouseData,
//         }),
//       });

//       // ✅ UPDATE STATUS
//       await fetch("http://localhost:5000/complete-training", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ userId }),
//       });

//       toast.success("✅ Training Completed!");
//       setIsCompleted(true);

//       setTimeout(() => {
//         navigate("/app/dashboard");
//       }, 800);

//     } catch (err) {
//       console.log(err);
//       toast.error("❌ Server error!");
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     toast.error("❌ Paste not allowed!");
//   };

//   if (isCompleted) {
//     return (
//       <div className="training-page disabled-mode">
//         <h2>🚫 Training Completed</h2>
//         <p>Redirecting...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="training-page">
//       <h2>Keystroke Training</h2>

//       <h1 className="timer">
//         {String(minutes).padStart(2, "0")}:
//         {String(seconds).padStart(2, "0")}
//       </h1>

//       <p className="sentence">{targetText}</p>

//       <textarea
//         value={input}
//         placeholder="Start typing the given sentence here..."
//         onChange={handleChange}
//         onKeyDown={handleKeyDown}
//         onKeyUp={handleKeyUp}
//         onPaste={handlePaste}
//         disabled={time === 0}
//       />

//       <div className="stats">
//         <span>Words: {words}</span>
//         <span>Characters: {characters}</span>
//       </div>

//       <button className="submit" onClick={handleSubmit}>
//         Submit Data
//       </button>

//       <ToastContainer />
//     </div>
//   );
// }

// export default Training;

























// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Training.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Training() {
//   const navigate = useNavigate();

//   // ✅ SAFE USER FETCH
//   const user = JSON.parse(localStorage.getItem("user") || "{}");
//   const userId = user?.id;

//   const targetText =
//     "The quick fox jumps over the lazy dog while typing continuously with different speeds using shift keys, numbers like 12345, and symbols like @#&* to capture accurate keystroke timing and mouse movements.";

//   const [input, setInput] = useState("");
//   const [keystrokes, setKeystrokes] = useState([]);
//   const [mouseData, setMouseData] = useState([]);
//   const [time, setTime] = useState(150);
//   const [isTyping, setIsTyping] = useState(false);
//   const [isCompleted, setIsCompleted] = useState(false);

//   const keyDownTimes = useRef({});
//   const lastKeyTime = useRef(null);

//   // 🔐 USER CHECK
//   useEffect(() => {
//     console.log("USER:", user);
//     console.log("USER ID:", userId);

//     if (!userId) {
//       navigate("/");
//     }
//   }, [userId, navigate]);

//   // ⏱ TIMER
//   useEffect(() => {
//     let timer;
//     if (isTyping && time > 0) {
//       timer = setInterval(() => {
//         setTime((t) => t - 1);
//       }, 1000);
//     }
//     return () => clearInterval(timer);
//   }, [isTyping, time]);

//   const handleKeyDown = (e) => {
//     const now = Date.now();
//     keyDownTimes.current[e.key] = now;

//     const delay = lastKeyTime.current ? now - lastKeyTime.current : 0;

//     setKeystrokes((prev) => [
//       ...prev,
//       { key: e.key, type: "down", time: now, delayFromLastKey: delay },
//     ]);

//     lastKeyTime.current = now;
//   };

//   const handleKeyUp = (e) => {
//     const now = Date.now();
//     const holdTime = now - (keyDownTimes.current[e.key] || now);

//     setKeystrokes((prev) => [
//       ...prev,
//       { key: e.key, type: "up", time: now, holdTime },
//     ]);
//   };

//   const handleChange = (e) => {
//     setInput(e.target.value);
//     if (!isTyping) setIsTyping(true);
//   };

//   // 🖱 MOUSE TRACK
//   useEffect(() => {
//     const move = (e) =>
//       setMouseData((prev) => [
//         ...prev,
//         { type: "move", x: e.clientX, y: e.clientY, time: Date.now() },
//       ]);

//     const click = (e) =>
//       setMouseData((prev) => [
//         ...prev,
//         { type: "click", x: e.clientX, y: e.clientY, time: Date.now() },
//       ]);

//     window.addEventListener("mousemove", move);
//     window.addEventListener("click", click);

//     return () => {
//       window.removeEventListener("mousemove", move);
//       window.removeEventListener("click", click);
//     };
//   }, []);

//   const words = input.trim().split(/\s+/).filter(Boolean).length;
//   const characters = input.length;

//   const minutes = Math.floor(time / 60);
//   const seconds = time % 60;

//   // 🚀 SUBMIT
//   const handleSubmit = async () => {
//     if (!input.trim()) {
//       toast.warning("⚠️ Please start typing!");
//       return;
//     }

//     try {
//       // ✅ SAVE DATA
//       await fetch("http://localhost:5000/training-data", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId,
//           typedText: input,
//           keystrokes,
//           mouseData,
//         }),
//       });

//       // ✅ UPDATE DB
//       await fetch("http://localhost:5000/complete-training", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ userId }),
//       });

//       // ✅ IMPORTANT: localStorage update (THIS FIXES YOUR ISSUE)
//       localStorage.setItem("trainingCompleted", "true");

//       toast.success("✅ Training Completed!");

//       setIsCompleted(true);

//       setTimeout(() => {
//         navigate("/app/dashboard");
//       }, 1000);

//     } catch (err) {
//       console.log(err);
//       toast.error("❌ Server error!");
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     toast.error("❌ Paste not allowed!");
//   };

//   // ✅ COMPLETED SCREEN
//   if (isCompleted) {
//     return (
//       <div className="training-page disabled-mode">
//         <h2>🚫 Training Completed</h2>
//         <p>Redirecting to Dashboard...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="training-page">
//       <h2>Keystroke Training</h2>

//       <h1 className="timer">
//         {String(minutes).padStart(2, "0")}:
//         {String(seconds).padStart(2, "0")}
//       </h1>

//       <p className="sentence">{targetText}</p>

//       <textarea
//         value={input}
//         placeholder="Start typing the given sentence here..."
//         onChange={handleChange}
//         onKeyDown={handleKeyDown}
//         onKeyUp={handleKeyUp}
//         onPaste={handlePaste}
//         disabled={time === 0 || isCompleted}
//       />

//       <div className="stats">
//         <span>Words: {words}</span>
//         <span>Characters: {characters}</span>
//       </div>

//       <button
//         className="submit"
//         onClick={handleSubmit}
//         disabled={isCompleted}
//       >
//         Submit Data
//       </button>

//       <ToastContainer />
//     </div>
//   );
// }

// export default Training;
























// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Training.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Training() {
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user") || "{}");
//   const userId = user?.id;

//   const targetText =
//     "The quick fox jumps over the lazy dog while typing continuously with different speeds using shift keys, numbers like 12345, and symbols like @#&* to capture accurate keystroke timing and mouse movements.";

//   const [input, setInput] = useState("");
//   const [keystrokes, setKeystrokes] = useState([]);
//   const [mouseData, setMouseData] = useState([]);
//   const [time, setTime] = useState(150);
//   const [isTyping, setIsTyping] = useState(false);
//   const [isCompleted, setIsCompleted] = useState(false);

//   const keyDownTimes = useRef({});
//   const lastKeyTime = useRef(null);

//   // 🔐 USER CHECK
//   useEffect(() => {
//     if (!userId) {
//       navigate("/");
//     }
//   }, [userId, navigate]);

//   // ⏱ TIMER
//   useEffect(() => {
//     let timer;
//     if (isTyping && time > 0) {
//       timer = setInterval(() => {
//         setTime((t) => t - 1);
//       }, 1000);
//     }
//     return () => clearInterval(timer);
//   }, [isTyping, time]);

//   const handleKeyDown = (e) => {
//     const now = Date.now();
//     keyDownTimes.current[e.key] = now;

//     const delay = lastKeyTime.current ? now - lastKeyTime.current : 0;

//     setKeystrokes((prev) => [
//       ...prev,
//       { key: e.key, type: "down", time: now, delayFromLastKey: delay },
//     ]);

//     lastKeyTime.current = now;
//   };

//   const handleKeyUp = (e) => {
//     const now = Date.now();
//     const holdTime = now - (keyDownTimes.current[e.key] || now);

//     setKeystrokes((prev) => [
//       ...prev,
//       { key: e.key, type: "up", time: now, holdTime },
//     ]);
//   };

//   const handleChange = (e) => {
//     setInput(e.target.value);
//     if (!isTyping) setIsTyping(true);
//   };

//   // 🖱 MOUSE TRACK
//   useEffect(() => {
//     const move = (e) =>
//       setMouseData((prev) => [
//         ...prev,
//         { type: "move", x: e.clientX, y: e.clientY, time: Date.now() },
//       ]);

//     const click = (e) =>
//       setMouseData((prev) => [
//         ...prev,
//         { type: "click", x: e.clientX, y: e.clientY, time: Date.now() },
//       ]);

//     window.addEventListener("mousemove", move);
//     window.addEventListener("click", click);

//     return () => {
//       window.removeEventListener("mousemove", move);
//       window.removeEventListener("click", click);
//     };
//   }, []);

//   const handleSubmit = async () => {
//     if (!input.trim()) {
//       toast.warning("⚠️ Please start typing!");
//       return;
//     }

//     try {
//       // 🚀 ONLY SEND TO MODULE 2 (NOT DB)
//       const response = await fetch(
//         "http://127.0.0.1:5000/api/behavior/receive",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             // userId,
//             userId: user?.username || userId,   // 👈 NAME ADDED SAFELY
//             typedText: input,
//             keystrokes,
//             mouseData,
//           }),
//         }
//       );

//       const result = await response.json();

//       console.log("Module 2 Response:", result);

//       toast.success("✅ Data sent to AI pipeline!");

//       setIsCompleted(true);

//       setTimeout(() => {
//         navigate("/app/dashboard");
//       }, 1000);
//     } catch (err) {
//       console.log(err);
//       toast.error("❌ Server error!");
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     toast.error("❌ Paste not allowed!");
//   };

//   if (isCompleted) {
//     return (
//       <div className="training-page disabled-mode">
//         <h2>🚫 Training Completed</h2>
//         <p>Processing via AI Pipeline...</p>
//       </div>
//     );
//   }

//   const words = input.trim().split(/\s+/).filter(Boolean).length;
//   const characters = input.length;

//   const minutes = Math.floor(time / 60);
//   const seconds = time % 60;

//   return (
//     <div className="training-page">
//       <h2>Keystroke Training (AI Pipeline)</h2>

//       <h1 className="timer">
//         {String(minutes).padStart(2, "0")}:
//         {String(seconds).padStart(2, "0")}
//       </h1>

//       <p className="sentence">{targetText}</p>

//       <textarea
//         value={input}
//         placeholder="Start typing..."
//         onChange={handleChange}
//         onKeyDown={handleKeyDown}
//         onKeyUp={handleKeyUp}
//         onPaste={handlePaste}
//         disabled={time === 0 || isCompleted}
//       />

//       <div className="stats">
//         <span>Words: {words}</span>
//         <span>Characters: {characters}</span>
//       </div>

//       <button className="submit" onClick={handleSubmit}>
//         Submit to AI Pipeline
//       </button>

//       <ToastContainer />
//     </div>
//   );
// }

// export default Training;






























// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Training.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Training() {
//   const navigate = useNavigate();

//   // ✅ FIX: safe parsing
//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   // ✅ FIX: fallback support (id or username)
//   const userId = user?.id || user?.username;

//   const targetText =
//     "The quick fox jumps over the lazy dog while typing continuously with different speeds using shift keys, numbers like 12345, and symbols like @#&* to capture accurate keystroke timing and mouse movements.";

//   const [input, setInput] = useState("");
//   const [keystrokes, setKeystrokes] = useState([]);
//   const [mouseData, setMouseData] = useState([]);
//   const [time, setTime] = useState(150);
//   const [isTyping, setIsTyping] = useState(false);
//   const [isCompleted, setIsCompleted] = useState(false);

//   const keyDownTimes = useRef({});
//   const lastKeyTime = useRef(null);

//   // 🔐 USER CHECK
//   useEffect(() => {
//     if (!userId) {
//       navigate("/");
//     }
//   }, [userId, navigate]);

//   // ⏱ TIMER
//   useEffect(() => {
//     let timer;
//     if (isTyping && time > 0) {
//       timer = setInterval(() => {
//         setTime((t) => t - 1);
//       }, 1000);
//     }
//     return () => clearInterval(timer);
//   }, [isTyping, time]);

//   const handleKeyDown = (e) => {
//     const now = Date.now();
//     keyDownTimes.current[e.key] = now;

//     const delay = lastKeyTime.current ? now - lastKeyTime.current : 0;

//     setKeystrokes((prev) => [
//       ...prev,
//       { key: e.key, type: "down", time: now, delayFromLastKey: delay },
//     ]);

//     lastKeyTime.current = now;
//   };

//   const handleKeyUp = (e) => {
//     const now = Date.now();
//     const holdTime = now - (keyDownTimes.current[e.key] || now);

//     setKeystrokes((prev) => [
//       ...prev,
//       { key: e.key, type: "up", time: now, holdTime },
//     ]);
//   };

//   const handleChange = (e) => {
//     setInput(e.target.value);
//     if (!isTyping) setIsTyping(true);
//   };

//   // 🖱 MOUSE TRACK
//   useEffect(() => {
//     const move = (e) =>
//       setMouseData((prev) => [
//         ...prev,
//         { type: "move", x: e.clientX, y: e.clientY, time: Date.now() },
//       ]);

//     const click = (e) =>
//       setMouseData((prev) => [
//         ...prev,
//         { type: "click", x: e.clientX, y: e.clientY, time: Date.now() },
//       ]);

//     window.addEventListener("mousemove", move);
//     window.addEventListener("click", click);

//     return () => {
//       window.removeEventListener("mousemove", move);
//       window.removeEventListener("click", click);
//     };
//   }, []);

//   const handleSubmit = async () => {
//     if (!input.trim()) {
//       toast.warning("⚠️ Please start typing!");
//       return;
//     }

//     try {
//       const response = await fetch(
//         "http://127.0.0.1:5000/api/behavior/receive",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             userId: userId, // ✅ FIXED SAFE VALUE
//             typedText: input,
//             keystrokes,
//             mouseData,
//           }),
//         }
//       );

//       const result = await response.json();

//       console.log("Module 2 Response:", result);

//       toast.success("✅ Data sent to AI pipeline!");

//       setIsCompleted(true);

//       setTimeout(() => {
//         navigate("/app/dashboard");
//       }, 1000);
//     } catch (err) {
//       console.log(err);
//       toast.error("❌ Server error!");
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     toast.error("❌ Paste not allowed!");
//   };

//   if (isCompleted) {
//     return (
//       <div className="training-page disabled-mode">
//         <h2>🚫 Training Completed</h2>
//         <p>Processing via AI Pipeline...</p>
//       </div>
//     );
//   }

//   const words = input.trim().split(/\s+/).filter(Boolean).length;
//   const characters = input.length;

//   const minutes = Math.floor(time / 60);
//   const seconds = time % 60;

//   return (
//     <div className="training-page">
//       <h2>Keystroke Training (AI Pipeline)</h2>

//       <h1 className="timer">
//         {String(minutes).padStart(2, "0")}:
//         {String(seconds).padStart(2, "0")}
//       </h1>

//       <p className="sentence">{targetText}</p>

//       <textarea
//         value={input}
//         placeholder="Start typing..."
//         onChange={handleChange}
//         onKeyDown={handleKeyDown}
//         onKeyUp={handleKeyUp}
//         onPaste={handlePaste}
//         disabled={time === 0 || isCompleted}
//       />

//       <div className="stats">
//         <span>Words: {words}</span>
//         <span>Characters: {characters}</span>
//       </div>

//       <button className="submit" onClick={handleSubmit}>
//         Submit to AI Pipeline
//       </button>

//       <ToastContainer />
//     </div>
//   );
// }

// export default Training;





















// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Training.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Training() {
//   const navigate = useNavigate();

//   // ✅ SAFE USER PARSE
//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   // ✅ FIX: ONLY REAL USER ID (NO FALLBACK TO USERNAME)
//   const userId = user?.id;

//   const targetText =
//     "The quick fox jumps over the lazy dog while typing continuously with different speeds using shift keys, numbers like 12345, and symbols like @#&* to capture accurate keystroke timing and mouse movements.";

//   const [input, setInput] = useState("");
//   const [keystrokes, setKeystrokes] = useState([]);
//   const [mouseData, setMouseData] = useState([]);
//   const [time, setTime] = useState(150);
//   const [isTyping, setIsTyping] = useState(false);
//   const [isCompleted, setIsCompleted] = useState(false);

//   const keyDownTimes = useRef({});
//   const lastKeyTime = useRef(null);

//   // 🔐 USER CHECK
//   useEffect(() => {
//     if (!userId) {
//       navigate("/");
//     }
//   }, [userId, navigate]);

//   // ⏱ TIMER
//   useEffect(() => {
//     let timer;
//     if (isTyping && time > 0) {
//       timer = setInterval(() => {
//         setTime((t) => t - 1);
//       }, 1000);
//     }
//     return () => clearInterval(timer);
//   }, [isTyping, time]);

//   const handleKeyDown = (e) => {
//     const now = Date.now();
//     keyDownTimes.current[e.key] = now;

//     const delay = lastKeyTime.current ? now - lastKeyTime.current : 0;

//     setKeystrokes((prev) => [
//       ...prev,
//       { key: e.key, type: "down", time: now, delayFromLastKey: delay },
//     ]);

//     lastKeyTime.current = now;
//   };

//   const handleKeyUp = (e) => {
//     const now = Date.now();
//     const holdTime = now - (keyDownTimes.current[e.key] || now);

//     setKeystrokes((prev) => [
//       ...prev,
//       { key: e.key, type: "up", time: now, holdTime },
//     ]);
//   };

//   const handleChange = (e) => {
//     setInput(e.target.value);
//     if (!isTyping) setIsTyping(true);
//   };

//   // 🖱 MOUSE TRACK
//   useEffect(() => {
//     const move = (e) =>
//       setMouseData((prev) => [
//         ...prev,
//         { type: "move", x: e.clientX, y: e.clientY, time: Date.now() },
//       ]);

//     const click = (e) =>
//       setMouseData((prev) => [
//         ...prev,
//         { type: "click", x: e.clientX, y: e.clientY, time: Date.now() },
//       ]);

//     window.addEventListener("mousemove", move);
//     window.addEventListener("click", click);

//     return () => {
//       window.removeEventListener("mousemove", move);
//       window.removeEventListener("click", click);
//     };
//   }, []);

//   // 🚀 SUBMIT
//   const handleSubmit = async () => {
//     if (!input.trim()) {
//       toast.warning("⚠️ Please start typing!");
//       return;
//     }

//     try {
//       const response = await fetch(
//         "http://127.0.0.1:5000/api/behavior/receive",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             userId: userId, // ✅ CLEAN & CORRECT
//             typedText: input,
//             keystrokes,
//             mouseData,
//           }),
//         }
//       );

//       const result = await response.json();

//       console.log("Module 2 Response:", result);

//       toast.success("✅ Data sent to AI pipeline!");

//       setIsCompleted(true);

//       setTimeout(() => {
//         navigate("/app/dashboard");
//       }, 1000);
//     } catch (err) {
//       console.log(err);
//       toast.error("❌ Server error!");
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     toast.error("❌ Paste not allowed!");
//   };

//   if (isCompleted) {
//     return (
//       <div className="training-page disabled-mode">
//         <h2>🚫 Training Completed</h2>
//         <p>Processing via AI Pipeline...</p>
//       </div>
//     );
//   }

//   const words = input.trim().split(/\s+/).filter(Boolean).length;
//   const characters = input.length;

//   const minutes = Math.floor(time / 60);
//   const seconds = time % 60;

//   return (
//     <div className="training-page">
//       <h2>Keystroke Training (AI Pipeline)</h2>

//       <h1 className="timer">
//         {String(minutes).padStart(2, "0")}:
//         {String(seconds).padStart(2, "0")}
//       </h1>

//       <p className="sentence">{targetText}</p>

//       <textarea
//         value={input}
//         placeholder="Start typing..."
//         onChange={handleChange}
//         onKeyDown={handleKeyDown}
//         onKeyUp={handleKeyUp}
//         onPaste={handlePaste}
//         disabled={time === 0 || isCompleted}
//       />

//       <div className="stats">
//         <span>Words: {words}</span>
//         <span>Characters: {characters}</span>
//       </div>

//       <button className="submit" onClick={handleSubmit}>
//         Submit to AI Pipeline
//       </button>

//       <ToastContainer />
//     </div>
//   );
// }

// export default Training;





















// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Training.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Training() {
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user") || "{}");
//   const userId = user?.id;

//   const targetText =
//     "The quick fox jumps over the lazy dog while typing continuously with different speeds using shift keys, numbers like 12345, and symbols like @#&* to capture accurate keystroke timing and mouse movements.";

//   const [input, setInput] = useState("");
//   const [keystrokes, setKeystrokes] = useState([]);
//   const [mouseData, setMouseData] = useState([]);
//   const [time, setTime] = useState(150);
//   const [isTyping, setIsTyping] = useState(false);
//   const [isCompleted, setIsCompleted] = useState(false);

//   const keyDownTimes = useRef({});
//   const lastKeyTime = useRef(null);

//   useEffect(() => {
//     if (!userId) {
//       navigate("/");
//     }
//   }, [userId, navigate]);

//   useEffect(() => {
//     let timer;
//     if (isTyping && time > 0) {
//       timer = setInterval(() => {
//         setTime((t) => t - 1);
//       }, 1000);
//     }
//     return () => clearInterval(timer);
//   }, [isTyping, time]);

//   const handleKeyDown = (e) => {
//     const now = Date.now();
//     keyDownTimes.current[e.key] = now;

//     const delay = lastKeyTime.current ? now - lastKeyTime.current : 0;

//     setKeystrokes((prev) => [
//       ...prev,
//       { key: e.key, type: "down", time: now, delayFromLastKey: delay },
//     ]);

//     lastKeyTime.current = now;
//   };

//   const handleKeyUp = (e) => {
//     const now = Date.now();
//     const holdTime = now - (keyDownTimes.current[e.key] || now);

//     setKeystrokes((prev) => [
//       ...prev,
//       { key: e.key, type: "up", time: now, holdTime },
//     ]);
//   };

//   const handleChange = (e) => {
//     setInput(e.target.value);
//     if (!isTyping) setIsTyping(true);
//   };

//   useEffect(() => {
//     const move = (e) =>
//       setMouseData((prev) => [
//         ...prev,
//         { type: "move", x: e.clientX, y: e.clientY, time: Date.now() },
//       ]);

//     const click = (e) =>
//       setMouseData((prev) => [
//         ...prev,
//         { type: "click", x: e.clientX, y: e.clientY, time: Date.now() },
//       ]);

//     window.addEventListener("mousemove", move);
//     window.addEventListener("click", click);

//     return () => {
//       window.removeEventListener("mousemove", move);
//       window.removeEventListener("click", click);
//     };
//   }, []);

//   const handleSubmit = async () => {
//     if (!input.trim()) {
//       toast.warning("⚠️ Please start typing!");
//       return;
//     }

//     try {
//       const response = await fetch(
//         "http://127.0.0.1:5000/api/behavior/receive",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             userId: userId,
//             typedText: input,
//             keystrokes,
//             mouseData,
//           }),
//         }
//       );

//       const result = await response.json();
//       console.log("Module 2 Response:", result);

//       toast.success("✅ Data sent to AI pipeline!");

//       // 🔥 FIX 1: LOCK TRAINING IMMEDIATELY
//       setIsCompleted(true);

//       // 🔥 FIX 2: SAVE STATUS
//       localStorage.setItem("trainingCompleted", "true");

//       // 🔥 FIX 3: CLEAN NAVIGATION AFTER LOCK
//       setTimeout(() => {
//         navigate("/app/dashboard");
//       }, 800);

//     } catch (err) {
//       console.log(err);
//       toast.error("❌ Server error!");
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     toast.error("❌ Paste not allowed!");
//   };

//   // 🔥 FIX 4: AUTO BLOCK IF ALREADY DONE
//   useEffect(() => {
//     if (localStorage.getItem("trainingCompleted") === "true") {
//       setIsCompleted(true);
//       navigate("/app/dashboard");
//     }
//   }, []);

//   // 🔥 FIX 5: FULL LOCK VIEW (IMPORTANT)
//   if (isCompleted) {
//     return (
//       <div className="training-page disabled-mode">
//         <h2>🚫 Training Completed</h2>
//         <p>Redirecting to Dashboard...</p>
//       </div>
//     );
//   }

//   const words = input.trim().split(/\s+/).filter(Boolean).length;
//   const characters = input.length;

//   const minutes = Math.floor(time / 60);
//   const seconds = time % 60;

//   return (
//     <div className="training-page">
//       <h2>Keystroke Training (AI Pipeline)</h2>

//       <h1 className="timer">
//         {String(minutes).padStart(2, "0")}:
//         {String(seconds).padStart(2, "0")}
//       </h1>

//       <p className="sentence">{targetText}</p>

//       <textarea
//         value={input}
//         placeholder="Start typing..."
//         onChange={handleChange}
//         onKeyDown={handleKeyDown}
//         onKeyUp={handleKeyUp}
//         onPaste={handlePaste}
//         disabled={time === 0 || isCompleted}
//       />

//       <div className="stats">
//         <span>Words: {words}</span>
//         <span>Characters: {characters}</span>
//       </div>

//       <button className="submit" onClick={handleSubmit}>
//         Submit to AI Pipeline
//       </button>

//       <ToastContainer />
//     </div>
//   );
// }

// export default Training;













// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Training.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Training() {
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user") || "{}");
//   const userId = user?.id;

//   const targetText =
//     "The quick fox jumps over the lazy dog while typing continuously with different speeds using shift keys, numbers like 12345, and symbols like @#&* to capture accurate keystroke timing and mouse movements.";

//   const [input, setInput] = useState("");
//   const [keystrokes, setKeystrokes] = useState([]);
//   const [mouseData, setMouseData] = useState([]);
//   const [time, setTime] = useState(150);
//   const [isTyping, setIsTyping] = useState(false);
//   const [isCompleted, setIsCompleted] = useState(false);

//   const keyDownTimes = useRef({});
//   const lastKeyTime = useRef(null);

//   // 🔥 FIX 1: backend status check (auto close)
//   useEffect(() => {
//     const checkStatus = async () => {
//       if (!userId) return;

//       try {
//         const res = await fetch(
//           `http://localhost:5000/user-status/${userId}`
//         );
//         const data = await res.json();

//         if (data.trainingCompleted) {
//           setIsCompleted(true);
//           navigate("/app/dashboard");
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     checkStatus();
//   }, [userId, navigate]);

//   // redirect if no user
//   useEffect(() => {
//     if (!userId) {
//       navigate("/");
//     }
//   }, [userId, navigate]);

//   // timer
//   useEffect(() => {
//     let timer;
//     if (isTyping && time > 0) {
//       timer = setInterval(() => {
//         setTime((t) => t - 1);
//       }, 1000);
//     }
//     return () => clearInterval(timer);
//   }, [isTyping, time]);

//   const handleKeyDown = (e) => {
//     const now = Date.now();
//     keyDownTimes.current[e.key] = now;

//     const delay = lastKeyTime.current ? now - lastKeyTime.current : 0;

//     setKeystrokes((prev) => [
//       ...prev,
//       { key: e.key, type: "down", time: now, delayFromLastKey: delay },
//     ]);

//     lastKeyTime.current = now;
//   };

//   const handleKeyUp = (e) => {
//     const now = Date.now();
//     const holdTime = now - (keyDownTimes.current[e.key] || now);

//     setKeystrokes((prev) => [
//       ...prev,
//       { key: e.key, type: "up", time: now, holdTime },
//     ]);
//   };

//   const handleChange = (e) => {
//     setInput(e.target.value);
//     if (!isTyping) setIsTyping(true);
//   };

//   useEffect(() => {
//     const move = (e) =>
//       setMouseData((prev) => [
//         ...prev,
//         { type: "move", x: e.clientX, y: e.clientY, time: Date.now() },
//       ]);

//     const click = (e) =>
//       setMouseData((prev) => [
//         ...prev,
//         { type: "click", x: e.clientX, y: e.clientY, time: Date.now() },
//       ]);

//     window.addEventListener("mousemove", move);
//     window.addEventListener("click", click);

//     return () => {
//       window.removeEventListener("mousemove", move);
//       window.removeEventListener("click", click);
//     };
//   }, []);

//   const handleSubmit = async () => {
//     if (!input.trim()) {
//       toast.warning("⚠️ Please start typing!");
//       return;
//     }

//     try {
//       const response = await fetch(
//         "http://127.0.0.1:5000/api/behavior/receive",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             userId: userId,
//             typedText: input,
//             keystrokes,
//             mouseData,
//           }),
//         }
//       );

//       const result = await response.json();
//       console.log("Module 2 Response:", result);

//       toast.success("✅ Data sent to AI pipeline!");

//       // 🔥 FIX 2: backend complete trigger (IMPORTANT)
//       await fetch("http://localhost:5000/complete-training", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId }),
//       });

//       setIsCompleted(true);

//       setTimeout(() => {
//         navigate("/app/dashboard");
//       }, 500);

//     } catch (err) {
//       console.log(err);
//       toast.error("❌ Server error!");
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     toast.error("❌ Paste not allowed!");
//   };

//   const words = input.trim().split(/\s+/).filter(Boolean).length;
//   const characters = input.length;

//   const minutes = Math.floor(time / 60);
//   const seconds = time % 60;

//   if (isCompleted) {
//     return (
//       <div className="training-page disabled-mode">
//         <h2>🚫 Training Completed</h2>
//         <p>Redirecting to Dashboard...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="training-page">
//       <h2>Keystroke Training (AI Pipeline)</h2>

//       <h1 className="timer">
//         {String(minutes).padStart(2, "0")}:
//         {String(seconds).padStart(2, "0")}
//       </h1>

//       <p className="sentence">{targetText}</p>

//       <textarea
//         value={input}
//         placeholder="Start typing..."
//         onChange={handleChange}
//         onKeyDown={handleKeyDown}
//         onKeyUp={handleKeyUp}
//         onPaste={handlePaste}
//         disabled={time === 0 || isCompleted}
//       />

//       <div className="stats">
//         <span>Words: {words}</span>
//         <span>Characters: {characters}</span>
//       </div>

//       <button className="submit" onClick={handleSubmit}>
//         Submit to AI Pipeline
//       </button>

//       <ToastContainer />
//     </div>
//   );
// }

// export default Training;
















// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Training.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Training() {
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user") || "{}");
//   const userId = user?.id;

//   const targetText =
//     "The quick fox jumps over the lazy dog while typing continuously with different speeds using shift keys, numbers like 12345, and symbols like @#&* to capture accurate keystroke timing and mouse movements.";

//   const [input, setInput] = useState("");
//   const [keystrokes, setKeystrokes] = useState([]);
//   const [mouseData, setMouseData] = useState([]);
//   const [time, setTime] = useState(150);
//   const [isTyping, setIsTyping] = useState(false);
//   const [isCompleted, setIsCompleted] = useState(false);

//   const keyDownTimes = useRef({});
//   const lastKeyTime = useRef(null);

//   // 🔥 FIX 1: AUTO CLOSE IF ALREADY COMPLETED
//   useEffect(() => {
//     const checkStatus = async () => {
//       if (!userId) return;

//       try {
//         const res = await fetch(
//           `http://localhost:5000/user-status/${userId}`
//         );
//         const data = await res.json();

//         if (data.trainingCompleted === true) {
//           setIsCompleted(true);
//           navigate("/app/dashboard");
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     checkStatus();
//   }, [userId, navigate]);

//   // redirect if no user
//   useEffect(() => {
//     if (!userId) {
//       navigate("/");
//     }
//   }, [userId, navigate]);

//   // timer
//   useEffect(() => {
//     let timer;
//     if (isTyping && time > 0) {
//       timer = setInterval(() => {
//         setTime((t) => t - 1);
//       }, 1000);
//     }
//     return () => clearInterval(timer);
//   }, [isTyping, time]);

//   const handleKeyDown = (e) => {
//     const now = Date.now();
//     keyDownTimes.current[e.key] = now;

//     const delay = lastKeyTime.current ? now - lastKeyTime.current : 0;

//     setKeystrokes((prev) => [
//       ...prev,
//       { key: e.key, type: "down", time: now, delayFromLastKey: delay },
//     ]);

//     lastKeyTime.current = now;
//   };

//   const handleKeyUp = (e) => {
//     const now = Date.now();
//     const holdTime = now - (keyDownTimes.current[e.key] || now);

//     setKeystrokes((prev) => [
//       ...prev,
//       { key: e.key, type: "up", time: now, holdTime },
//     ]);
//   };

//   const handleChange = (e) => {
//     setInput(e.target.value);
//     if (!isTyping) setIsTyping(true);
//   };

//   useEffect(() => {
//     const move = (e) =>
//       setMouseData((prev) => [
//         ...prev,
//         { type: "move", x: e.clientX, y: e.clientY, time: Date.now() },
//       ]);

//     const click = (e) =>
//       setMouseData((prev) => [
//         ...prev,
//         { type: "click", x: e.clientX, y: e.clientY, time: Date.now() },
//       ]);

//     window.addEventListener("mousemove", move);
//     window.addEventListener("click", click);

//     return () => {
//       window.removeEventListener("mousemove", move);
//       window.removeEventListener("click", click);
//     };
//   }, []);

//   const handleSubmit = async () => {
//     if (!input.trim()) {
//       toast.warning("⚠️ Please start typing!");
//       return;
//     }

//     try {
//       await fetch("http://127.0.0.1:5000/api/behavior/receive", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId,
//           typedText: input,
//           keystrokes,
//           mouseData,
//         }),
//       });

//       toast.success("✅ Data sent!");

//       // 🔥 COMPLETE TRAINING MARK
//       await fetch("http://localhost:5000/complete-training", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId }),
//       });

//       // 🔥 AUTO CLOSE TRIGGER
//       setIsCompleted(true);

//       setTimeout(() => {
//         navigate("/app/dashboard");
//       }, 500);

//     } catch (err) {
//       console.log(err);
//       toast.error("❌ Server error!");
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     toast.error("❌ Paste not allowed!");
//   };

//   const words = input.trim().split(/\s+/).filter(Boolean).length;
//   const characters = input.length;

//   const minutes = Math.floor(time / 60);
//   const seconds = time % 60;

//   // 🔥 BLOCK UI AFTER COMPLETION
//   if (isCompleted) {
//     return (
//       <div className="training-page disabled-mode">
//         <h2>🚫 Training Completed</h2>
//         <p>Redirecting to Dashboard...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="training-page">
//       <h2>Keystroke Training (AI Pipeline)</h2>

//       <h1 className="timer">
//         {String(minutes).padStart(2, "0")}:
//         {String(seconds).padStart(2, "0")}
//       </h1>

//       <p className="sentence">{targetText}</p>

//       <textarea
//         value={input}
//         placeholder="Start typing..."
//         onChange={handleChange}
//         onKeyDown={handleKeyDown}
//         onKeyUp={handleKeyUp}
//         onPaste={handlePaste}
//         disabled={time === 0 || isCompleted}
//       />

//       <div className="stats">
//         <span>Words: {words}</span>
//         <span>Characters: {characters}</span>
//       </div>

//       <button className="submit" onClick={handleSubmit}>
//         Submit to AI Pipeline
//       </button>

//       <ToastContainer />
//     </div>
//   );
// }

// export default Training;



















import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Training.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Training() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id;

  const targetText =
    "The quick fox jumps over the lazy dog while typing continuously with different speeds using shift keys, numbers like 12345, and symbols like @#&* to capture accurate keystroke timing and mouse movements.";

  const [input, setInput] = useState("");
  const [keystrokes, setKeystrokes] = useState([]);
  const [mouseData, setMouseData] = useState([]);
  const [time, setTime] = useState(150);
  const [isTyping, setIsTyping] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const keyDownTimes = useRef({});
  const lastKeyTime = useRef(null);

  // ✅ CHECK TRAINING STATUS (IMPORTANT FIX)
  useEffect(() => {
    const checkStatus = async () => {
      if (!userId) return;

      try {
        const res = await fetch(
          `http://localhost:5000/user-status/${userId}`
        );
        const data = await res.json();

        // 🔥 MAIN FIX: if already completed → block training forever
        if (data.trainingCompleted === true) {
          setIsCompleted(true);
          navigate("/app/dashboard");
        }
      } catch (err) {
        console.log(err);
      }
    };

    checkStatus();
  }, [userId, navigate]);

  // redirect if no user
  useEffect(() => {
    if (!userId) navigate("/");
  }, [userId, navigate]);

  // timer
  useEffect(() => {
    let timer;
    if (isTyping && time > 0) {
      timer = setInterval(() => setTime((t) => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isTyping, time]);

  const handleKeyDown = (e) => {
    const now = Date.now();
    keyDownTimes.current[e.key] = now;

    const delay = lastKeyTime.current ? now - lastKeyTime.current : 0;

    setKeystrokes((prev) => [
      ...prev,
      { key: e.key, type: "down", time: now, delayFromLastKey: delay },
    ]);

    lastKeyTime.current = now;
  };

  const handleKeyUp = (e) => {
    const now = Date.now();
    const holdTime = now - (keyDownTimes.current[e.key] || now);

    setKeystrokes((prev) => [
      ...prev,
      { key: e.key, type: "up", time: now, holdTime },
    ]);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    if (!isTyping) setIsTyping(true);
  };

  useEffect(() => {
    const move = (e) =>
      setMouseData((prev) => [
        ...prev,
        { type: "move", x: e.clientX, y: e.clientY, time: Date.now() },
      ]);

    const click = (e) =>
      setMouseData((prev) => [
        ...prev,
        { type: "click", x: e.clientX, y: e.clientY, time: Date.now() },
      ]);

    window.addEventListener("mousemove", move);
    window.addEventListener("click", click);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", click);
    };
  }, []);

  const handleSubmit = async () => {
    if (!input.trim()) {
      toast.warning("⚠️ Please start typing!");
      return;
    }

    try {
      // send data
      await fetch("http://127.0.0.1:5000/api/behavior/receive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          typedText: input,
          keystrokes,
          mouseData,
        }),
      });

      // mark training complete in backend
      await fetch("http://localhost:5000/complete-training", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      toast.success("✅ Training Completed!");

      // 🔥 IMPORTANT FIX: lock training forever
      localStorage.setItem("trainingCompleted", "true");

      setIsCompleted(true);

      // go dashboard
      setTimeout(() => {
        navigate("/app/dashboard");
      }, 500);

    } catch (err) {
      console.log(err);
      toast.error("❌ Server error!");
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    toast.error("❌ Paste not allowed!");
  };

  const words = input.trim().split(/\s+/).filter(Boolean).length;
  const characters = input.length;

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  // 🔥 BLOCK TRAINING PAGE AFTER COMPLETION
  if (isCompleted) {
    return (
      <div className="training-page disabled-mode">
        <h2>🚫 Training Completed</h2>
        <p>Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="training-page">
      <h2>Keystroke Training (AI Pipeline)</h2>

      <h1 className="timer">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </h1>

      <p className="sentence">{targetText}</p>

      <textarea
        value={input}
        placeholder="Start typing..."
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onPaste={handlePaste}
        disabled={isCompleted}
      />

      <div className="stats">
        <span>Words: {words}</span>
        <span>Characters: {characters}</span>
      </div>

      <button className="submit" onClick={handleSubmit}>
        Submit to AI Pipeline
      </button>

      <ToastContainer />
    </div>
  );
}

export default Training;