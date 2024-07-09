import React from "react";


const Navbar = () => {
  return (
    <nav>
      <div className="flex h-full items-center font-semibold bg-[#11909E] px-10 py-5">
        <div className="flex w-full">
          <a href="/">
            <span className="mr-6 flex cursor-pointer text-white flex-row text-3xl text-input-foreground">
              Birdfeed
            </span>
          </a>
        </div>
        <div className="w-full">
          <ul className="flex space-x-8 justify-center">
            <li>
              <a href="#" className="text-white">
                identify
              </a>
            </li>
            <li>
              <a href="#" className="text-white">
                Seeds
              </a>
            </li>
            <li>
              <a href="#" className="text-white">
                Support
              </a>
            </li>
          </ul>
        </div>
        {/* Desktop View */}
        <div className="hidden w-full justify-end lg:flex">
          <ul className="text-l ml-auto mr-0 flex items-center font-medium text-gray-100">
            <li>
            </li>
            <li>
              <a href="/login">
                <div className="bg-amber-300 hover:bg-amber-400 rounded-[95px] px-3 py-2 text-sm">
                  sign in
                </div>
              </a>
            </li>
            <li>
              <a href="/login">
                <div className="rounded-[95px] px-3 py-2 text-sm">
                  sign up
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
