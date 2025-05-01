// import "./App.css";
import { Provider } from "react-redux";
import HomePage from "./app/page";
import { store } from "./app/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <div className="min-h-screen bg-muted/40">
          <HomePage />
        </div>
      </Provider>
    </>
  );
}

export default App;
