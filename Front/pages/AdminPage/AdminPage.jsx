import React, { useState, useEffect } from "react";
import "./Adminpage.scss";
import IMG from "../../Assets/IMG-20240209-WA0026.jpg";
import { actionlink, admincard } from "../../Conestants";

export const AdminPage = () => {
  const [selectedOption, setSelectedOption] = useState("Manage Posts");

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("localhost:5000/admin/allUser");
      const data = await response.json();
      setUsers(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const deleteUser = async (userId) => {
    try {
      await fetch(`admin/${userId}`, {
        method: "DELETE",
      });
      // Update the users state to remove the deleted user
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSidebarClick = (option) => {
    setSelectedOption(option);
  };
  return (
    <div className="admin-page">
      <div className="sidebar">
        <div className="card-image">
          <img src={IMG} alt="img" />
          <p className="name">User Name</p>
        </div>

        <ul>
          {actionlink.map((item, i) => {
            return (
              <li onClick={() => handleSidebarClick(item)} key={i}>
                {item}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="content">
        <button className="btn">Add Post</button>
        <h1 className="page-title">{selectedOption}</h1>
        {selectedOption === "DashBoard" && (
          <div className="dashboard">
            <div className="card-container">
              {admincard.map((item, i) => {
                return (
                  <div className="card" key={i}>
                    <h2>{item.title}</h2>
                    <p>{item.number}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {selectedOption === "Manage Posts" && (
          <div className="post-table">
            <div className="table-row table-header">
              <div className="table-cell">Numbers</div>
              <div className="table-cell">Post Title</div>
              <div className="table-cell">Publisher</div>
              <div className="table-cell">Action</div>
              <div className="table-cell">Date</div>
            </div>
            <div className="table-row">
              <div className="table-cell">1</div>
              <div className="table-cell">Post</div>
              <div className="table-cell">Wissam</div>
              <div className="table-cell">
                <button>Approve post</button>
                <button>Edit post</button>
                <button>Remove post</button>
              </div>
              <div className="table-cell">Date of creation</div>
            </div>
          </div>
        )}
        {selectedOption === "Manage Users" && (
          <div className="user-table">
            <div className="table-row table-header">
              <div className="table-cell">Numbers</div>
              <div className="table-cell">UserName</div>
              <div className="table-cell">Role</div>
              <div className="table-cell">Action</div>
              <div className="table-cell">Date of registration</div>
            </div>
            {users.map((user, index) => (
              <div className="table-row" key={user.id}>
                <div className="table-cell">{index + 1}</div>
                <div className="table-cell">{user.username}</div>
                <div className="table-cell">{user.role}</div>
                <div className="table-cell">
                  <button onClick={() => deleteUser(user.id)}>
                    Remove User
                  </button>
                </div>
                <div className="table-cell">{user.registrationDate}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// import React, { useState, useEffect } from "react";
// import "./Adminpage.scss";

// import { useSelector, useDispatch } from "react-redux";
// import IMG from "../../Assets/IMG-20240209-WA0026.jpg";
// import { actionlink, admincard } from "../../Conestants";
// import { getuser } from "../../store/reducer/dataSlice";
// export const AdminPage = () => {
//   const [selectedOption, setSelectedOption] = useState("Manage Posts");
//   const dispatch = useDispatch();
//   const users = useSelector((state) => state.data.users);

//   useEffect(() => {
//     dispatch(getuser()); // Dispatching getUsers thunk when component mounts
//   }, [dispatch]);

//   const handleSidebarClick = (option) => {
//     setSelectedOption(option);
//   };
//   return (
//     <div className="admin-page">
//       <div className="sidebar">
//         <div className="card-image">
//           <img src={IMG} alt="img" />
//           <p className="name">User Name</p>
//         </div>

//         <ul>
//           {actionlink.map((item, i) => {
//             return (
//               <li onClick={() => handleSidebarClick(item)} key={i}>
//                 {item}
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//       <div className="content">
//         <button className="btn">Add Post</button>
//         <h1 className="page-title">{selectedOption}</h1>
//         {selectedOption === "DashBoard" && (
//           <div className="dashboard">
//             <div className="card-container">
//               {admincard.map((item, i) => {
//                 return (
//                   <div className="card" key={i}>
//                     <h2>{item.title}</h2>
//                     <p>{item.number}</p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//         {selectedOption === "Manage Posts" && (
//           <div className="post-table">
//             <div className="table-row table-header">
//               <div className="table-cell">Numbers</div>
//               <div className="table-cell">Post Title</div>
//               <div className="table-cell">Publisher</div>
//               <div className="table-cell">Action</div>
//               <div className="table-cell">Date</div>
//             </div>
//             <div className="table-row">
//               <div className="table-cell">1</div>
//               <div className="table-cell">Post</div>
//               <div className="table-cell">Wissam</div>
//               <div className="table-cell">
//                 <button>Approve post</button>
//                 <button>Edit post</button>
//                 <button>Remove post</button>
//               </div>
//               <div className="table-cell">Date of creation</div>
//             </div>
//           </div>
//         )}
//         {selectedOption === "Manage Users" && (
//           <div className="user-table">
//             <div className="table-row table-header">
//               <div className="table-cell">Numbers</div>
//               <div className="table-cell">UserName</div>
//               <div className="table-cell">Role</div>
//               <div className="table-cell">Action</div>
//               <div className="table-cell">Date of registration</div>
//             </div>
//             <div className="table-row">
//               <ul>
//                 {users.map((user) => (
//                   <li key={user.id}>{user.username}</li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
