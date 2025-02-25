import "./App.css";
import NavBar from "./components/NavBar";
import ChatBox from "./components/ChatBox";
import Welcome from "./components/Welcome";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const App: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    console.log("🚀 ~ loading:", loading)
    return <div>Loading...</div>;
  }

  if (error) {
    console.log("🚀 ~ error:", error)
    return <div>Error: {error.message}</div>;
  }
  
  return (
    <div className="App">
      <NavBar />
      {!user ? <Welcome /> : <ChatBox />}
      {/* {user && <div>User: {user.email}</div>} */}
    </div>
  );
};

export default App;