import axios from "axios";
import { useState } from "react";

const BACKEND_URL = `${import.meta.env.BACKEND_URL}/idea/create`;

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
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl bg-[#111] text-white shadow-2xl z-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h3 className="text-lg font-semibold">Create New Idea</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/60 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className="
              w-full px-4 py-2
              rounded-lg
              bg-white/5
              border border-white/10
              placeholder:text-white/40
              text-white
              focus:outline-none
              focus:ring-2
              focus:ring-gray-300
            "
          />

          <input
            type="text"
            placeholder="What is your main idea?"
            onChange={(e) => setMainIdea(e.target.value)}
            className="
              w-full px-4 py-2
              rounded-lg
              bg-white/5
              border border-white/10
              placeholder:text-white/40
              text-white
              focus:outline-none
              focus:ring-2
              focus:ring-gray-300
            "
          />

          <input
            type="text"
            placeholder="How do you plan to achieve it?"
            onChange={(e) => setHowToAchieve(e.target.value)}
            className="
              w-full px-4 py-2
              rounded-lg
              bg-white/5
              border border-white/10
              placeholder:text-white/40
              text-white
              focus:outline-none
              focus:ring-2
              focus:ring-gray-300
            "
          />

          <input
            type="text"
            placeholder="What motivates you?"
            onChange={(e) => setMotivation(e.target.value)}
            className="
              w-full px-4 py-2
              rounded-lg
              bg-white/5
              border border-white/10
              placeholder:text-white/40
              text-white
              focus:outline-none
              focus:ring-2
              focus:ring-gray-300
            "
          />

          {/* Action */}
          <button
            onClick={submit}
            disabled={isLoading}
            className="
              mt-2
              w-full
              py-2.5
              rounded-lg
              bg-white
              hover:bg-gray-200
              disabled:opacity-50
              text-black
              font-medium
              transition
            "
          >
            {isLoading ? "Saving..." : "Save Idea"}
          </button>
        </div>
      </div>
    </div>
  );
}
