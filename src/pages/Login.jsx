import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // redirect to home
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center mt-[40%]">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-2 base-container"
      >
        <h2 className="text-center text-4xl">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2"
        />
        <button
          type="submit"
          className="bg-green-500 text-white p-2 cursor-pointer"
        >
          Login
        </button>
        <p>
          Don't have an account?{" "}
          <Link className="underline" to={"/signup"}>
            Signin!
          </Link>
        </p>
      </form>
    </div>
  );
}
