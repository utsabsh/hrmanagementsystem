// import React from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// const AdminLogout = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     axios.get("http://localhost:3000/auth/logout").then((result) => {
//       if (result.data.Status) {
//         localStorage.removeItem("valid");
//         navigate("/");
//       }
//     });
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center">
//       <h1 className="text-2xl font-bold mb-4">
//         Are you sure you want to logout?
//       </h1>
//       <div className="flex">
//         <button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
//           onClick={handleLogout}
//         >
//           Yes
//         </button>
//         <button
//           className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
//           onClick={() => navigate(-1)}
//         >
//           No
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminLogout;
