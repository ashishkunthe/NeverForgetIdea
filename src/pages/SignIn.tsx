import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = "http://localhost:5000/auth/signin";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSignIn() {
    if (!email || !password) return;

    try {
      setLoading(true);

      const response = await axios.post(BACKEND_URL, {
        email,
        password,
      });

      const data = response.data;

      if (!data?.token) {
        throw new Error("Invalid credentials");
      }

      localStorage.setItem("token", data.token);
      navigate("/ideas");
    } catch (error) {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-linear-to-br from-amber-100 via-orange-100 to-yellow-100">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,200,100,0.4),transparent_60%)]" />

      <div className="relative w-full max-w-md rounded-2xl bg-white/70 backdrop-blur-xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Access your account
        </h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 block mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border bg-white/80 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 block mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border bg-white/80 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* CTA */}
          <button
            onClick={handleSignIn}
            disabled={loading || !email || !password}
            className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>

        <p className="text-sm text-gray-600 text-center mt-6">
          Don’t have an account?{" "}
          <span
            className="text-amber-600 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
}
