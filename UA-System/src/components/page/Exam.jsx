

// import "./Exam.css";
// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Exam() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));

//   const trainingDone = localStorage.getItem("trainingCompleted") === "true";

//   const [startExam, setStartExam] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(40 * 60);
//   const [typeAnswers, setTypeAnswers] = useState({});
//   const [mcqAnswers, setMcqAnswers] = useState({});
//   const [keyData, setKeyData] = useState([]);
//   const [mouseData, setMouseData] = useState([]);
//   const [scrollData, setScrollData] = useState([]);

//   const keyDownTime = useRef({});

//   useEffect(() => {
//     if (!trainingDone) {
//       navigate("/app/dashboard", { replace: true });
//     }
//   }, []);

//   useEffect(() => {
//     if (!startExam) return;

//     const interval = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           handleSubmit(); // auto submit
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [startExam]);

//   const handleKeyDown = (e) => {
//     keyDownTime.current[e.key] = Date.now();
//   };

//   const handleKeyUp = (e) => {
//     const start = keyDownTime.current[e.key];
//     const end = Date.now();

//     if (start) {
//       setKeyData((prev) => [
//         ...prev,
//         {
//           key: e.key,
//           holdTime: end - start,
//           time: Date.now(),
//         },
//       ]);
//     }
//   };

//   const handleMouseMove = (e) => {
//     setMouseData((prev) => [
//       ...prev,
//       {
//         type: "move",
//         x: e.clientX,
//         y: e.clientY,
//         time: Date.now(),
//       },
//     ]);
//   };

//   const handleClick = (e) => {
//     setMouseData((prev) => [
//       ...prev,
//       {
//         type: "click",
//         x: e.clientX,
//         y: e.clientY,
//         time: Date.now(),
//       },
//     ]);
//   };

//   const handleScroll = () => {
//     setScrollData((prev) => [
//       ...prev,
//       {
//         scrollY: window.scrollY,
//         time: Date.now(),
//       },
//     ]);
//   };

//   const handleTypeChange = (i, value) => {
//     setTypeAnswers({ ...typeAnswers, [i]: value });
//   };
//   const handleMCQChange = (i, opt) => {
//     setMcqAnswers({ ...mcqAnswers, [i]: opt });
//   };
//   const handleSubmit = async () => {
//     const payload = {
//       userId: user?._id,
//       typeAnswers,
//       mcqAnswers,
//       keyData,
//       mouseData,
//       scrollData,
//     };

