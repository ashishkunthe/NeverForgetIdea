import axios from "axios";
import { useEffect, useState } from "react";

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
  const [data, setData] = useState(null);
  const [ideas, setIdeas] = useState<Ideas[]>([]);

  useEffect(() => {
    async function fetchIdeas() {
      const response = await axios.get(BACKEND_URL, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      setIdeas(response.data.ideas);
      setData(response.data);
    }

    fetchIdeas();
  }, []);

  function ideass() {
    console.log(data);
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-100 via-orange-100 to-yellow-100 p-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">
        Your Ideas
      </h2>

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

                <h3 className="absolute bottom-4 left-4 right-4 text-lg font-semibold text-white leading-snug drop-shadow">
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

      <div className="mt-10 flex justify-center">
        <button
          onClick={ideass}
          className="text-sm text-gray-600 hover:underline"
        >
          Debug: log response
        </button>
      </div>
    </div>
  );
}
