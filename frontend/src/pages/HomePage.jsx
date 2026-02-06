import { useEffect, useState } from "react";
import RateLimiterUI from "@components/RateLimiterUI";
import NoteCard from "@components/NoteCard";
import Navbar from "@components/Navbar";
import toast from "react-hot-toast";
import axios from "axios";

export default () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchnotes = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/notes");
        const data = await res.data;
        setNotes(data);
      } catch (er) {
        if (er.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load Notes");
        }
        console.log("Error fetching notes", er);
      } finally {
        setLoading(false);
      }
    };
    fetchnotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-primary py-10">Loading...</div>}
        {!loading && notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => {
              return (
                <div key={note._id} className="p-4 border roundeed">
                  {/* {note.title} | {note.content} */}
                  <NoteCard />
                </div>
              );
            })}
          </div>
        )}
        {isRateLimited && <RateLimiterUI />}
      </div>
    </div>
  );
};
