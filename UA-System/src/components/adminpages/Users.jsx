// import React, { useState } from "react";
// import "./Users.css";

// function Users() {
//   const [users, setUsers] = useState([
//     { id: 1, name: "Sanjai", email: "sanjai@gmail.com", status: "Active" },
//     { id: 2, name: "Rahul", email: "rahul@gmail.com", status: "Blocked" },
//   ]);

//   const [newUser, setNewUser] = useState({ name: "", email: "" });
//   const [editId, setEditId] = useState(null);

//   const handleAddUser = () => {
//     if (!newUser.name || !newUser.email) return;

//     if (editId) {
//       setUsers(
//         users.map((u) =>
//           u.id === editId ? { ...u, ...newUser } : u
//         )
//       );
//       setEditId(null);
//     } else {
//       setUsers([
//         ...users,
//         { id: Date.now(), ...newUser, status: "Active" },
//       ]);
//     }

//     setNewUser({ name: "", email: "" });
//   };

//   const handleEdit = (user) => {
//     setNewUser({ name: user.name, email: user.email });
//     setEditId(user.id);
//   };

//   const handleDelete = (id) => {
//     setUsers(users.filter((u) => u.id !== id));
//   };

//   const toggleStatus = (id) => {
//     setUsers(
//       users.map((u) =>
//         u.id === id
//           ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" }
//           : u
//       )
//     );
//   };

//   return (
//     <>
//       <h2>User Management</h2>

//       <div className="user-form">
//         <input
//           type="text"
//           placeholder="Enter name"
//           value={newUser.name}
//           onChange={(e) =>
//             setNewUser({ ...newUser, name: e.target.value })
//           }
//         />

//         <input
//           type="email"
//           placeholder="Enter email"
//           value={newUser.email}
//           onChange={(e) =>
//             setNewUser({ ...newUser, email: e.target.value })
//           }
//         />

//         <button onClick={handleAddUser}>
//           {editId ? "Update" : "Add User"}
//         </button>
//       </div>

//       <table className="user-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {users.map((u) => (
//             <tr key={u.id}>
//               <td>{u.name}</td>
//               <td>{u.email}</td>

//               <td>
//                 <span
//                   className={
//                     u.status === "Active"
//                       ? "status active"
//                       : "status blocked"
//                   }
//                 >
//                   {u.status}
//                 </span>
//               </td>

//               <td>
//                 <button onClick={() => handleEdit(u)}>Edit</button>
//                 <button onClick={() => handleDelete(u.id)}>Delete</button>
//                 <button onClick={() => toggleStatus(u.id)}>
//                   {u.status === "Active" ? "Block" : "Unblock"}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// }

// export default Users;














import React, { useEffect, useState } from "react";
// import axios from "axios";
import "./Users.css";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const USERS_PER_PAGE = 5;

  useEffect(() => {
    loadUsers();
  }, []);

  // 🔄 Get all users
  const loadUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5001/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 👁 View user
  const viewUser = (user) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  // 🚫 Block / Unblock
  const toggleStatus = async (user) => {
    const confirm = window.confirm(
      `Do you want to ${user.status === "Active" ? "Block" : "Unblock"} this user?`
    );
    if (!confirm) return;

    try {
      await axios.put(`http://localhost:5001/users/${user._id}/status`, {
        status: user.status === "Active" ? "Blocked" : "Active",
      });
      loadUsers();
    } catch (err) {
      console.log(err);
    }
  };

  // 🗑 Delete user
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5001/users/${id}`);
      loadUsers();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔍 Search filter
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 Pagination logic
  const indexOfLast = currentPage * USERS_PER_PAGE;
  const indexOfFirst = indexOfLast - USERS_PER_PAGE;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  return (
    <div className="users-page">
      <h2>👥 Users Management</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search"
      />

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Last Login</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>

              <td className={user.status === "Active" ? "active" : "blocked"}>
                {user.status}
              </td>

              <td>{user.lastLogin}</td>

              <td>
                <button onClick={() => viewUser(user)}>View</button>

                <button onClick={() => toggleStatus(user)}>
                  {user.status === "Active" ? "Block" : "Unblock"}
                </button>

                <button className="delete" onClick={() => deleteUser(user._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? "activePage" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedUser && (
        <div className="modal">
          <div className="modalBox">
            <h3>User Details</h3>

            <p><b>Name:</b> {selectedUser.name}</p>
            <p><b>Email:</b> {selectedUser.email}</p>
            <p><b>Role:</b> {selectedUser.role}</p>
            <p><b>Status:</b> {selectedUser.status}</p>
            <p><b>Last Login:</b> {selectedUser.lastLogin}</p>

            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersPage;