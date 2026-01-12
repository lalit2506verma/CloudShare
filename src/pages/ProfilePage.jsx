import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../contexts/AuthContext";
import { Camera, Mail, Save, User } from "lucide-react";
import { updateUserProfile } from "../services/UserProfileService";

const ProfilePage = () => {
  const { user, setUser, login } = useAuth();
  const [ isEditing, setIsEditing ] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    profileURL: "",
    email: ""
  });

  // Initialize form data when user is available
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        profileURL: user?.profileURL || "",
        email: user?.email || "",
      });
    }
  }, [user])

  // Handle Edit Toggle 
  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  }

  // Handle form Data Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      profileURL: user.profileURL || "",
      email: user.email || "",
    });
  }

  const handleSubmit = async () => {
    console.log("Submit Clicked");
    try {
      const updatedUser = await updateUserProfile(formData, user.id);
      setUser(JSON.parse(JSON.stringify(updatedUser)));
      setIsEditing(false);

      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        profileURL: user.profileURL || "",
        email: user.email || "",
      });
    }
    catch (error) {
      console.log(error);
      console.log("error is updating the user");
    }
  };

  return (
    <DashboardLayout activeMenu="Profile">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

        <div className="max-w-3xl">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            {/* Header with gradient */}
            <div className="bg-linear-to-r from-purple-500 to-blue-500 h-32"></div>

            {/* Profile Content */}
            <div className="px-6 pb-6">
              {/* Profile Picture */}
              <div className="relative -mt-16 mb-4">
                <div className="w-32 h-32 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-linear-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white text-3xl font-bold">
                      {user?.firstName?.[0]}
                      {user?.lastName?.[0]}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <Camera size={18} className="text-gray-600" />
                </button>
              </div>

              {/* Profile Form */}
              <form className="space-y-6 mt-8 mb-7">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <User
                        size={18}
                        className="absolute left-3 top-3 text-gray-400"
                      />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        required
                        className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
                          !isEditing
                            ? "bg-gray-50 text-gray-500 cursor-not-allowed"
                            : "bg-white"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <User
                        size={18}
                        className="absolute left-3 top-3 text-gray-400"
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        required
                        className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
                          !isEditing
                            ? "bg-gray-50 text-gray-500 cursor-not-allowed"
                            : "bg-white"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3 top-3 text-gray-400"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      readOnly
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Email cannot be changed
                  </p>
                </div>

                
              </form>

              {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  {!isEditing ? (
                    <button
                      type="button"
                      onClick={toggleEdit}
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                      >
                        <Save size={18} />
                        Save Changes
                      </button>

                      <button
                        type="button"
                        onClick={toggleEdit}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-blue-50 rounded-lg p-4 mt-6 border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Your email address is used for account
              recovery and notifications and cannot be changed.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
