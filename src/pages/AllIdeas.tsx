import axios from "axios";
import { useEffect, useState } from "react";
import { AddIdeaModule } from "../components/AddIdeas";

const BACKEND_URL = "http://localhost:5000/idea/all";

interface Ideas {
  _id: string;
  title: string;
  mainIdea: string;
}

const headerVariants = [
  "from-amber-400 via-yellow-400 to-orange-500",
  "from-lime-400 via-yellow-400 to-amber-500",
  "from-yellow-300 via-amber-400 to-orange-400",
  "from-amber-300 via-lime-300 to-yellow-400",
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
  }, [ideas]);

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-100 via-orange-100 to-yellow-100 p-6 relative">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl font-semibold text-gray-800">Your Ideas</h2>

        <button
          onClick={() => setIsOpen(true)}
          className="
            px-5 py-2
            rounded-xl
            bg-white/40
            backdrop-blur-md
            border border-white/30
            shadow-md
            text-gray-800
            font-medium
            hover:bg-white/60
            transition
    "
        >
          + Create Idea
        </button>
      </div>

      {isOpen && <AddIdeaModule setIsOpen={setIsOpen} />}

      {ideas.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ideas.map((idea) => (
            <div
              key={idea._id}
              className="bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition"
            >
              <div
                className={`relative h-40 overflow-hidden bg-linear-to-br ${getHeaderStyle(
                  idea._id
                )}`}
              >
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/25 rounded-full blur-2xl" />
                <div className="absolute top-12 right-0 w-32 h-32 bg-black/10 rounded-full blur-2xl" />
                <div className="absolute inset-0 bg-black/10" />

                <h3 className="absolute bottom-4 left-4 right-4 text-lg font-semibold text-white drop-shadow">
                  {idea.title}
                </h3>
              </div>

              <div className="p-4">
                <p className="text-sm text-gray-700 line-clamp-3">
                  {idea.mainIdea}
                </p>

                <button className="mt-3 text-sm font-medium text-amber-600 hover:underline">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 mt-20">
          No ideas yet. Start by adding a new idea
        </div>
      )}
    </div>
  );
}
