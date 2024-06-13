import { Link } from "react-router-dom";
import F0foPage from "../assets/images/404_page.png";

const NotFoundPage = () => {
  return (
    <section className="text-center flex flex-col justify-center items-center h-96">
      <img className="h-100 w-auto mt-16" src={F0foPage} alt="page not found" />
      <h1 className="text-6xl font-bold mb-4">Not Found</h1>
      <p className="text-xl mb-5">This page does not exist</p>
      <Link
        to="/"
        className="text-white bg-indigo-700 hover:bg-indigo-900 rounded-md px-3 py-2 mt-4"
      >
        Go Back
      </Link>
    </section>
  );
};
export default NotFoundPage;
