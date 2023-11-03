import fs from "fs";

// For the courses, we are using hardcoded courses which are saved as json in file sampleCourses.json
const sampleCourseData = JSON.parse(
  fs.readFileSync("sampleCourses.json", "utf-8") // parsing that json file
);

export const getCourses = async (req, res) => {
  return res.json(sampleCourseData); // returing that json file as a list
};

export const getSingleCourse = async (req, res) => {
  const { id } = req.params;
  const courseID = id;
  console.log(id);
  const course = sampleCourseData.find((c) => c.id == courseID); // finding the course using the course ID
  console.log(course);

  if (course) {
    return res.json(course); // sending the course data as JSON if found
  } else {
    return res.status(404).json({ message: "Course not found" }); // returning a 404 status if the course is not found
  }
};

export const enrollStudent = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    const course = sampleCourseData.find((c) => c.id == courseId); // finding the course using the course ID
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    if (course.students.some((student) => student.id == studentId)) {
      // checking if student is already enrolled
      return res
        .status(400)
        .json({ message: "Student is already enrolled in the course" });
    }
    const newStudent = {
      id: studentId,
      name: req.body.name,
      email: req.body.email,
    };

    // pushing the new student object into the enrolledStudents array of that course
    course.students.push(newStudent);

    fs.writeFileSync(
      "sampleCourses.json",
      JSON.stringify(sampleCourseData, null, 2) // updating that json file so that the new changes (new students) can be seen
    );

    return res.json({ message: "Student enrolled successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const getStudentCourse = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(req.body);
    // const sId = studentId.toString()
    // console.log(typeof studentId);
    // console.log(typeof sId);
    // console.log("12345"==="12345")

    const enrolledCourses = sampleCourseData.filter((course) => {
      // here we are filtering the courses the student ID
      for (let i = 0; i < course.students.length; i++) {
        const student = course.students[i];
        if (student.id == id) {
          return true;
        }
      }
      return false;
    });

    const response = enrolledCourses.map((course) => ({
      // making a new object of that enrolled courses
      name: course.name,
      instructor: course.instructor,
      duration: course.duration,
      id: course.id,
      description: course.description,
    }));

    console.log(response);
    return res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const markCourse = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    const course = sampleCourseData.find((c) => c.id == courseId); // finding the course using the course ID

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const studentIndex = course.students.findIndex(
      // finding the index of the enrolled student using student ID
      (student) => student.id == studentId
    );

    if (studentIndex === -1) {
      return res
        .status(400)
        .json({ message: "Student is not enrolled in the course" });
    }

    course.students[studentIndex].completed = // marking and unmarking the course
      !course.students[studentIndex].completed;

    fs.writeFileSync(
      "sampleCourses.json",
      JSON.stringify(sampleCourseData, null, 2) // updating the json file
    );

    const completionMessage = course.students[studentIndex].completed // making the completion message based upon the completed status
      ? "Course completed for the student!!"
      : "Course not completed!";

    return res.json({ message: completionMessage });
  } catch (error) {
    console.log(error);
  }
};

export const DetailedCourse = async (req, res) => {
  try {
    const { studentId, courseId } = req.params;
    // console.log(studentId, courseId);
    const course = sampleCourseData.find((c) => c.id == courseId); // finding the course

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const isEnrolled = course.students.some(
      //finding the student
      (student) => student.id == studentId
    );

    if (!isEnrolled) {
      return res
        .status(400)
        .json({ message: "Student is not enrolled in the course" });
    }

    const studentDetails = course.students.find(
      (student) => student.id == studentId
    );
    const status = studentDetails.completed; //getting the completion status of that specific student

    const courseInfo = {
      id: course.id,
      name: course.name,
      instructor: course.instructor,
      thumbnail: course.thumbnail,
      description: course.description,
      enrollmentStatus: course.enrollmentStatus,
      duration: course.duration,
      schedule: course.schedule,
      location: course.location,
      prerequisites: course.prerequisites,
      syllabus: course.syllabus,
      status,
    };
    console.log(courseInfo);
    return res.json(courseInfo);
  } catch (error) {
    console.log(error);
  }
};

export const Search = async (req, res) => {
  const { keyword } = req.body;
  console.log(keyword);

  const matchingCourses = sampleCourseData.filter((course) => {
    // here we are filtering the courses based upon the keyword. we are using object.values property to find the value of those courses with whom the keyword matches.

    const keywordMatch = keyword
      ? Object.values(course).some(
          (value) =>
            value &&
            typeof value === "string" &&
            value.toLowerCase().includes(keyword.toLowerCase())
        )
      : true;

    return keywordMatch;
  });
  // console.log(matchingCourses)

  res.json(matchingCourses);
};
