import { Footer } from "./Container";
import "./index.css";
import {
  AdminPage,
  Blog,
  BookSelves,
  HomePage,
  Login,
  Media,
  Messenger,
  Post,
  Register,
  Result,
} from "./pages";
import { Route, Routes } from "react-router";
import { BookDetails } from "./Componenet";
import { Categorypage } from "./pages";
import { TbAdjustmentsMinus } from "react-icons/tb";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books&media" element={<Media />} />
        <Route path="/book-details/:id" element={<BookDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post" element={<Post />} />
        <Route path="/result/:title" element={<Result />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/message" element={<Messenger />} />
        <Route path="/category/:genres" element={<Categorypage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/shelve" element={<BookSelves />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
