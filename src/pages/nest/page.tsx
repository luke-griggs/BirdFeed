import React from "react";
import { trpc } from "@/app/utils/trpc";
import UserBirds from "@/app/components/userBirds";

const page = () => {
  return (
    <div className="h-screen bg-teal-400">
      <UserBirds />
    </div>
  )
}

  

export default page;
