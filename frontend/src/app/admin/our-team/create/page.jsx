"use client";

import React from "react";
import { TeamForm } from "@/components/admin/team-members/Team-form";
import { createTeamMember } from "@/services/team.service";

const Page = () => {
  const handleCreate = async (formData) => {
    try {
      await createTeamMember(formData);
      console.log("Created successfully");
    } catch (error) {
      console.error("Create failed:", error);
    }
  };

  return (
    <div className="p-6">
      <TeamForm onSubmit={handleCreate} />
    </div>
  );
};

export default Page;