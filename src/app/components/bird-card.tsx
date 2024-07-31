import React from "react";
import Dialog from "@/app/components/ui/dialog";
import { trpc } from "../utils/trpc";
import toast from "react-hot-toast";

const BirdCard = ({
  birdName,
  birdDescription,
  image_url,
}: {
  birdName: string;
  birdDescription: string;
  image_url: string;
}) => {

  const addBirdToNest = trpc.bird.addBirdToNest.useMutation();

  const handleClick = async () => {
    
    const res = await addBirdToNest.mutateAsync({ image_url: image_url, name: birdName, description: birdDescription });

    if (res.success) {
      toast.success("Bird added to your nest");
    } else {
      toast.error("Failed to add bird to your nest");
    }
    
  }

  return (
    <Dialog>
      <div className="w-1/2">
        <div>
          <img src={image_url} alt="" />
          <h1 className="text-2xl font-medium pb-4">
            congratulations! you spotted a {birdName}
          </h1>
          <p className="text-sm text-gray-300">{birdDescription}</p>
        </div>
      </div>
      <div className="flex-row space-x-3">
        <button className="w-sm bg-blue-500 text-white rounded-md" onClick={() => handleClick()}> {/* need to close and toast after this */}
        <h1 className="p-2">
          Add to my Nest
          </h1>        
          </button>
        <button className="w-sm border-2 border-blue-500 rounded-md">
          <h1 className="p-1.5">
          Scan another bird
          </h1>
        </button> 
      </div>
    </Dialog>
  );
};

export default BirdCard;
