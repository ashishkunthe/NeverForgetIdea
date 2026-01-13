import axios from "axios";
import { useEffect, useState } from "react";
import { AddIdeaModule } from "../components/AddIdeas";
import { useNavigate } from "react-router-dom";
import { NotificationSettings } from "../components/NotificationSetting";

const BACKEND_URL = "http://localhost:5000/idea/all";

interface Ideas {
  _id: string;
  title: string;
  mainIdea: string;
}

const headerVariants = [
  "from-amber-600 via-orange-700 to-amber-800",
  "from-lime-600 via-emerald-700 to-teal-800",
  "from-yellow-600 via-amber-700 to-orange-800",
];

function getHeaderStyle(id: string) {
  const index =
    id.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) %
    headerVariants.length;

  return headerVariants[index];
}

export function AllIdeas() {
  const [ideas, setIdeas] = useState<Ideas[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchIdeas() {
      const response = await axios.get(BACKEND_URL, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      setIdeas(response.data.ideas);
    }

    fetchIdeas();
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f5f2] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl font-semibold text-gray-900">Your Ideas</h2>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSettingOpen(true)}
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            Notification Preferences
          </button>

          <button
            onClick={() => setIsOpen(true)}
            className="w-12 h-12 rounded-xl border border-dashed border-gray-300 flex items-center justify-center text-xl text-gray-600 hover:bg-gray-100 transition"
          >
            +
          </button>
        </div>
      </div>

      {isOpen && <AddIdeaModule setIsOpen={setIsOpen} />}
      {isSettingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsSettingOpen(false)}
          />

          {/* Modal */}
          <div className="relative z-50">
            <NotificationSettings setIsSettingOpen={setIsSettingOpen} />
          </div>
        </div>
      )}

      {/* Cards */}
      {ideas ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ideas.map((idea) => (
            <div
              key={idea._id}
              className="rounded-2xl overflow-hidden bg-[#111] text-white shadow-lg hover:scale-[1.01] transition"
            >
              {/* Gradient Header */}
              <div
                className={`relative h-44 bg-linear-to-br ${getHeaderStyle(
                  idea._id
                )}`}
              >
                <div className="absolute inset-0 bg-black/40" />

                <span className="absolute top-3 left-3 text-xs font-medium px-2 py-1 rounded-full bg-white/20 backdrop-blur">
                  DRAFT
                </span>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold leading-snug mb-2">
                    {idea.title}
                  </h3>
                  <p className="text-sm text-gray-300 line-clamp-3">
                    {idea.mainIdea}
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/idea/${idea._id}`)}
                  className="mt-4 inline-flex items-center justify-center gap-1 self-start px-3 py-1.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-gray-200 transition"
                >
                  View →
                </button>
              </div>
            </div>
          ))}

          {/* Create New Idea Card */}
          <div
            onClick={() => setIsOpen(true)}
            className="rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition cursor-pointer"
          >
            <div className="text-center p-10">
              <div className="text-2xl mb-2">+</div>
              <p className="font-medium">Create New Idea</p>
              <p className="text-sm text-gray-400">
                Start a new execution plan
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-600 mt-20">
          No ideas yet. Start by adding a new idea
        </div>
      )}
    </div>
  );
}
