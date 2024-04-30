import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import forgetImage from "../assets/forget.jpg";

export default function ForgetPassword() {
  const form = useRef();
  const navigate = useNavigate();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_u1d8yrn",
        "template_e6cc50k",
        form.current,
        "prX561F7ToOUiZrHN"
      )
      .then(navigate("/successMessage"))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="bg-gradient-to-r from-indigo-400 to-purple-600 h-screen flex flex-col justify-center items-center">
        <form
          ref={form}
          onSubmit={sendEmail}
          className="max-w-md mx-auto p-6 bg-slate-300 shadow-md rounded-lg mt-10"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">
            Forget Password Request
          </h1>
          <img
            src={forgetImage}
            alt="Forgetful Face"
            className="w-40 h-auto mx-auto mt-10"
          />

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-gray-700 font-bold mb-2"
            >
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your message"
              rows="4"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
          >
            Send Email
          </button>
        </form>
      </div>
    </>
  );
}
