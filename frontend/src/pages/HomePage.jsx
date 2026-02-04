import RateLimiterUI from "@components/RateLimiterUI";
import { useEffect, useState } from "react";
import Navbar from "@components/Navbar";
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
          return;
        }
        console.log("Error fetching notes",er);
      } finally {
        setLoading(false);
      }
    };
    fetchnotes();
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar />
      {loading && <>Loading...</>}
      {!loading &&
        notes.map((note) => {
          const { id, title, content } = note;
          <div key={id}>
            <div className="">{title}</div>
            <div>{content}</div>
          </div>;
        })}
      {isRateLimited && <RateLimiterUI />}
    </div>
  );
};
