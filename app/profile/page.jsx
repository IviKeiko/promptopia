"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Profile from "@components/profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const [userPrompts, setUserPrompts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/prompts`);
      const data = await response.json();
      setUserPrompts(data);
    };

    if (session?.user.id) fetchPrompts();
  }, []);

  const handleEdit = (prompt) => {
    router.push(`update-prompt?id=${prompt._id}`);
  };

  const handleDelete = async (prompt) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${prompt._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPrompts = userPrompts.filter((p) => p._id !== prompt._id);
        setUserPrompts([filteredPrompts]);
      } catch (error) {}
    }
  };
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
