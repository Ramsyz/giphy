import Giphy from "./components/Giphy";
import "./App.css";
import Loader from "./components/Loader";
import Paginate from "./components/Paginate";

function App() {
  return (
    <div className="App">
      <Giphy />
      <Loader />
      <Paginate />
    </div>
  );
}

export default App;