//     try {
//       await fetch("http://localhost:5000/api/exam/submit", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       alert("Exam Submitted 🚀");
//       navigate("/app/dashboard");
//     } catch (err) {
//       alert("Submission Failed");
//     }
//   };
//   const formatTime = (sec) => {
//     const m = Math.floor(sec / 60);
//     const s = sec % 60;
//     return `${m}:${s < 10 ? "0" : ""}${s}`;
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     toast.error("❌ Paste not allowed!", {
//     autoClose: 2000,
//   });

//   };
//   const typeQuestions = [
//     "Explain keystroke dynamics.",
//     "What is feature vector in ML?",
//     "Define continuous authentication.",
//     "Role of ML in security systems.",
//     "What is anomaly detection?",
//     "Difference between authentication and authorization?",
//     "What is cybersecurity?"
//   ];

//   const mcqQuestions = [
//     {
//       q: "What does ML stand for?",
//       options: ["Machine Learning", "Manual Logic", "Model Layer", "Memory Link"],
//     },
//     {
//       q: "Keystroke dynamics used for?",
//       options: ["Gaming", "Authentication", "Design", "Networking"],
//     },
//     {
//       q: "Which is backend?",
//       options: ["React", "Node.js", "HTML", "CSS"],
//     },
//     {
//       q: "Which DB is used?",
//       options: ["MongoDB", "Photoshop", "Figma", "Excel"],
//     },
//     {
//       q: "React is?",
//       options: ["Framework", "Library", "Database", "OS"],
//     },
//     {
//       q: "Frontend tool?",
//       options: ["Python", "Java", "React", "C++"],
//     },
//     {
//       q: "Authentication means?",
//       options: ["Login verification", "Design", "Coding", "Styling"],
//     }
//   ];
//   if (!startExam) {
//     return (
//       <div className="popup-overlay">
//         <div className="popup-box">
//           <h2>🧪 FINAL EXAM READY</h2>

//           <p>👤 Name: {user?.name}</p>
//           <p>📧 Email: {user?.email}</p>
//           <p>⏱ Duration: 40 Minutes</p>

//           <div className="popup-actions">
//             <button onClick={() => setStartExam(true)}>Start Exam</button>
//             <button onClick={() => navigate("/app/dashboard")}>Cancel</button>
//           </div>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div
//       className="exam-container"
//       onMouseMove={handleMouseMove}
//       onClick={handleClick}
//       onScroll={handleScroll}
//     >
//       <div className="exam-header">
//         <div>👤 {user?.name}</div>
//         <div><h3>FINAL EXAM</h3></div>
//         <div>⏱ {formatTime(timeLeft)}</div>
//       </div>

//       <h3>Part A - Type Answers</h3>

//       {typeQuestions.map((q, i) => (
//         <div key={i} className="card">
//           <p>{i + 1}. {q}</p>
//           <textarea
//             onChange={(e) => handleTypeChange(i, e.target.value)}
//             onKeyDown={handleKeyDown}
//             onKeyUp={handleKeyUp}
//             onPaste={handlePaste} 
//           />
//         </div>
//       ))}

//       <h3>Part B - MCQ</h3>
//       {mcqQuestions.map((q, i) => (
//         <div key={i} className="card">
//           <p>{i + 8}. {q.q}</p>
//           {q.options.map((opt, idx) => (
//             <label key={idx}>
//               <input
//                 type="radio"
//                 name={`mcq-${i}`}
//                 onChange={() => handleMCQChange(i, opt)}
//               />
//               {opt}
//             </label>
//           ))}
//         </div>
//       ))}
//       <p>Keys: {keyData.length} | Mouse: {mouseData.length} | Scroll: {scrollData.length}</p>
//       <button onClick={handleSubmit}>
//         Submit Exam
//       </button>
//       <ToastContainer autoClose={2000} hideProgressBar={false}    closeButton={false}/>
//     </div>
//   );
// }

// export default Exam;












// import "./Exam.css";
// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Exam() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));

//   // ✅ NEW: backend-based check
//   const [allowed, setAllowed] = useState(false);

//   const [startExam, setStartExam] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(40 * 60);
//   const [typeAnswers, setTypeAnswers] = useState({});
//   const [mcqAnswers, setMcqAnswers] = useState({});
//   const [keyData, setKeyData] = useState([]);
//   const [mouseData, setMouseData] = useState([]);
//   const [scrollData, setScrollData] = useState([]);

//   const keyDownTime = useRef({});

//   // 🔥 CHECK TRAINING STATUS FROM BACKEND
//   useEffect(() => {
//     const userId = user?.userId;

//     if (!userId) {
//       navigate("/");
//       return;
//     }

//     fetch(`http://localhost:5000/user-status/${userId}`)
//       .then(res => res.json())
//       .then(data => {
//         if (data.trainingCompleted) {
//           setAllowed(true);
//         } else {
//           navigate("/app/dashboard", { replace: true });
//         }
//       })
//       .catch(() => {
//         navigate("/app/dashboard");
//       });
//   }, []);

//   // ⏱ TIMER
//   useEffect(() => {
//     if (!startExam) return;

//     const interval = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           handleSubmit();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [startExam]);

//   const handleKeyDown = (e) => {
//     keyDownTime.current[e.key] = Date.now();
//   };

//   const handleKeyUp = (e) => {
//     const start = keyDownTime.current[e.key];
//     const end = Date.now();

//     if (start) {
//       setKeyData((prev) => [
//         ...prev,
//         {
//           key: e.key,
//           holdTime: end - start,
//           time: Date.now(),
//         },
//       ]);
//     }
//   };

//   const handleMouseMove = (e) => {
//     setMouseData((prev) => [
//       ...prev,
//       {
//         type: "move",
//         x: e.clientX,
//         y: e.clientY,
//         time: Date.now(),
//       },
//     ]);
//   };

//   const handleClick = (e) => {
//     setMouseData((prev) => [
//       ...prev,
//       {
//         type: "click",
//         x: e.clientX,
//         y: e.clientY,
//         time: Date.now(),
//       },
//     ]);
//   };

//   const handleScroll = () => {
//     setScrollData((prev) => [
//       ...prev,
//       {
//         scrollY: window.scrollY,
//         time: Date.now(),
//       },
//     ]);
//   };

//   const handleTypeChange = (i, value) => {
//     setTypeAnswers({ ...typeAnswers, [i]: value });
//   };

//   const handleMCQChange = (i, opt) => {
//     setMcqAnswers({ ...mcqAnswers, [i]: opt });
//   };

//   const handleSubmit = async () => {
//     const payload = {
//       userId: user?.userId, // ✅ FIXED
//       typeAnswers,
//       mcqAnswers,
//       keyData,
//       mouseData,
//       scrollData,
//     };

//     try {
//       await fetch("http://localhost:5000/api/exam/submit", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       alert("Exam Submitted 🚀");
//       navigate("/app/dashboard");
//     } catch (err) {
//       alert("Submission Failed");
//     }
//   };

//   const formatTime = (sec) => {
//     const m = Math.floor(sec / 60);
//     const s = sec % 60;
//     return `${m}:${s < 10 ? "0" : ""}${s}`;
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     toast.error("❌ Paste not allowed!", {
//       autoClose: 2000,
//     });
//   };

//   const typeQuestions = [
//     "Explain keystroke dynamics.",
//     "What is feature vector in ML?",
//     "Define continuous authentication.",
//     "Role of ML in security systems.",
//     "What is anomaly detection?",
//     "Difference between authentication and authorization?",
//     "What is cybersecurity?"
//   ];

//   const mcqQuestions = [
//     {
//       q: "What does ML stand for?",
//       options: ["Machine Learning", "Manual Logic", "Model Layer", "Memory Link"],
//     },
//     {
//       q: "Keystroke dynamics used for?",
//       options: ["Gaming", "Authentication", "Design", "Networking"],
//     },
//     {
//       q: "Which is backend?",
//       options: ["React", "Node.js", "HTML", "CSS"],
//     },
//     {
//       q: "Which DB is used?",
//       options: ["MongoDB", "Photoshop", "Figma", "Excel"],
//     },
//     {
//       q: "React is?",
//       options: ["Framework", "Library", "Database", "OS"],
//     },
//     {
//       q: "Frontend tool?",
//       options: ["Python", "Java", "React", "C++"],
//     },
//     {
//       q: "Authentication means?",
//       options: ["Login verification", "Design", "Coding", "Styling"],
//     }
//   ];

//   // 🔒 BLOCK UI
//   if (!allowed) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "100px" }}>
//         <h2>🔒 Exam Locked</h2>
//         <p>Please complete training first</p>
//       </div>
//     );
//   }

//   if (!startExam) {
//     return (
//       <div className="popup-overlay">
//         <div className="popup-box">
//           <h2>🧪 FINAL EXAM READY</h2>

//           <p>👤 Name: {user?.username}</p>
//           <p>⏱ Duration: 40 Minutes</p>

//           <div className="popup-actions">
//             <button onClick={() => setStartExam(true)}>Start Exam</button>
//             <button onClick={() => navigate("/app/dashboard")}>Cancel</button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="exam-container"
//       onMouseMove={handleMouseMove}
//       onClick={handleClick}
//       onScroll={handleScroll}
//     >
//       <div className="exam-header">
//         <div>👤 {user?.username}</div>
//         <div><h3>FINAL EXAM</h3></div>
//         <div>⏱ {formatTime(timeLeft)}</div>
//       </div>

//       <h3>Part A - Type Answers</h3>

//       {typeQuestions.map((q, i) => (
//         <div key={i} className="card">
//           <p>{i + 1}. {q}</p>
//           <textarea
//             onChange={(e) => handleTypeChange(i, e.target.value)}
//             onKeyDown={handleKeyDown}
//             onKeyUp={handleKeyUp}
//             onPaste={handlePaste}
//           />
//         </div>
//       ))}

//       <h3>Part B - MCQ</h3>

//       {mcqQuestions.map((q, i) => (
//         <div key={i} className="card">
//           <p>{i + 8}. {q.q}</p>
//           {q.options.map((opt, idx) => (
//             <label key={idx}>
//               <input
//                 type="radio"
//                 name={`mcq-${i}`}
//                 onChange={() => handleMCQChange(i, opt)}
//               />
//               {opt}
//             </label>
//           ))}
//         </div>
//       ))}

//       <p>
//         Keys: {keyData.length} | Mouse: {mouseData.length} | Scroll: {scrollData.length}
//       </p>

//       <button onClick={handleSubmit}>
//         Submit Exam
//       </button>

//       <ToastContainer autoClose={2000} closeButton={false} />
//     </div>
//   );
// }

// export default Exam;
















// import "./Exam.css";
// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Exam() {
//   const navigate = useNavigate();

//   // ✅ SAFE USER FETCH (no redirect)
//   const user = JSON.parse(localStorage.getItem("user") || "{}");
//   const username = user?.username || "Guest";
//   const userId = user?.userId || "guest_id";

//   const [startExam, setStartExam] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(40 * 60);

//   const [typeAnswers, setTypeAnswers] = useState({});
//   const [mcqAnswers, setMcqAnswers] = useState({});

//   const [keyData, setKeyData] = useState([]);
//   const [mouseData, setMouseData] = useState([]);
//   const [scrollData, setScrollData] = useState([]);

//   const keyDownTime = useRef({});

//   // ⏱ TIMER
//   useEffect(() => {
//     if (!startExam) return;

//     const interval = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           handleSubmit();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [startExam]);

//   // ⌨️ KEYSTROKE TRACK
//   const handleKeyDown = (e) => {
//     keyDownTime.current[e.key] = Date.now();
//   };

//   const handleKeyUp = (e) => {
//     const start = keyDownTime.current[e.key];
//     const end = Date.now();

//     if (start) {
//       setKeyData((prev) => [
//         ...prev,
//         {
//           key: e.key,
//           holdTime: end - start,
//           time: Date.now(),
//         },
//       ]);
//     }
//   };

//   // 🖱️ MOUSE TRACK
//   const handleMouseMove = (e) => {
//     setMouseData((prev) => [
//       ...prev,
//       {
//         type: "move",
//         x: e.clientX,
//         y: e.clientY,
//         time: Date.now(),
//       },
//     ]);
//   };

//   const handleClick = (e) => {
//     setMouseData((prev) => [
//       ...prev,
//       {
//         type: "click",
//         x: e.clientX,
//         y: e.clientY,
//         time: Date.now(),
//       },
//     ]);
//   };

//   // 📜 SCROLL TRACK
//   const handleScroll = () => {
//     setScrollData((prev) => [
//       ...prev,
//       {
//         scrollY: window.scrollY,
//         time: Date.now(),
//       },
//     ]);
//   };

//   // ✍️ ANSWERS
//   const handleTypeChange = (i, value) => {
//     setTypeAnswers({ ...typeAnswers, [i]: value });
//   };

//   const handleMCQChange = (i, opt) => {
//     setMcqAnswers({ ...mcqAnswers, [i]: opt });
//   };

//   // 🚀 SUBMIT
//   const handleSubmit = async () => {
//     const payload = {
//       userId,
//       username, // ✅ added
//       typeAnswers,
//       mcqAnswers,
//       keyData,
//       mouseData,
//       scrollData,
//       submittedAt: new Date(),
//     };

//     try {
//       await fetch("http://localhost:5000/api/exam/submit", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       alert("Exam Submitted 🚀");
//       navigate("/app/dashboard");
//     } catch (err) {
//       alert("Submission Failed");
//     }
//   };

//   // ⏱ FORMAT TIME
//   const formatTime = (sec) => {
//     const m = Math.floor(sec / 60);
//     const s = sec % 60;
//     return `${m}:${s < 10 ? "0" : ""}${s}`;
//   };

//   // ❌ BLOCK PASTE
//   const handlePaste = (e) => {
//     e.preventDefault();
//     toast.error("❌ Paste not allowed!", {
//       autoClose: 2000,
//     });
//   };

//   // QUESTIONS
//   const typeQuestions = [
//     "Explain keystroke dynamics.",
//     "What is feature vector in ML?",
//     "Define continuous authentication.",
//     "Role of ML in security systems.",
//     "What is anomaly detection?",
//     "Difference between authentication and authorization?",
//     "What is cybersecurity?",
//   ];

//   const mcqQuestions = [
//     {
//       q: "What does ML stand for?",
//       options: ["Machine Learning", "Manual Logic", "Model Layer", "Memory Link"],
//     },
//     {
//       q: "Keystroke dynamics used for?",
//       options: ["Gaming", "Authentication", "Design", "Networking"],
//     },
//     {
//       q: "Which is backend?",
//       options: ["React", "Node.js", "HTML", "CSS"],
//     },
//     {
//       q: "Which DB is used?",
//       options: ["MongoDB", "Photoshop", "Figma", "Excel"],
//     },
//     {
//       q: "React is?",
//       options: ["Framework", "Library", "Database", "OS"],
//     },
//     {
//       q: "Frontend tool?",
//       options: ["Python", "Java", "React", "C++"],
//     },
//     {
//       q: "Authentication means?",
//       options: ["Login verification", "Design", "Coding", "Styling"],
//     },
//   ];

//   // START POPUP
//   if (!startExam) {
//     return (
//       <div className="popup-overlay">
//         <div className="popup-box">
//           <h2>🧪 FINAL EXAM READY</h2>

//           <p>👤 Name: {username}</p>
//           <p>⏱ Duration: 40 Minutes</p>

//           <div className="popup-actions">
//             <button onClick={() => setStartExam(true)}>Start Exam</button>
//             <button onClick={() => navigate("/app/dashboard")}>Cancel</button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="exam-container"
//       onMouseMove={handleMouseMove}
//       onClick={handleClick}
//       onScroll={handleScroll}
//     >
//       <div className="exam-header">
//         <div>👤 {username}</div>
//         <div><h3>FINAL EXAM</h3></div>
//         <div>⏱ {formatTime(timeLeft)}</div>
//       </div>

//       <h3>Part A - Type Answers</h3>

//       {typeQuestions.map((q, i) => (
//         <div key={i} className="card">
//           <p>{i + 1}. {q}</p>
//           <textarea
//             onChange={(e) => handleTypeChange(i, e.target.value)}
//             onKeyDown={handleKeyDown}
//             onKeyUp={handleKeyUp}
//             onPaste={handlePaste}
//           />
//         </div>
//       ))}

//       <h3>Part B - MCQ</h3>

//       {mcqQuestions.map((q, i) => (
//         <div key={i} className="card">
//           <p>{i + 8}. {q.q}</p>
//           {q.options.map((opt, idx) => (
//             <label key={idx}>
//               <input
//                 type="radio"
//                 name={`mcq-${i}`}
//                 onChange={() => handleMCQChange(i, opt)}
//               />
//               {opt}
//             </label>
//           ))}
//         </div>
//       ))}

//       <p>
//         Keys: {keyData.length} | Mouse: {mouseData.length} | Scroll: {scrollData.length}
//       </p>

//       <button onClick={handleSubmit}>
//         Submit Exam
//       </button>

//       <ToastContainer autoClose={2000} closeButton={false} />
//     </div>
//   );
// }

// export default Exam;


















import "./Exam.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Exam() {
  const navigate = useNavigate();

  // ✅ SAFE USER FETCH (UPDATED FIX ONLY HERE)
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const username =
    user?.username || user?.name || user?.email || "Guest";

  const userId =
    user?.userId || user?.id || user?._id || "guest_id";

  const [startExam, setStartExam] = useState(false);
  const [timeLeft, setTimeLeft] = useState(40 * 60);

  const [typeAnswers, setTypeAnswers] = useState({});
  const [mcqAnswers, setMcqAnswers] = useState({});

  const [keyData, setKeyData] = useState([]);
  const [mouseData, setMouseData] = useState([]);
  const [scrollData, setScrollData] = useState([]);

  const keyDownTime = useRef({});

  // ⏱ TIMER
  useEffect(() => {
    if (!startExam) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [startExam]);

  // ⌨️ KEYSTROKE TRACK
  const handleKeyDown = (e) => {
    keyDownTime.current[e.key] = Date.now();
  };

  const handleKeyUp = (e) => {
    const start = keyDownTime.current[e.key];
    const end = Date.now();

    if (start) {
      setKeyData((prev) => [
        ...prev,
        {
          key: e.key,
          holdTime: end - start,
          time: Date.now(),
        },
      ]);
    }
  };

  // 🖱️ MOUSE TRACK
  const handleMouseMove = (e) => {
    setMouseData((prev) => [
      ...prev,
      {
        type: "move",
        x: e.clientX,
        y: e.clientY,
        time: Date.now(),
      },
    ]);
  };

  const handleClick = (e) => {
    setMouseData((prev) => [
      ...prev,
      {
        type: "click",
        x: e.clientX,
        y: e.clientY,
        time: Date.now(),
      },
    ]);
  };

  // 📜 SCROLL TRACK
  const handleScroll = () => {
    setScrollData((prev) => [
      ...prev,
      {
        scrollY: window.scrollY,
        time: Date.now(),
      },
    ]);
  };

  // ✍️ ANSWERS
  const handleTypeChange = (i, value) => {
    setTypeAnswers({ ...typeAnswers, [i]: value });
  };

  const handleMCQChange = (i, opt) => {
    setMcqAnswers({ ...mcqAnswers, [i]: opt });
  };

  // 🚀 SUBMIT
  const handleSubmit = async () => {
    const payload = {
      userId,
      username,
      typeAnswers,
      mcqAnswers,
      keyData,
      mouseData,
      scrollData,
      submittedAt: new Date(),
    };

    try {
      await fetch("http://localhost:5000/api/exam/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      alert("Exam Submitted 🚀");
      navigate("/app/dashboard");
    } catch (err) {
      alert("Submission Failed");
    }
  };

  // ⏱ FORMAT TIME
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // ❌ BLOCK PASTE
  const handlePaste = (e) => {
    e.preventDefault();
    toast.error("❌ Paste not allowed!", {
      autoClose: 2000,
    });
  };

  // QUESTIONS
  const typeQuestions = [
    "Explain keystroke dynamics.",
    "What is feature vector in ML?",
    "Define continuous authentication.",
    "Role of ML in security systems.",
    "What is anomaly detection?",
    "Difference between authentication and authorization?",
    "What is cybersecurity?",
  ];

  const mcqQuestions = [
    {
      q: "What does ML stand for?",
      options: ["Machine Learning", "Manual Logic", "Model Layer", "Memory Link"],
    },
    {
      q: "Keystroke dynamics used for?",
      options: ["Gaming", "Authentication", "Design", "Networking"],
    },
    {
      q: "Which is backend?",
      options: ["React", "Node.js", "HTML", "CSS"],
    },
    {
      q: "Which DB is used?",
      options: ["MongoDB", "Photoshop", "Figma", "Excel"],
    },
    {
      q: "React is?",
      options: ["Framework", "Library", "Database", "OS"],
    },
    {
      q: "Frontend tool?",
      options: ["Python", "Java", "React", "C++"],
    },
    {
      q: "Authentication means?",
      options: ["Login verification", "Design", "Coding", "Styling"],
    },
  ];

  // START POPUP
  if (!startExam) {
    return (
      <div className="popup-overlay">
        <div className="popup-box">
          <h2>🧪 FINAL EXAM READY</h2>

          <p>👤 Name: {username}</p>
          <p>⏱ Duration: 40 Minutes</p>

          <div className="popup-actions">
            <button onClick={() => setStartExam(true)}>Start Exam</button>
            <button onClick={() => navigate("/app/dashboard")}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="exam-container"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      onScroll={handleScroll}
    >
      <div className="exam-header">
        <div>👤 {username}</div>
        <div><h3>FINAL EXAM</h3></div>
        <div>⏱ {formatTime(timeLeft)}</div>
      </div>

      <h3>Part A - Type Answers</h3>

      {typeQuestions.map((q, i) => (
        <div key={i} className="card">
          <p>{i + 1}. {q}</p>
          <textarea
            onChange={(e) => handleTypeChange(i, e.target.value)}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onPaste={handlePaste}
          />
        </div>
      ))}

      <h3>Part B - MCQ</h3>

      {mcqQuestions.map((q, i) => (
        <div key={i} className="card">
          <p>{i + 8}. {q.q}</p>
          {q.options.map((opt, idx) => (
            <label key={idx}>
              <input
                type="radio"
                name={`mcq-${i}`}
                onChange={() => handleMCQChange(i, opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}

      <p>
        Keys: {keyData.length} | Mouse: {mouseData.length} | Scroll: {scrollData.length}
      </p>

      <button onClick={handleSubmit}>
        Submit Exam
      </button>

      <ToastContainer autoClose={2000} closeButton={false} />
    </div>
  );
}

export default Exam;