import axios from "axios";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  LoaderFunction,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage from "./pages/JobPage";
import jobLoader from "./loaders/jobLoader";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";

interface Job {
  id: string;
  title: string;
  type: string;
  location: string;
  description: string;
  salary: string;
  company: {
    name: string;
    description: string;
    contactEmail: string;
    contactPhone: string;
  };
}

const App = () => {
  // Add New Job
  const addJob = async (newJob: Job) => {
    try {
      const res = await axios.post("/api/jobs", newJob, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  // Delete Job
  const deleteJob = async (id: string) => {
    try {
      const res = await axios.delete(`/api/jobs/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  // Update Job
  const updateJob = async (job: Job) => {
    try {
      const res = await axios.put(`/api/jobs/${job.id}`, job, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route
          path="/edit-job/:id"
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={jobLoader as LoaderFunction}
        />
        <Route
          path="/jobs/:id"
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader as LoaderFunction}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
