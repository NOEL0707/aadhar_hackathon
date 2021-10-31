import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { SendReceive } from "./components/Home"
import SentRequests from "./components/SentRequests";
import ReceivedRequests from "./components/ReceivedRequests";
import Requests from "./components/Requests";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; //used for routing
import Protectedroutes from "./components/Protectedroutes";
function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Protectedroutes path="/Home" component={SendReceive} />
          <Route path="/login" component={Login} />
          <Protectedroutes path="/sentrequests" component={SentRequests} />
          <Protectedroutes
            path="/receivedrequests"
            component={ReceivedRequests}
          />
          <Protectedroutes path="/requests" component={Requests} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
