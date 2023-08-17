"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Profile from "@components/profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const [userPrompts, setUserPrompts] = useState([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/prompts`);
      const data = await response.json();
      setUserPrompts(data);
    };

    if (session?.user.id) fetchPrompts();
  }, []);

  const handleEdit = () => {};

  const handleDelete = () => {};
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={userPrompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};
export default MyProfile;
