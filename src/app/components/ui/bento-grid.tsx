import { cn } from "@/app/utils/cn";
import { useState } from "react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <>
      <div className="max-w-7xl mx-auto pb-6 pt-8">
        <div className="flex justify-between items-baseline">
          <h1 className="font-semibold text-5xl text-white">
            Welcome to your Nest!
          </h1>
     
            <a href="/profile" className="text-white duration-300 hover:text-orange-300">
              back to profile
            </a>
          
        </div>
        <p className="font-medium text-white pt-2">
          Click on a bird to see its description
        </p>
      </div>

      <div
        className={cn(
          "grid auto-rows-min grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
          className
        )}
      >
        {children}
      </div>
    </>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  image,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  image?: string;
  icon?: React.ReactNode;
}) => {
  const [showDescription, setShowDescription] = useState(false); // State to toggle description visibility

  const toggleDescription = () => {
    setShowDescription(!showDescription); // Toggle the state on click
  };
  return (
    <div
      className={cn(
        "rounded-xl hover:shadow-xl transition-all duration-300 shadow-input dark:shadow-none p-1 bg-white border border-transparent flex flex-col space-y-4 cursor-pointer",
        className
      )}
      onClick={toggleDescription}
    >
      <div className="">
        <img src={image} alt="" className="w-full h-[250px] rounded-t-xl" />
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
      </div>
      {showDescription && (
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300 transition-opacity duration-200 overflow-hidden">
          {description}
        </div>
      )}
    </div>
  );
};
