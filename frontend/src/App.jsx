import NoteDetailsPage from "@pages/NoteDetailsPage";
import { Route, Routes } from "react-router";
import CreatePage from "@pages/CreatePage";
import HomePage from "@pages/HomePage";
import toast from "react-hot-toast";

export default () => {
  return (
    <div data-theme="forest">
      {/* <button onClick={() => toast.s uccess("Congrats")}>Click</button> */}
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/create"} element={<CreatePage />} />
        <Route path={"/note/:id"} element={<NoteDetailsPage />} />
      </Routes>
    </div>
  );
};
