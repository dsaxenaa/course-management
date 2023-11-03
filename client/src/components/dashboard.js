import React, { useEffect, useState } from "react";

import Layout from "./layout/layout";
import axios from "axios";
import { useAuth } from "./context/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const naviagte = useNavigate();
  const [auth, setAuth] = useAuth();
  const [courses, setCourses] = useState([]);

  const getYourCourses = async () => {
    try {
      const id = auth?.user._id;
      console.log(id);
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/courses/yourCourses",  //api to call all your enrolled courses
        { id }
      );
      console.log(data);
      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getYourCourses();
  }, []);

  const handleClick = async (id) => {
    naviagte(`/home/courseDetails/${id}`)  //navigating inside that respective course using the course ID
  };

  return (
    <Layout>
      <div className="m-[3rem]">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Your Enrolled Courses
        </h1>
        <div className="flex flex-col items-center">
          {courses?.map((course, i) => (
            <div
              key={i}
              className="w-[40rem] h-64 p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow mb-6 cursor-pointer hover:scale-105"
              onClick={()=>handleClick(course.id)}
            >
              <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
              <p className="text-gray-600">
                <strong>Instructor: </strong>
                {course.instructor}
              </p>
              <br />
              <p className="text-gray-600">
                <strong>Course ID: </strong>
                {course.id}
              </p>
              <br />
              <p className="text-gray-800">
                <strong>Description: </strong>
                {course.description}
              </p>
              <br />
              <p className="text-gray-700">
                <strong>Duartion: </strong>
                {course.duration}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
