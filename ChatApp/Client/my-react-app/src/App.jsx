import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Users from "./Users";
import Chat from "./Chat";

const PrivateRoute = ({ children }) => {
  return localStorage.getItem("token")
    ? children
    : <Navigate to="/login" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/users"
          element={<PrivateRoute><Users /></PrivateRoute>}
        />
      <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}