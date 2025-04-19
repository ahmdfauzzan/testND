import React from "react";
import { RouteList } from "./routes/RouteList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

// import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <RouteList />
      </QueryClientProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
