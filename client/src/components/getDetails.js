import React, { useEffect, useState } from "react";

import Layout from "./layout/layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "./context/auth";
import { useParams } from "react-router-dom";

const GetDetails = () => {
  const [auth, setAuth] = useAuth();
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const getYourCourseDetails = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/v1/courses/detailedCourse/${auth.user._id}/${id}`   //getting the whole details of the course using the course ID and student ID
    );
    console.log(data);
    setCourse(data);
    setIsCompleted(data.status);
    // console.log(isCompleted)
  };

  useEffect(() => {
    getYourCourseDetails();
  }, [id]);

  const handleClick = async () => {
    try {
      const studentId = auth.user._id;
      const courseId = id;
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/courses/markCourse",  //marking the course as completed or uncompleted using this api call
        { studentId, courseId }
      );
      console.log(data);
      if (data.message == "Course completed for the student!!") {
        toast.success("Course Completed!");
        setIsCompleted(true);
      } else {
        toast("Course marked as uncompleted!");
        setIsCompleted(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div>
        <div className="m-[3rem]">
          <div className="bg-black/70 p-[1rem] rounded-md shadow-lg max-w-xl mx-auto space-y-2 ">
            <h1 className="text-2xl font-bold text-center text-white mb-4">
              Course Details
            </h1>
          </div>
          <div className="bg-white p-6 rounded-md shadow-lg max-w-xl mx-auto space-y-4">
            <h4 className="font-semibold text-black text-xl">
              <strong>Name: </strong>
              {course.name}
            </h4>
            <p className="text-xl text-gray-700">
              Description: {course.description}
            </p>
            <h4 className="text-lg font-semibold text-black-500">
              Duration: {course.duration}
            </h4>
            <h4 className="text-lg font-semibold text-slate-600">
              Instructor: {course.instructor}
            </h4>
            <h4 className="text-lg font-semibold text-green-600">
              Enrollment Status: {course.enrollmentStatus}
            </h4>
            <h4 className="text-lg font-semibold text-black-600">
              <strong>Location: </strong>
              {course.location}
            </h4>
            <h4 className="text-lg font-semibold text-black-700">
              <strong>Schedule: </strong>
              {course.schedule}
            </h4>
            <h4 className="text-lg font-semibold text-slate-800">
              Duration: {course.duration}
            </h4>
            <h2 className="text-xl font-semibold mt-4 text-slate-600">
              Prerequisites
            </h2>
            <ul className="list-disc ml-8">
              {course.prerequisites?.map((p, i) => (
                <div key={i} className="text-gray-700 text-lg">
                  {p}
                </div>
              ))}
            </ul>
            <h2 className="text-xl font-semibold mt-4 text-indigo-700">
              Syllabus
            </h2>
            {course.syllabus?.map((p, i) => (
              <div key={i} className="mt-4">
                <h3 className="text-lg font-semibold text-indigo-600">
                  Week: {p.week}
                </h3>
                <p className="text-gray-700">Topic: {p.topic}</p>
                <p className="text-gray-700">Content: {p.content}</p>
              </div>
            ))}
            <button
              className={`${
                isCompleted ? "bg-red-400" : "bg-green-400"
              } text-white px-4 py-2 mt-4 rounded-md hover:bg-indigo-600`}
              onClick={handleClick}
            >
              {isCompleted ? "Mark it as uncomplete!" : "Mark it as complete!"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GetDetails;
