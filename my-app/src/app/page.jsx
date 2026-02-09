// app/profile/page.jsx
"use client";
import { useState } from "react";
// import { updateProfilePicture } from "./actions";

export default function ProfilePage() {
  const [profilePic, setProfilePic] = useState("/default-avatar.png");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    const fileInput = e.target.elements.file;
    if (!fileInput.files[0]) return;

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    setLoading(true);
    try {
      const url = await updateProfilePicture(formData);
      setProfilePic(url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Update Profile</h1>
      {/* <img src={profilePic} alt="Profile" width={100} />
      <form onSubmit={handleUpload}>
        <input type="file" name="file" accept="image/*" />
        <button type="submit">{loading ? "Uploading..." : "Upload"}</button>
      </form> */}
    </div>
  );
}
