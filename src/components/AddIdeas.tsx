import axios from "axios";
import { useState } from "react";

const BACKEND_URL = "http://localhost:5000/idea/create";

export function AddIdeaModule({ setIsOpen }: any) {
  const [title, setTitle] = useState("");
  const [mainIdea, setMainIdea] = useState("");
  const [howToAchieve, setHowToAchieve] = useState("");
  const [motivation, setMotivation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function submit() {
    if (!title || !mainIdea) return;
    try {
      setIsLoading(true);

      const response = await axios.post(
        BACKEND_URL,
        { title, mainIdea, howToAchieve, motivation },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      alert(response.data.message);

      setTitle("");
      setMainIdea("");
      setHowToAchieve("");
      setMotivation("");
      setIsOpen(false);
    } catch (error) {
      alert("Failed to save idea");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 z-10">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Add New Idea
        </h3>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Title"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="What Is Your Main Idea"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
            onChange={(e) => setMainIdea(e.target.value)}
          />
          <input
            type="text"
            placeholder="How you thinking to achieve it ?"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
            onChange={(e) => setHowToAchieve(e.target.value)}
          />
          <input
            type="text"
            placeholder="What is Your motivation for this idea ? "
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
            onChange={(e) => setMotivation(e.target.value)}
          />

          <button
            onClick={submit}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg font-medium transition"
          >
            {isLoading ? "Loading..." : "Save Idea"}
          </button>
        </div>
      </div>
    </div>
  );
}
