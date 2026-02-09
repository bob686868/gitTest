"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient.js";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [file, setFile] = useState(null);

  // Get the current session
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    };

    getUser();

    // Listen to auth changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Fetch avatar when user is available
  useEffect(() => {
    if (user) fetchAvatar();
  }, [user]);

  const fetchAvatar = async () => {
    const { data, error } = await supabase.storage
      .from("avatars")
      .download(`${user.id}.png`);

    if (error) {
      if (error.status === 404) {
        setAvatarUrl(null); // No avatar yet
      } else {
        console.error(error);
      }
    }

    if (data) {
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    }
  };

  const handleUpload = async () => {
    console.log("entered");
    if (!file) return alert("Select a file first!");

    const { error } = await supabase.storage
      .from("avatars")
      .upload(`${user.id}.png`, file, { upsert: true });
    console.log("hello");
    if (error) return alert(error.message);

    alert("Profile picture updated!");
    fetchAvatar();
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-xl mb-4">Your Profile</h1>

      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="w-32 h-32 rounded-full mb-4"
        />
      ) : (
        <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
          No Avatar
        </div>
      )}

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button
        onClick={handleUpload}
        className="bg-green-500 text-white p-2 mt-2"
      >
        Upload / Change Avatar
      </button>
    </div>
  );
}
