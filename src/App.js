import { BrowserRouter as Router,  Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import PrivateRoute from "./components/Auth/PrivateRoute";
import ToDoList from "./components/ToDoList";
import { AuthProvider } from "./context/Auth";



function App() {
  return (
    <>
      <AuthProvider>
      <Router>
        <PrivateRoute exact path="/" component={ToDoList}/>
        <Route exact path="/login" component={Login}/>
      </Router>
      </AuthProvider>
    </>
  );
}

export default App;
