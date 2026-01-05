import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = "http://localhost:5000/auth/signup";

export function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSignUp() {
    if (!email || !name || !password) return;

    try {
      setLoading(true);

      const response = await axios.post(BACKEND_URL, {
        username: name,
        email,
        password,
      });

      const data = response.data;
      if (!data?.token) {
        throw new Error("Invalid credentials");
      }
      localStorage.setItem("token", data.token);
      alert(data.message);
      navigate("/ideas");
    } catch (error) {
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-200">
      <div className="w-full max-w-md bg-white rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Create the account
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />

          <button
            onClick={handleSignUp}
            disabled={loading || !email || !name || !password}
            className="w-full bg-amber-600 text-white py-3 rounded-lg font-medium hover:bg-amber-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </div>

        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <span
            className="text-amber-600 cursor-pointer hover:underline"
            onClick={() => navigate("/signin")}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
