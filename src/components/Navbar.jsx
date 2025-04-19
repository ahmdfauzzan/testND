import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/reducer/authSlice";
import { toast } from "react-toastify";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Untuk toggle menu pada mobile
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Reset state user
    toast.success("Logout berhasil!", {
      position: "top-center",
      autoClose: 1000,
      onClose: () => navigate("/"), // Navigasi setelah toast ditutup
    });
  };

  return (
    <div className="bg-[#00c5bbb6] px-6 py-3 flex justify-between items-center">
      {/* Teks di bagian tengah */}
      <div className="text-white text-lg font-bold hidden sm:block">
        PT Nusantara Data Indonesia
      </div>

      {/* Menu Hamburger untuk mobile */}
      <button
        className="sm:hidden text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Navbar Link (untuk desktop dan tablet) */}
      <div className="flex items-center space-x-4 hidden sm:flex">
        <button
          className="text-white hover:bg-[#00c583c9] px-4 py-2 rounded-md transition-colors duration-300"
          onClick={handleLogout}
        >
          Keluar
        </button>
      </div>

      {/* Dropdown Menu untuk mobile */}
      {isMenuOpen && (
        <div className="sm:hidden absolute top-16 left-0 w-full bg-[#00c583c9] text-white text-center">
          <button
            className="block w-full px-4 py-2 hover:bg-[#00c583c9]"
            onClick={handleLogout}
          >
            Keluar
          </button>
        </div>
      )}
    </div>
  );
};
