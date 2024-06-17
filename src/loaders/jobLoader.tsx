import { LoaderFunctionArgs } from "react-router-dom";
import axios from "axios";

const jobLoader = async ({ params }: LoaderFunctionArgs) => {
  try {
    const res = await axios.get(`/api/jobs/${params.id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching job:", error);
    throw error;
  }
};

export default jobLoader;
