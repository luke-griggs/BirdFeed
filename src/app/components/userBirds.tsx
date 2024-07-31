import React from "react";
import { trpc } from "@/app/utils/trpc";

const UserBirds = () => {

  const { data: birds } = trpc.bird.getUserBirds.useQuery();

  return (
    <div>
    {birds && birds.length > 0 ? (
      birds.map((bird) => (
        <div className="bg-green-500">
        <div key={bird.id}>
          <img src={bird.imageUrl} alt={`Image of ${bird.name}`} />
          <div>{bird.name}</div>
          <div>{bird.description}</div>
        </div>
        </div>
      ))
    ) : (
      <div>Add some birds to your nest to get started</div>
    )}
  </div>
  );
};

export default UserBirds;
