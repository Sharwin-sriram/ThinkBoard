import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "@lib/axios";

export default () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }
    setLoading(true);
    try {
      await api.post("/", { title, content });
      toast.success("Note created successfully");
      navigate("/");
    } catch (er) {
      if (error.staus === 429) {
        toast.error(
          "Slow down you're creating too many notess in a short period of time",
          { duration: 4000 },
        );
        return;
      }
      toast.error("Failed to create note");
      console.log("Error submitting", er);
    } finally {
      setLoading(false);
    }
  };
  return <div></div>;
};
