// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import "./Dashboard.css";

// function Dashboard() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));

//   const [trainingDone, setTrainingDone] = useState(false);

//   useEffect(() => {
//     if (!user) {
//       navigate("/");
//     }
//   }, [user, navigate]);

//   useEffect(() => {
//     const status = localStorage.getItem("trainingCompleted");
//     setTrainingDone(status === "true");
//   }, []);

//   return (
//     <>
//       <h2>Welcome, {user?.name} 👋</h2>

//       <div className="cards">

//         <div className="card training">
//           <h3>Training Model</h3>
//           <p>Train your typing behavior</p>

//           <button
//             onClick={() => navigate("/app/training")}
//             disabled={trainingDone}
//           >
//             {trainingDone ? "Completed ✅" : "Start Training"}
//           </button>

//           <p className="status">
//             Status: {trainingDone ? "✅ Done" : "❌ Not Done"}
//           </p>
//         </div>

//         <div className="card exam">
//           <h3>Online Exam</h3>
//           <p>Real-time monitoring test</p>

//           <button
//             onClick={() => navigate("/app/exam")}
//             disabled={!trainingDone}
//           >
//             {trainingDone ? "Start Exam" : "Locked 🔒"}
//           </button>

//           <p className="status">
//             Status: {trainingDone ? "🔓 Unlocked" : "🔒 Locked"}
//           </p>
//         </div>

//       </div>
//     </>
//   );
// }

// export default Dashboard;














// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import "./Dashboard.css";

// function Dashboard() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));

//   const [trainingDone, setTrainingDone] = useState(false);

//   useEffect(() => {
//     if (!user) {
//       navigate("/");
//     }
//   }, [user, navigate]);

//   // ✅ DB இருந்து fetch
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/user/${user.id}`);
//         const data = await res.json();

//         setTrainingDone(data.trainingCompleted);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     if (user?.id) fetchUser();
//   }, [user]);

//   return (
//     <>
//       <h2>Welcome, {user?.name} 👋</h2>

//       <div className="cards">

//         <div className="card training">
//           <h3>Training Model</h3>
//           <p>Train your typing behavior</p>

//           <button
//             onClick={() => navigate("/app/training")}
//             disabled={trainingDone}
//           >
//             {trainingDone ? "Completed ✅" : "Start Training"}
//           </button>

//           <p className="status">
//             Status: {trainingDone ? "✅ Done" : "❌ Not Done"}
//           </p>
//         </div>

//         <div className="card exam">
//           <h3>Online Exam</h3>
//           <p>Real-time monitoring test</p>

//           <button
//             onClick={() => navigate("/app/exam")}
//             disabled={!trainingDone}
//           >
//             {trainingDone ? "Start Exam" : "Locked 🔒"}
//           </button>

//           <p className="status">
//             Status: {trainingDone ? "🔓 Unlocked" : "🔒 Locked"}
//           </p>
//         </div>

//       </div>
//     </>
//   );
// }

// export default Dashboard;













// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import "./Dashboard.css";

// function Dashboard() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));

//   const [trainingDone, setTrainingDone] = useState(false);

//   // 🔐 Check user login
//   useEffect(() => {
//     if (!user) {
//       navigate("/");
//     }
//   }, [user, navigate]);

//   // ✅ FIXED: Fetch correct API + correct userId
//   useEffect(() => {
//     const fetchStatus = async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:5000/user-status/${user?.userId}`
//         );
//         const data = await res.json();

//         console.log("STATUS:", data); // 🔍 debug

//         setTrainingDone(data.trainingCompleted);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     if (user?.userId) {
//       fetchStatus();
//     }
//   }, [user]);

//   return (
//     <>
//       {/* ✅ FIXED username */}
//       <h2>Welcome, {user?.username} 👋</h2>

//       <div className="cards">

//         {/* 🔵 TRAINING */}
//         <div className="card training">
//           <h3>Training Model</h3>
//           <p>Train your typing behavior</p>

//           <button
//             onClick={() => navigate("/app/training")}
//             disabled={trainingDone}
//           >
//             {trainingDone ? "Completed ✅" : "Start Training"}
//           </button>

//           <p className="status">
//             Status: {trainingDone ? "✅ Done" : "❌ Not Done"}
//           </p>
//         </div>

//         {/* 🟢 EXAM */}
//         <div className="card exam">
//           <h3>Online Exam</h3>
//           <p>Real-time monitoring test</p>

//           <button
//             onClick={() => navigate("/app/exam")}
//             disabled={!trainingDone}
//           >
//             {trainingDone ? "Start Exam" : "Locked 🔒"}
//           </button>

//           <p className="status">
//             Status: {trainingDone ? "🔓 Unlocked" : "🔒 Locked"}
//           </p>
//         </div>

//       </div>
//     </>
//   );
// }

// export default Dashboard;




















import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  // ✅ SAFE USER
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [trainingDone, setTrainingDone] = useState(false);

  // 🔐 LOGIN CHECK
  useEffect(() => {
    if (!user?.id) {
      navigate("/");
    }
  }, [user, navigate]);

  // ✅ FETCH STATUS (FIXED)
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/user-status/${user.id}`   // ✅ FIX HERE
        );
        const data = await res.json();

        console.log("STATUS:", data);

        setTrainingDone(data.trainingCompleted);

        // ✅ optional (fast UI update)
        localStorage.setItem("trainingCompleted", data.trainingCompleted);

      } catch (err) {
        console.log(err);
      }
    };

    if (user?.id) {
      fetchStatus();
    }
  }, [user]);

  return (
    <>
      {/* ✅ FIXED NAME */}
      <h2>Welcome, {user?.name} 👋</h2>

      <div className="cards">

        {/* 🔵 TRAINING */}
        <div className="card training">
          <h3>Training Model</h3>
          <p>Train your typing behavior</p>

          <button
            onClick={() => navigate("/app/training")}
            disabled={trainingDone}
          >
            {trainingDone ? "Completed ✅" : "Start Training"}
          </button>

          <p className="status">
            Status: {trainingDone ? "✅ Done" : "❌ Not Done"}
          </p>
        </div>

        {/* 🟢 EXAM */}
        <div className="card exam">
          <h3>Online Exam</h3>
          <p>Real-time monitoring test</p>

          <button
            onClick={() => navigate("/app/exam")}
            disabled={!trainingDone}
          >
            {trainingDone ? "Start Exam" : "Locked 🔒"}
          </button>

          <p className="status">
            Status: {trainingDone ? "🔓 Unlocked" : "🔒 Locked"}
          </p>
        </div>

      </div>
    </>
  );
}

export default Dashboard;