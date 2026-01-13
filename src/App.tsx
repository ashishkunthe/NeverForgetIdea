import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { ProtectedRoute } from "./components/ProtectedRoutes";
import { AllIdeas } from "./pages/AllIdeas";
import { Idea } from "./pages/Idea";
import { Welcome } from "./pages/Welcome";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Welcome />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/ideas" element={<AllIdeas />} />
          <Route path="/idea/:id" element={<Idea />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
