"use client"

import React from "react";
import { cn } from "@/app/utils/cn";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
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
        <BentoGrid>
          {birds.map((bird) => (
            <BentoGridItem
              key={bird.id}
              title={bird.name}
              description={bird.description}
              image={bird.imageUrl}
            />
          ))}
        </BentoGrid>
      ) : (
        <div>Add some birds to your nest to get started</div>
      )}
    </div>
  );
};

export default UserBirds;