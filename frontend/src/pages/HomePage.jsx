import RateLimiterUI from "@components/RateLimiterUI";
import Navbar from "@components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

export default () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = axios.fetch("http://localhost:5001/api")
      } catch (er) {
        console.log(er);
      }
    };
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimiterUI />}
    </div>
  );
};
