import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BACKEND_URL = `${import.meta.env.BACKEND_URL}/idea`;

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

        setIdea(response.data.idea);
        setPlan(response.data.plan);
      } catch (error) {
        console.error("Failed to fetch idea");
      }
    }

    if (id) getIdea();
  }, [id]);

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

      setPlan(response.data.plan);
    } catch (error) {
      console.error("Failed to generate plan");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10 flex items-center gap-4">
        <button
          onClick={() => navigate("/ideas")}
          className="
            px-3 py-1.5
            rounded-lg
            border border-black/20
            bg-white
            text-black
            font-medium
            hover:bg-black hover:text-white
            transition
          "
        >
          ← Back
        </button>

        <div>
          <h1 className="text-2xl font-semibold text-black">Idea Details</h1>
          <p className="text-sm text-gray-600">Idea ID: {id}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-3">
        {/* LEFT: Idea Info */}
        <div className="lg:col-span-1 bg-gray-50 border border-black/10 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-black mb-4">
            Idea Information
          </h2>

          {idea ? (
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-medium text-gray-600">Title</p>
                <p className="text-black">{idea.title}</p>
              </div>

              <div>
                <p className="font-medium text-gray-600">Main Idea</p>
                <p className="text-black">{idea.mainIdea}</p>
              </div>

              <div>
                <p className="font-medium text-gray-600">Motivation</p>
                <p className="text-black">{idea.motivation}</p>
              </div>

              <div>
                <p className="font-medium text-gray-600">How to Achieve</p>
                <p className="text-black">{idea.howToAchieve}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Loading idea…</p>
          )}
        </div>

        {/* RIGHT: Plan */}
        <div className="lg:col-span-2 bg-gray-50 border border-black/10 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-black mb-4">
            Execution Plan
          </h2>

          {plan ? (
            <div className="space-y-6">
              {/* Summary */}
              <div>
                <p className="font-medium text-gray-600 mb-1">Summary</p>
                <p className="text-sm text-black">{plan.summary}</p>
              </div>

              {/* Roadmap */}
              <div>
                <p className="font-medium text-gray-600 mb-2">Roadmap</p>
                <div className="space-y-3">
                  {plan.roadmap.map((step, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 border border-black/10 rounded-xl p-4"
                    >
                      <p className="font-semibold text-black">{step.title}</p>
                      <p className="text-sm text-gray-700 mt-1">
                        {step.description}
                      </p>
                      <p className="text-xs text-gray-600 mt-2">
                        Estimated: {step.estimate}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lists */}
              <div className="grid gap-6 sm:grid-cols-3 text-sm">
                <div>
                  <p className="font-medium text-gray-600 mb-2">Challenges</p>
                  <ul className="list-disc list-inside text-black space-y-1">
                    {plan.challenges.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-medium text-gray-600 mb-2">Improvements</p>
                  <ul className="list-disc list-inside text-black space-y-1">
                    {plan.improvements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-medium text-gray-600 mb-2">Next Steps</p>
                  <ul className="list-disc list-inside text-black space-y-1">
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
              disabled={generating}
              className="
                inline-flex items-center gap-2
                px-6 py-3
                rounded-full
                bg-black
                hover:bg-black/90
                text-white
                font-medium
                transition
                disabled:opacity-50
              "
            >
              ✦ {generating ? "Generating…" : "Generate with AI"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
