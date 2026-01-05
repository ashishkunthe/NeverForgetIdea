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
      if (!data?.token) throw new Error("Invalid credentials");

      localStorage.setItem("token", data.token);
      navigate("/ideas");
    } catch (error) {
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100">
      {/* decorative background blur */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,200,100,0.4),transparent_60%)]" />

      {/* card */}
      <div className="relative w-full max-w-md rounded-2xl bg-white/70 backdrop-blur-xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Create Account
        </h2>

        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="text-sm text-gray-600 block mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Eg. Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border bg-white/80 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Email */}
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

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600 block mb-1">Password</label>
            <input
              type="password"
              placeholder="Min 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border bg-white/80 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <input type="checkbox" className="mt-1 accent-amber-500" />
            <p>
              I agree to the{" "}
              <span className="text-amber-600 cursor-pointer hover:underline">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-amber-600 cursor-pointer hover:underline">
                Privacy Policy
              </span>
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={handleSignUp}
            disabled={loading || !email || !name || !password}
            className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </div>

        <p className="text-sm text-gray-600 text-center mt-6">
          Already have an account?{" "}
          <span
            className="text-amber-600 cursor-pointer hover:underline"
            onClick={() => navigate("/signin")}
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
}
