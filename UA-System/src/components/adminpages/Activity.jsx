
// import React from "react";
// import "./Activity.css";

// function Activity() {
//   const data = [
//     {
//       user: "Sanjai",
//       typing: 72,
//       mouse: "Normal",
//       status: "Safe",
//       login: "10:30 AM",
//       logout: "11:10 AM",
//     },
//     {
//       user: "Rahul",
//       typing: 45,
//       mouse: "Slow",
//       status: "Warning",
//       login: "09:00 AM",
//       logout: "09:20 AM",
//     },
//     {
//       user: "Kumar",
//       typing: 90,
//       mouse: "Fast",
//       status: "Safe",
//       login: "08:30 AM",
//       logout: "10:00 AM",
//     },
//     {
//       user: "Arun",
//       typing: 30,
//       mouse: "Abnormal",
//       status: "Alert",
//       login: "11:00 AM",
//       logout: "11:05 AM",
//     },
//   ];

//   return (
//     <>
//       <h2>Activity Monitoring</h2>

//       <div className="table-container">
//         <table className="activity-table">
//           <thead>
//             <tr>
//               <th>User</th>
//               <th>Typing Speed (WPM)</th>
//               <th>Mouse Behavior</th>
//               <th>Status</th>
//               <th>Login</th>
//               <th>Logout</th>
//             </tr>
//           </thead>

//           <tbody>
//             {data.map((item, index) => (
//               <tr key={index}>
//                 <td>{item.user}</td>
//                 <td>{item.typing}</td>
//                 <td>{item.mouse}</td>

//                 <td>
//                   <span className={`status ${item.status.toLowerCase()}`}>
//                     {item.status}
//                   </span>
//                 </td>

//                 <td>{item.login}</td>
//                 <td>{item.logout}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }

// export default Activity;













// import React, { useEffect, useState } from "react";
// import "./Activity.css";

// function Activity() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5001/activity")
//       .then((res) => res.json())
//       .then((result) => setData(result))
//       .catch((err) => console.log("Fetch error:", err));
//   }, []);

//   return (
//     <>
//       <h2>Activity Monitoring Dashboard</h2>

//       <div className="table-container">
//         <table className="activity-table">
//           <thead>
//             <tr>
//               <th>User</th>
//               <th>Login Time</th>
//               <th>Logout Time</th>
//               <th>Page Time (min)</th>
//               <th>Typing (WPM)</th>
//               <th>Mouse Activity</th>
//               <th>Training Activity</th>
//               <th>Exam Activity</th>
//               <th>Keystroke Score</th>
//               <th>Status</th>
//               <th>Alert</th>
//             </tr>
//           </thead>

//           <tbody>
//             {data.length > 0 ? (
//               data.map((item, index) => (
//                 <tr key={index}>
//                   <td>{item.user}</td>

//                   <td>{item.loginTime || "-"}</td>
//                   <td>{item.logoutTime || "-"}</td>

//                   <td>{item.pageTime || 0}</td>

//                   <td>{item.typingSpeed || 0}</td>

//                   <td>{item.mouseActivity || "Normal"}</td>

//                   <td>
//                     {item.trainingActivity
//                       ? "Active"
//                       : "Inactive"}
//                   </td>

//                   <td>
//                     {item.examActivity
//                       ? "Active"
//                       : "Inactive"}
//                   </td>

//                   <td>{item.keystrokeScore || 0}</td>

//                   <td>
//                     <span
//                       className={`status ${(item.status || "safe").toLowerCase()}`}
//                     >
//                       {item.status || "Safe"}
//                     </span>
//                   </td>

//                   <td>
//                     {item.alert ? (
//                       <span className="alert-danger">⚠ {item.alert}</span>
//                     ) : (
//                       "No Alert"
//                     )}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="11">No activity data found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }

// export default Activity;


















// import React, { useEffect, useState } from "react";
// import "./Activity.css";

// function Activity() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchActivity = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const res = await fetch("http://localhost:5000/activity");

