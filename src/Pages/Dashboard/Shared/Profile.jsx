import React, { useEffect, useState } from "react";
import { loadUsersData, usersData } from "../../../Component/Hooks/userData";
import { useParams } from "react-router-dom";
import "./Dashboard.css";
import { RiEdit2Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { useForm } from "react-hook-form";
const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [profile, setProfile] = useState({});
  const [title, setTitle] = useState("");
  const { id } = useParams();
  // console.log(id);
  const [localUsersData, setLocalUsersData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await loadUsersData();
      setLocalUsersData(usersData);
    };
    fetchData();
  }, []);
  const matchedUser = localUsersData.find((user) => user._id === id);
  // console.log(matchedUser.email);
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };
  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = () => {
    // Update logic here if needed (e.g., send to a server)

    setIsModalOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { aboutMe, location, phoneNumber } = profile;
    {
      title;
    }
    const dataToSend = {
      _id: matchedUser._id,
      name: matchedUser.name,
      email: matchedUser.email,
      photo: matchedUser.photo,
      aboutMe: profile.aboutMe,
      location: profile.location,
      phoneNumber: profile.phoneNumber,
      title: title,
    };
    try {
      const response = await fetch(
        `http://localhost:5000/users/${matchedUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      const responseData = await response.json();
      if (response.ok) {
        console.log("Update successful:", responseData);
      } else {
        console.error("Failed to update:", responseData);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="px-5 pt-28">
      <div className="profile  w-full h-[320px] rounded-xl">
        <div className="mx-auto">
          <div className="absolute top-52 w-11/12 mx-auto right-0 rounded-xl left-0 bg-white">
            <form className="px-5 py-7" onSubmit={handleSubmit}>
              <div className="flex gap-3 mb-7 items-center">
                <img
                  className="w-20 h-20 rounded-md "
                  src={matchedUser?.photo}
                  alt=""
                />
                <div>
                  <h2 className="text-xl font-semibold">{matchedUser?.name}</h2>
                  <div className="flex gap-2 pt-2">
                    <input
                      type="text"
                      name=""
                      value={title}
                      defaultValue={matchedUser?.title}
                      className="w-full text-gray-800 font-medium focus:outline-none text-base"
                      id=""
                      placeholder="Add Your Title"
                      readOnly
                    />
                    <RiEdit2Fill size={25} onClick={handleEditClick} />
                    {isModalOpen && (
                      <div className="fixed  top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-4">
                          <h2>Edit Title</h2>
                          <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full mt-2 mb-4 text-gray-600 font-medium focus:outline-none text-base"
                            placeholder="Update Your Title"
                          />
                          <button
                            onClick={handleUpdate}
                            className="bg-blue-500 text-white p-2 rounded"
                          >
                            Update
                          </button>
                          <button
                            onClick={handleCloseModal}
                            className="ml-2 p-2"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-center  w-2/3 mx-auto">
                <div className="flex items-center justify-between  text-center">
                  <h2 className="text-xl font-semibold">Profile Information</h2>
                  <MdEdit
                    className="w-6 h-6"
                    onClick={() => setIsProfile(true)}
                  />
                </div>
                <div className="px-5 text-start pt-8">
                  <p className="font-semibold text-base py-2">About Me</p>

                  <input
                    type="text"
                    name=""
                    value={profile?.aboutMe}
                    defaultValue={matchedUser?.aboutMe}
                    className="w-full text-justify text-gray-800 font-medium focus:outline-none text-base"
                    id=""
                    placeholder="Add Your Title"
                    readOnly
                  />
                </div>
                <div className="px-5 text-start py-2 flex w-full items-center gap-2">
                  <p className="font-semibold text-base py-2">Number </p>
                  <input
                    type="number"
                    name=""
                    value={profile?.phoneNumber}
                    defaultValue={matchedUser?.phoneNumber}
                    className="w-full text-gray-800 font-medium focus:outline-none text-base"
                    id=""
                    placeholder=""
                    readOnly
                  />
                </div>
                <div className="px-5 text-start pb-2 flex items-center gap-2">
                  <p className="font-semibold text-base ">Email </p>
                  <input
                    type="email"
                    name="email"
                    defaultValue={matchedUser?.email}
                    className="w-full text-gray-800 font-medium focus:outline-none text-base"
                    id="email"
                    readOnly
                  />
                </div>
                <div className="px-5 text-start  flex items-center gap-2">
                  <p className="font-semibold text-base ">Location:</p>
                  <input
                    type="text"
                    name=""
                    value={profile?.location}
                    defaultValue={matchedUser?.location}
                    className="w-full text-gray-800 font-medium focus:outline-none text-base"
                    id=""
                    placeholder=""
                    readOnly
                  />
                </div>
                {isProfile && (
                  <div className="fixed top-0 left-0  w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white px-16 py-12 rounded flex flex-col">
                      <h2 className="text-xl font-semibold">Edit Profile</h2>
                      <label className="font-medium">About Me</label>
                      <textarea
                        type="text"
                        name="aboutMe"
                        className="text-base border border-cyan-500 p-2 w-full"
                        value={profile.aboutMe}
                        onChange={handleChange}
                      />

                      <label>Phone Number</label>
                      <input
                        type="text"
                        name="phoneNumber"
                        className="text-base"
                        value={profile.phoneNumber}
                        onChange={handleChange}
                      />

                      <label>Location</label>
                      <input
                        type="text"
                        name="location"
                        className="text-base "
                        value={profile.location}
                        onChange={handleChange}
                      />

                      <div className="pt-5 space-x-5">
                        <button
                          className="bg-blue-500 text-white p-2 rounded"
                          onClick={() => setIsProfile(false)}
                        >
                          Save
                        </button>
                        <button
                          className="border border-blue-500 p-2"
                          onClick={() => setIsProfile(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <div className="px-5 pt-10">
                  <button
                    type="submit"
                    className="py-3 w-full bg-cyan-500 rounded-lg border-2 border-cyan-800 hover:bg-cyan-800 font-semibold hover:text-white "
                  >
                    Update Profile
                  </button>{" "}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
