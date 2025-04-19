import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUser } from "../services/loginUser";
import { IoEyeSharp } from "react-icons/io5"; // Import ikon untuk eye open
import { FaEyeSlash, FaFacebookF } from "react-icons/fa"; // Import ikon untuk eye closed
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../assets/img/nd.png";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducer/authSlice";

export const Login = () => {
  const [idDaerah, setIdDaerah] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tahun, setTahun] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    mutate: loginUser,
    data,
    isSuccess,
    isError,
    isLoading,
    error,
  } = useLoginUser();

  useEffect(() => {
    if (isSuccess) {
      console.log("Data login success: ", data);
      toast.success("Login berhasil!", {
        position: "top-center",
        autoClose: 1000,
      });
      dispatch(loginSuccess(data));
      navigate("/dashboard");
    }

    if (isError && error?.response?.data?.message) {
      setErrorMessage(error.response.data.message);
      setShowModal(true);
    }
  }, [isSuccess, isError, data, error, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = {
      id_daerah: parseInt(idDaerah),
      username,
      password,
      tahun: parseInt(tahun),
    };
    loginUser(input);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex h-screen">
      {/* Bagian kiri (logo di tengah dengan background hijau gradasi seperti contoh) */}
      <div className="hidden md:flex w-full md:w-1/2 h-full bg-gradient-to-r from-[#00c6ff] via-[#00c57abb] to-[#68fff7fa]">
        <div className="flex flex-col justify-center items-center w-full h-full">
          <img
            src={logo} // <-- ganti path logo kamu
            alt="Logo Nusantara Data Indonesia"
            className="w-64 h-64 object-contain" // ukuran besar
          />
        </div>
      </div>

      {/* Bagian kanan (form login) */}
      <div className="w-full md:w-1/2 h-full flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <h1 className="text-center mb-10 md:text-center text-3xl font-bold text-gray-800 mb-1">
            Login Sistem
          </h1>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm flex flex-col items-center"
          >
            {/* Input Username */}
            <div className="mb-4 relative w-full">
              <input
                type="text"
                className="w-full pl-4 pr-4 py-4 border focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg h-14"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Input Password */}
            <div className="mb-4 relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-4 pr-4 py-4 border focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg h-14"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <IoEyeSharp className="text-gray-500" size={24} />
                ) : (
                  <FaEyeSlash className="text-gray-500" size={24} />
                )}
              </button>
            </div>

            {/* Input ID Daerah */}
            <div className="mb-4 relative w-full">
              <input
                type="number"
                className="w-full pl-4 pr-4 py-4 border focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg h-14"
                placeholder="ID Daerah"
                value={idDaerah}
                onChange={(e) => setIdDaerah(e.target.value)}
              />
            </div>

            {/* Input Tahun */}
            <div className="mb-4 relative w-full">
              <input
                type="number"
                className="w-full pl-4 pr-4 py-4 border focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg h-14"
                placeholder="Tahun"
                value={tahun}
                onChange={(e) => setTahun(e.target.value)}
              />
            </div>

            {/* Tombol Submit */}
            <div className="mb-4 w-full">
              <input
                type="submit"
                value={isLoading ? "Loading..." : "Sign In"}
                className="w-full bg-blue-500 text-white py-3 text-lg hover:bg-blue-600 transition h-14 cursor-pointer"
                disabled={isLoading}
              />
            </div>

            {/* Garis pemisah dan teks Sign in with */}
            <div className="flex items-center w-full my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-500 text-sm">Sign in with</span>
              <hr className="flex-grow border-gray-300" />
            </div>
          </form>
          {/* Tombol Social Login pakai React Icons */}
          <div className="flex justify-center gap-4 w-full">
            <button className="border p-3 rounded-md hover:bg-gray-100">
              <FcGoogle size={24} />
            </button>
            <button className="border p-3 rounded-md hover:bg-gray-100">
              <FaXTwitter size={20} className="text-black" />
            </button>
            <button className="border p-3 rounded-md hover:bg-gray-100">
              <FaFacebookF size={20} className="text-blue-600" />
            </button>
          </div>
        </div>
      </div>
      {/* Modal Pop-up Error */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-sm shadow-md w-[400px] border border-gray-300">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="font-semibold text-lg">Warning</h2>
              <button
                className="text-gray-600 hover:text-black text-xl"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <div className="p-5 text-center">
              <p className="text-gray-700">{errorMessage}</p>
            </div>
            <div className="flex justify-end p-4 border-t border-gray-200">
              <button
                className="bg-blue-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
