import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "@lib/utils.js";
import { Link } from "react-router";
import toast from "react-hot-toast";
import api from "@lib/axios";

export default ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note ?")) return;
    try {
      await api.delete("http://localhost:5001/");
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (er) {
      toast.error("Failed to delete note");
    }
  };

  return (
    <Link
      to={`/notes/${note._id}`}
      className="card bg-base-100 hover:shaodw-lg transition-all duration-200 border-t-4 border-solid border-[#00FF90]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span>{formatDate(new Date(note.createdAt))}</span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
