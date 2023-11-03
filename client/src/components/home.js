import React, { useEffect, useState } from "react";

import Layout from "./layout/layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearchResults } from "./context/search";

const Home = () => {
  const [list, setList] = useState([]);
  const naviagte = useNavigate();
  const { searchResults } = useSearchResults();
  console.log(searchResults)
  const [displayedCourses, setDisplayedCourses] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setcurrentPage] = useState(1);

  // fetching the list of all courses
  const getlist = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/courses/getCourses"
      );
      setList(data);
      setDisplayedCourses(data)
    } catch (error) {
      console.error("Error fetching course list:", error);
    }
  };

  useEffect(() => {
    getlist();
  }, []);

  useEffect(() => {
    // update displayed courses when search results change that we are receiving from the context
    updateDisplayedCourses();
  }, [searchResults]);

  const updateDisplayedCourses = () => {
    console.log(searchResults)
    if (searchResults.length > 0) {
      // if search results are available then display them 
      setDisplayedCourses(searchResults);
    } else {
      // if no search results then display all the courses
      setDisplayedCourses(list);
    }
    setcurrentPage(1); // reseting to the first page when changing the displayed courses
  };
   // these are the variables which help in the pagination. 
  const totalpages = Math.ceil(displayedCourses.length / itemsPerPage); 
  const pages = [...Array(totalpages).keys()].map((page) => page + 1);
  const indexofLastTodo = currentPage * itemsPerPage;
  const indexofFirstTodo = indexofLastTodo - itemsPerPage;
  const visible = displayedCourses.slice(indexofFirstTodo, indexofLastTodo);

  const prevPageHandler = () => {
    if (currentPage > 1) setcurrentPage(currentPage - 1);
  };

  const nextPageHandler = () => {
    if (currentPage < totalpages) setcurrentPage(currentPage + 1);
  };

  return (
    <Layout>
      <div className="m-4">
        <div className="text-lg text-black">
          {" "}
          Courses Per Page
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(e.target.value);
              setcurrentPage(1);
            }}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="12">12</option>
            <option value={displayedCourses.length}>ALL</option>
          </select>
        </div>

        <div className="m-4 p-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {visible.map((p) => (
            <div
              className="bg-white border rounded-lg shadow-lg m-4 w-72"
              key={p.name}
            >
              <div className="bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500 via-purple-400 to-indigo-800 text-white py-2 px-4">
                <h5 className="card-title text-xl font-bold">{p.name}</h5>
              </div>
              <div className="p-4">
                <p className="card-text text-black">
                  <strong>By: </strong>
                  {p.instructor}
                </p>
                <br />
                <p className="card-text text-black">
                  <strong>Description: </strong>
                  {p.description}
                </p>
                <br />
                <p className="card-text text-green-500 font-semibold">
                  <strong>Enrollment Status: </strong> {p.enrollmentStatus}
                </p>
                <p className="card-text text-slate-600">
                  <strong>Duration: </strong>
                  {p.duration}
                </p>
                <button
                  className="btn btn-primary mt-4 bg-blue-500 hover:bg-blue-600 hover:scale-110 text-white font-semibold py-2 px-4 rounded-full"
                  onClick={() => naviagte(`/home/course/${p.id}`)}
                >
                  More Details
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between m-4">
          <span
            className="text-lg text-black cursor-pointer"
            onClick={prevPageHandler}
          >
            Prev
          </span>
          <div className="flex justify-center m-4">
            <p>
              {pages.map((page) => (
                <span
                  key={page}
                  onClick={() => setcurrentPage(page)}
                  className={`cursor-pointer p-2 mx-2 ${
                    currentPage === page
                      ? "bg-blue-500 text-white rounded-[100%]"
                      : "hover:bg-blue-200"
                  }`}
                >
                  {page}
                </span>
              ))}
            </p>
          </div>
          <span
            className="text-lg text-black cursor-pointer"
            onClick={nextPageHandler}
          >
            Next
          </span>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
