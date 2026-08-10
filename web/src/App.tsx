import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { router } from "./router";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
