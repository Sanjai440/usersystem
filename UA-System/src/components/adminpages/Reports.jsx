// import React from "react";
// import "./Reports.css";

// function Reports() {
//   return (
//     <>
//       <h2>Reports & Analytics</h2>

//       <div className="report-cards">
//         <div className="report-card">
//           <h3>120</h3>
//           <p>Total Logins</p>
//         </div>

//         <div className="report-card">
//           <h3>85%</h3>
//           <p>User Activity Rate</p>
//         </div>

//         <div className="report-card">
//           <h3>5</h3>
//           <p>Security Alerts</p>
//         </div>
//       </div>

//       <div className="chart-box">
//         <h3>Login Activity (Weekly)</h3>

//         <div className="bar-chart">
//           <div style={{ height: "60%" }}></div>
//           <div style={{ height: "80%" }}></div>
//           <div style={{ height: "40%" }}></div>
//           <div style={{ height: "90%" }}></div>
//           <div style={{ height: "70%" }}></div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Reports;






import React, { useState, useEffect } from "react";
import "./Reports.css";

function Reports() {
  const [reportType, setReportType] = useState("user");

  const [userReports, setUserReports] = useState([]);
  const [suspiciousReports, setSuspiciousReports] = useState([]);

  const loggedUser = localStorage.getItem("username");

  useEffect(() => {
    fetch(`http://localhost:5001/reports?user=${loggedUser}`)
      .then((res) => res.json())
      .then((data) => {
        setUserReports(data.userReports || []);
        setSuspiciousReports(data.suspiciousReports || []);
      })
      .catch((err) => console.log(err));
  }, [loggedUser]);

  const downloadPDF = () => {
    alert("PDF Download Started (backend connect pannum)");
  };

  const downloadExcel = () => {
    alert("Excel Download Started (backend connect pannum)");
  };

  return (
    <div className="reports-container">
      <h2>Reports & Analytics</h2>

      {/* Cards */}
      <div className="report-cards">
        <div className="report-card">
          <h3>{userReports.length}</h3>
          <p>Total Logins</p>
        </div>

        <div className="report-card">
          <h3>85%</h3>
          <p>User Activity Rate</p>
        </div>

        <div className="report-card">
          <h3>{suspiciousReports.length}</h3>
          <p>Security Alerts</p>
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="report-buttons">
        <button onClick={() => setReportType("user")}>
          User Reports
        </button>

        <button onClick={() => setReportType("suspicious")}>
          Suspicious Activity
        </button>
      </div>

      {/* TABLE SECTION */}
      <div className="report-table">
        {reportType === "user" ? (
          <>
            <h3>User Reports</h3>

            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Logins</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {userReports.length > 0 ? (
                  userReports.map((user, index) => (
                    <tr key={index}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.logins}</td>
                      <td>{user.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No User Data Found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <h3>Suspicious Activity Reports</h3>

            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Action</th>
                  <th>Time</th>
                  <th>Type</th>
                  <th>Details</th>
                </tr>
              </thead>

              <tbody>
                {suspiciousReports.length > 0 ? (
                  suspiciousReports.map((item, index) => (
                    <tr key={index}>
                      <td>{item.user}</td>
                      <td>{item.action}</td>
                      <td>{item.time}</td>
                      <td>{item.type}</td>
                      <td>{item.details}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No Suspicious Activity Found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>

      {/* Download */}
      <div className="download-buttons">
        <button onClick={downloadPDF}>Download PDF</button>
        <button onClick={downloadExcel}>Download Excel</button>
      </div>

      {/* ✅ UPDATED DYNAMIC CHART (NO LIBRARY) */}
      <div className="chart-box">
        <h3>Login Activity (Weekly)</h3>

        <div className="bar-chart">
          {(userReports.length > 0
            ? userReports.slice(0, 5)
            : [1, 2, 3, 4, 5]
          ).map((item, index) => {
            const height = item.logins
              ? Math.min(item.logins * 10, 100)
              : 50;

            return (
              <div key={index} className="bar-item">
                <div
                  className="bar-fill"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="bar-label">
                  {item.name || `U${index + 1}`}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Reports; 