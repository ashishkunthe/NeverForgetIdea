import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BACKEND_URL = "http://localhost:5000/idea";

interface Idea {
  title: string;
  mainIdea: string;
  motivation: string;
  howToAchieve: string;
}

interface RoadMapItem {
  title: string;
  description: string;
  estimate: string;
}

interface Plan {
  summary: string;
  challenges: string[];
  improvements: string[];
  nextSteps: string[];
  roadmap: RoadMapItem[];
}

export function Idea() {
  const [idea, setIdea] = useState<Idea | null>(null);
  const [plan, setPlan] = useState<Plan | null>(null);

  const [generating, setGenerating] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getIdea() {
      try {
        const response = await axios.get(`${BACKEND_URL}/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        const data = response.data;
        setIdea(data.idea);
        setPlan(data.plan);
      } catch (error) {
        console.error("something went wrong");
      }
    }

    getIdea();
  }, [id, idea, plan]);

  async function generatePlan() {
    try {
      setGenerating(true);
      const response = await axios.post(
        `${BACKEND_URL}/assist/${id}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = await response.data;
      alert("plan generated");
      setPlan(data.plan);
      setGenerating(false);
    } catch (error) {
      console.error("Something went wrong");
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-100 via-amber-50 to-yellow-100 p-6">
      <div className="max-w-6xl mx-auto mb-8 flex items-center gap-4">
        <button
          onClick={() => navigate("/ideas")}
          className="
            px-3 py-1.5
            rounded-lg
            bg-white/60
            backdrop-blur-md
            border border-white/40
            text-amber-700
            font-medium
            hover:bg-white/80
            transition
          "
        >
          ← Back
        </button>

        <div>
          <h1 className="text-3xl font-semibold text-amber-900">
            Idea Details
          </h1>
          <p className="text-sm text-amber-700">Idea ID: {id}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 bg-white/70 backdrop-blur-xl border border-amber-200 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-amber-900 mb-4">
            Idea Information
          </h2>

          {idea ? (
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-medium text-amber-700">Title</p>
                <p className="text-gray-800">{idea.title}</p>
              </div>

              <div>
                <p className="font-medium text-amber-700">Main Idea</p>
                <p className="text-gray-800">{idea.mainIdea}</p>
              </div>

              <div>
                <p className="font-medium text-amber-700">Motivation</p>
                <p className="text-gray-800">{idea.motivation}</p>
              </div>

              <div>
                <p className="font-medium text-amber-700">How to Achieve</p>
                <p className="text-gray-800">{idea.howToAchieve}</p>
              </div>
            </div>
          ) : (
            <p className="text-amber-700">Loading idea...</p>
          )}
        </div>

        {/* RIGHT: Plan */}
        <div className="lg:col-span-2 bg-white/70 backdrop-blur-xl border border-amber-200 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-amber-900 mb-4">
            Execution Plan
          </h2>

          {plan ? (
            <div className="space-y-6">
              {/* Summary */}
              <div>
                <p className="font-medium text-amber-700 mb-1">Summary</p>
                <p className="text-sm text-gray-800">{plan.summary}</p>
              </div>

              {/* Roadmap */}
              <div>
                <p className="font-medium text-amber-700 mb-2">Roadmap</p>
                <div className="space-y-3">
                  {plan.roadmap.map((step, index) => (
                    <div
                      key={index}
                      className="bg-white border border-amber-100 rounded-xl p-4 shadow-sm"
                    >
                      <p className="font-semibold text-amber-900">
                        {step.title}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        {step.description}
                      </p>
                      <p className="text-xs text-amber-700 mt-2">
                        Estimated: {step.estimate}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lists */}
              <div className="grid gap-6 sm:grid-cols-3">
                <div>
                  <p className="font-medium text-amber-700 mb-2">Challenges</p>
                  <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
                    {plan.challenges.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-medium text-amber-700 mb-2">
                    Improvements
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
                    {plan.improvements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-medium text-amber-700 mb-2">Next Steps</p>
                  <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
                    {plan.nextSteps.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={generatePlan}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition"
            >
              {generating ? "Generating Plan..." : "Generate Plan"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
