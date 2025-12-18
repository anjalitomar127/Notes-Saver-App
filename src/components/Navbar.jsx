import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <header className="text-white">

      {/* APP HEADING (GOOGLE-STYLE) */}
      <div className="flex justify-center pt-24 pb-12">
        <h1 className="text-5xl font-semibold tracking-tight text-gray-100">
          <i>Notes Saver 📝 </i>
        </h1>
        </div>
        </header>

      <div className="flex flex-row gap-4 p-4 bg-gray-800 text-white justify-evenly w-[300px] align-center m-auto">
        <NavLink to="/">Home</NavLink>

        <NavLink to="/pastes">Pastes</NavLink>
      </div>
    </>
  );
};

export default Navbar;