//         if (!res.ok) {
//           throw new Error(`Server error: ${res.status}`);
//         }

//         const result = await res.json();
//         setData(result || []);
//       } catch (err) {
//         console.error("Fetch error:", err);
//         setError("Failed to load activity data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchActivity();
//   }, []);

//   return (
//     <>
//       <h2>Activity Monitoring Dashboard</h2>

//       <div className="table-container">

//         {loading && <p>Loading activity data...</p>}
//         {error && <p style={{ color: "red" }}>{error}</p>}

//         {!loading && !error && (
//           <table className="activity-table">
//             <thead>
//               <tr>
//                 <th>User</th>
//                 <th>Login Time</th>
//                 <th>Logout Time</th>
//                 <th>Page Time (min)</th>
//                 <th>Typing (WPM)</th>
//                 <th>Mouse Activity</th>
//                 <th>Training Activity</th>
//                 <th>Exam Activity</th>
//                 <th>Keystroke Score</th>
//                 <th>Status</th>
//                 <th>Alert</th>
//               </tr>
//             </thead>

//             <tbody>
//               {data.length > 0 ? (
//                 data.map((item) => (
//                   <tr key={item._id || item.user}>
//                     <td>{item.user || "-"}</td>
//                     <td>{item.loginTime || "-"}</td>
//                     <td>{item.logoutTime || "-"}</td>
//                     <td>{item.pageTime ?? 0}</td>
//                     <td>{item.typingSpeed ?? 0}</td>
//                     <td>{item.mouseActivity || "Normal"}</td>

//                     <td>{item.trainingActivity ? "Active" : "Inactive"}</td>
//                     <td>{item.examActivity ? "Active" : "Inactive"}</td>

//                     <td>{item.keystrokeScore ?? 0}</td>

//                     <td>
//                       <span
//                         className={`status ${(item.status || "safe").toLowerCase()}`}
//                       >
//                         {item.status || "Safe"}
//                       </span>
//                     </td>

//                     <td>
//                       {item.alert ? (
//                         <span className="alert-danger">⚠ {item.alert}</span>
//                       ) : (
//                         "No Alert"
//                       )}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="11">No activity data found</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </>
//   );
// }

// export default Activity;









import React, { useEffect, useState } from "react";
import "./Activity.css";

function Activity() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [userFilter, setUserFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("http://localhost:5000/activity");
        const result = await res.json();

        setData(result || []);
        setFilteredData(result || []);
      } catch (err) {
        setError("Failed to load activity data");
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  // 🔍 FILTER LOGIC
  useEffect(() => {
    let filtered = [...data];

    if (userFilter) {
      filtered = filtered.filter((item) =>
        item.user?.toLowerCase().includes(userFilter.toLowerCase())
      );
    }

    if (typeFilter) {
      filtered = filtered.filter(
        (item) => item.activityType === typeFilter
      );
    }

    if (dateFilter) {
      filtered = filtered.filter((item) =>
        item.timestamp?.includes(dateFilter)
      );
    }

    setFilteredData(filtered);
  }, [userFilter, typeFilter, dateFilter, data]);

  return (
    <div className="activity-page">
      <h2>Activity Dashboard</h2>

      {/* 🔎 FILTERS */}
      <div className="filters">
        <input
          placeholder="Filter by user"
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
        />

        <select onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="">All Activity</option>
          <option value="keystroke">Keystroke</option>
          <option value="click">Click</option>
          <option value="page">Page Visit</option>
        </select>

        <input
          type="date"
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <table className="activity-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Activity Type</th>
              <th>Activity</th>
              <th>Page</th>
              <th>Time Spent (sec)</th>
              <th>Timestamp</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.user || "-"}</td>
                  <td>{item.activityType || "-"}</td>
                  <td>{item.activity || "-"}</td>
                  <td>{item.page || "-"}</td>
                  <td>{item.timeSpent ?? 0}</td>
                  <td>{item.timestamp || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No activity found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Activity;