import { Github, Twitter } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Welcome() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/ideas");
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <nav className="px-8 py-6 flex justify-between items-center border-b border-black/10">
        <span className="text-2xl font-bold tracking-tight">IDEA PLANNER</span>

        <div className="flex items-center gap-8">
          <button
            onClick={() =>
              document.getElementById("method")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="text-lg opacity-70 hover:opacity-100 transition"
          >
            Method
          </button>

          <button
            onClick={() => navigate("/signin")}
            className="text-lg underline"
          >
            Login
          </button>
        </div>
      </nav>

      <section className="flex-1 flex flex-col justify-center px-8 py-24">
        <h1 className="text-7xl font-extrabold leading-none max-w-5xl">
          Stop collecting ideas.
          <br />
          Start executing them.
        </h1>

        <p className="mt-10 text-2xl text-black/60 max-w-3xl leading-relaxed">
          Idea Planner helps you turn raw ideas into structured execution plans
          and reminds you to act on them daily.
        </p>

        <div className="mt-16 flex gap-6">
          <button
            onClick={() => navigate("/signup")}
            className="
              px-14 py-6
              bg-black text-white
              text-xl font-medium
              rounded-full
              hover:bg-black/90
              transition
            "
          >
            Create your first plan
          </button>

          <button
            onClick={() =>
              document.getElementById("how-it-works")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="px-14 py-6 border border-black text-xl rounded-full hover:bg-black hover:text-white transition"
          >
            See how it works
          </button>
        </div>
      </section>

      <section id="method" className="px-8 py-32 border-t border-black/10">
        <div className="max-w-6xl">
          <h2 className="text-5xl font-bold mb-20">
            A simple system for execution.
          </h2>

          <div className="grid md:grid-cols-3 gap-20 text-xl">
            <div>
              <p className="font-semibold mb-4">1. Capture</p>
              <p className="text-black/60 leading-relaxed">
                Store ideas intentionally. Each idea is something you plan to
                act on not a forgotten note.
              </p>
            </div>

            <div>
              <p className="font-semibold mb-4">2. Structure</p>
              <p className="text-black/60 leading-relaxed">
                Use AI to generate a clear execution plan with summaries,
                roadmaps, challenges, and next steps.
              </p>
            </div>

            <div>
              <p className="font-semibold mb-4">3. Act</p>
              <p className="text-black/60 leading-relaxed">
                Receive a daily reminder at your chosen time. No pressure. Just
                consistency.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="px-8 py-32 bg-black text-white">
        <div className="max-w-5xl">
          <h3 className="text-5xl font-bold mb-12">
            Built for thinking clearly.
          </h3>

          <p className="text-2xl text-white/70 leading-relaxed max-w-4xl">
            The AI doesn’t generate ideas for you.
            <br />
            It helps you think through execution.
            <br />
            <br />
            No autonomous agents.
            <br />
            No productivity theater.
            <br />
            Just structured reasoning.
          </p>
        </div>
      </section>

      <section className="px-8 py-32 border-t border-black/10">
        <div className="max-w-5xl">
          <h3 className="text-5xl font-bold mb-12">
            Consistency beats motivation.
          </h3>

          <p className="text-2xl text-black/60 leading-relaxed max-w-3xl">
            Most ideas fail because they’re forgotten.
            <br />
            <br />
            Idea Planner sends a daily email reminder with context from your
            plan not noise.
          </p>
        </div>
      </section>

      <section className="px-8 py-40 bg-black text-white text-center">
        <h2 className="text-6xl font-bold mb-12">
          Turn your next idea into action.
        </h2>

        <button
          onClick={() => navigate("/signup")}
          className="
            px-16 py-7
            bg-white text-black
            text-2xl font-medium
            rounded-full
            hover:bg-white/90
            transition
          "
        >
          Start now
        </button>
      </section>

      <footer className="px-8 py-12 text-black flex justify-between">
        <span>© 2026 Idea Planner</span>
        <div className="flex gap-10">
          <a href="https://github.com/ashishkunthe" target="_blank">
            <Twitter color="black" />
          </a>
          <a href="https://github.com/ashishkunthe" target="_blank">
            <Github color="black" />
          </a>
        </div>
      </footer>
    </div>
  );
}
