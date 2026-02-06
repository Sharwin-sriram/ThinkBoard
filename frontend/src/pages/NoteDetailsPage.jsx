import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import api from "@lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

export default () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/${id}`);
        setNote(res.data);
      } catch (er) {
        console.log("Error while fetching: ", er);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  });

  return <div></div>;
};
