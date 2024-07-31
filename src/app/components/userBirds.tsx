"use client"

import React from "react";
import { trpc } from "@/app/utils/trpc";

const UserBirds = () => {
  const { data: birds, isLoading, isError } = trpc.bird.getUserBirds.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching birds. Please try again later.</div>;
  }

  return (
    <div>
      {birds && birds.length > 0 ? (
        birds.map((bird) => (
          <div key={bird.id} className="bg-green-500 p-4 mb-4 rounded-lg">
            <img src={bird.imageUrl} alt={`Image of ${bird.name}`} className="w-sm h-auto mb-2 rounded" />
            <div className="text-lg font-semibold">{bird.name}</div>
            <div className="text-sm text-gray-700">{bird.description}</div>
          </div>
        ))
      ) : (
        <div>Add some birds to your nest to get started</div>
      )}
    </div>
  );
};

export default UserBirds;