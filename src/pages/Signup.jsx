import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signed up!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center mt-[10%]">
      <form
        onSubmit={handleSignup}
        className="flex flex-col gap-2 base-container"
      >
        <h2 className="text-center text-4xl">Signup</h2>

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
          className="bg-blue-500 text-white p-2 cursor-pointer"
        >
          Sign Up
        </button>
        <p>
          Already have an account?{" "}
          <Link className="underline" to={"/login"}>
            Login!
          </Link>
        </p>
      </form>
    </div>
  );
}
