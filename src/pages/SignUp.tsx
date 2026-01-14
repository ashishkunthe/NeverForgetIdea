import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = `${import.meta.env.BACKEND_URL}/auth/signup`;

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
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-md rounded-xl border border-black/10 bg-white shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-black text-center mb-6">
          Create account
        </h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-black/70 block mb-1">
              Full name
            </label>
            <input
              type="text"
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
                w-full px-4 py-3
                rounded-lg
                border border-black/20
                bg-white
                text-black
                placeholder:text-black/40
                focus:outline-none
                focus:ring-2
                focus:ring-black
              "
            />
          </div>

          <div>
            <label className="text-sm text-black/70 block mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full px-4 py-3
                rounded-lg
                border border-black/20
                bg-white
                text-black
                placeholder:text-black/40
                focus:outline-none
                focus:ring-2
                focus:ring-black
              "
            />
          </div>

          <div>
            <label className="text-sm text-black/70 block mb-1">Password</label>
            <input
              type="password"
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full px-4 py-3
                rounded-lg
                border border-black/20
                bg-white
                text-black
                placeholder:text-black/40
                focus:outline-none
                focus:ring-2
                focus:ring-black
              "
            />
          </div>

          <button
            onClick={handleSignUp}
            disabled={loading || !email || !name || !password}
            className="
              w-full mt-4
              bg-black
              hover:bg-black/90
              text-white
              font-medium
              py-3
              rounded-lg
              transition
              disabled:opacity-50
            "
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </div>

        <p className="text-sm text-black/60 text-center mt-6">
          Already have an account?{" "}
          <span
            className="text-black font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/signin")}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
