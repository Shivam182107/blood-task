import { Route, Routes } from "react-router";
import "./App.css";
import Navabar from "./component/Navabar";
import SearchedDonor from "./pages/SearchedDonor";
import ReceiverForm from "./pages/ReceiverForm";

function App() {
  return (
    <div className="w-full h-screen flex flex-col">
      <Navabar />
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<ReceiverForm />} />
          <Route path="/donorlist" element={<SearchedDonor />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;