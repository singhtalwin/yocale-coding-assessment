import "./app.css";
import { TicketList } from "./ticket-list/TicketList";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { TicketDetailedView } from "./ticket/TicketDetailedView";

export type AppProps = {};

const router = createBrowserRouter([
  {
    path: "/",
    element: <TicketList />,
  },
  {
    path: "/tickets/:id",
    element: <TicketDetailedView />,
  },
]);

const App = () => {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
