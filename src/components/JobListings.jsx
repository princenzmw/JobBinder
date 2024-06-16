import { useState, useEffect } from "react";
import JobListing from "./JobListing";
import Spinner from "./Spinner";
import axios from "axios";
import PropTypes from "prop-types";

// Utility function to parse salary string and convert it to a number
const parseSalary = (salaryStr) => {
  const matches = salaryStr.match(/\$([0-9]+)K\s*-\s*\$([0-9]+)K/);
  if (matches) {
    const minSalary = parseInt(matches[1], 10) * 1000;
    const maxSalary = parseInt(matches[2], 10) * 1000;
    return (minSalary + maxSalary) / 2;
  }
  return 0; // Default value if parsing fails
};

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const apiUrl = isHome
        ? `${import.meta.env.VITE_API_BASE_URL}/jobs?_limit=3`
        : `${import.meta.env.VITE_API_BASE_URL}/jobs?_sort=title&_order=asc`;
      try {
        const res = await axios.get(apiUrl);
        const jobs = res.data.map((job) => ({
          ...job,
          salary: parseSalary(job.salary),
        }));
        setJobs(jobs);
      } catch (error) {
        console.log("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [isHome]);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

JobListings.propTypes = {
  isHome: PropTypes.bool,
};

export default JobListings;
