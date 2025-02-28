import "./App.css";
import NavBar from "./components/NavBar";
import ChatBox from "./components/ChatBox";
import Welcome from "./components/Welcome";
import { useAuth } from "./hooks/useAuth";

const App: React.FC = () => {
  const { user, loading, error } = useAuth();

  if (loading) {
    console.log("🚀 ~ loading:", loading);
    return <div>Loading...</div>;
  }

  if (error) {
    console.log("🚀 ~ error:", error);
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="App">
      <NavBar />
      {!user ? <Welcome /> : <ChatBox />}
    </div>
  );
};

export default App;