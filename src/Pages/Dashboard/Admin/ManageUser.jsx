import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../Redux/Users/UsersSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
const ManageUser = () => {
  const {
    isLoading,
    users: usersFromRedux,
    error,
  } = useSelector((state) => state.users);
  const [users, setUsers] = useState(usersFromRedux);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  useEffect(() => {
    setUsers(usersFromRedux);
  }, [usersFromRedux]);
  const handleMakeAdmin = (user) => {
    // console.log(user);
    fetch(`${import.meta.env.VITE_LOCALHOST_KEY}/users/admin/${user?._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          // Updating the user in the local state
          const updatedUsers = users.map((u) => {
            if (u._id === user._id) {
              return { ...u, role: "admin" };
            }
            return u;
          });
          setUsers(updatedUsers);
        }
      });
  };
  const handleMakeInstructor = (user) => {
    // console.log(email);
    fetch(
      `${import.meta.env.VITE_LOCALHOST_KEY}/users/instructor/${user?._id}`,
      {
        method: "PATCH",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.modifiedCount) {
          const updatedUsers = users.map((u) => {
            if (u._id === user._id) {
              return { ...u, role: "instructor" };
            }
            return u;
          });
          setUsers(updatedUsers);
        }
      });
  };
  const handleMakeUser = (user) => {
    fetch(
      `${import.meta.env.VITE_LOCALHOST_KEY}/users/user/${user?._id}`,
      {
        method: "PATCH",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.modifiedCount) {
          const updatedUsers = users.map((u) => {
            if (u._id === user._id) {
              return { ...u, role: "User" };
            }
            return u;
          });
          setUsers(updatedUsers);
        }
      });
  };
  
  return (
    <div className="pt-20 px-5">
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Name
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Roll
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                  <div className="relative h-10 w-10">
                    <img
                      className="h-full w-full rounded-full object-cover object-center"
                      src={user?.photo}
                      alt="image"
                    />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-700">{user.name}</div>
                    <div className="text-gray-400">{user.email}</div>
                  </div>
                </th>
                <td className="py-4">
                  <div className="flex gap-2">
                    <span
                      onClick={() => handleMakeAdmin(user)}
                      className="inline-flex items-center gap-1 rounded-full bg-cyan-200 hover:bg-cyan-400 hover:text-gray-600 transition-colors duration-500 px-2 py-1 text-xs font-semibold  text-cyan-600"
                    >
                      {user.role === "admin" ? "admin" : <>Make Admin</>}
                    </span>
                    <span
                      onClick={() => handleMakeInstructor(user)}
                      className="inline-flex items-center gap-1 rounded-full bg-cyan-200 hover:bg-cyan-400 hover:text-gray-600 transition-colors duration-500 px-2 py-1 text-xs font-semibold text-cyan-600"
                    >
                      {user.role === "instructor" ? (
                        "instructor"
                      ) : (
                        <>Make Instructor</>
                      )}
                    </span>
                    <span
                      onClick={() => handleMakeUser(user)}
                      className="inline-flex items-center gap-1 rounded-full bg-cyan-200 hover:bg-cyan-400 hover:text-gray-600 transition-colors duration-500 px-2 py-1 text-xs font-semibold text-cyan-600"
                    >
                      {user.role === "user" ? "user" : <>Make User</>}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <FaTrash className="h-6 w-6" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ManageUser;
