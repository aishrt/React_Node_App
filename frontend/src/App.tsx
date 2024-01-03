import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes";
import { HelmetProvider } from "react-helmet-async";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify";
import { MyContextProvider } from "./context/MyContextProvider";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ToastContainer />
        <MyContextProvider>
          <AppRoutes />
        </MyContextProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
