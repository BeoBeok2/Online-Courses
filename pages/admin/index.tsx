import Head from "next/head";
import React, { useState } from "react";

export default function Admin() {
  const [expandedCourses, setExpandedCourses] = useState<number[]>([]);
  const [approvedLessons, setApprovedLessons] = useState<{ [key: string]: boolean }>({});

  const courses = [
    {
      id: 1,
      name: "Khóa học 1",
      lessons: [
        {
          id: 1,
          name: "Bài học 1",
          videoSrc: "video1.mp4",
          approved: false,
        },
        {
          id: 2,
          name: "Bài học 2",
          videoSrc: "video2.mp4",
          approved: false,
        },
      ],
    },
    {
      id: 2,
      name: "Khóa học 2",
      lessons: [
        {
          id: 3,
          name: "Bài học 3",
          videoSrc: "video3.mp4",
          approved: false,
        },
        {
          id: 4,
          name: "Bài học 4",
          videoSrc: "video4.mp4",
          approved: false,
        },
      ],
    },
  ];

  const handleCourseClick = (courseId: number) => {
    if (expandedCourses.includes(courseId)) {
      setExpandedCourses((prevCourses) =>
        prevCourses.filter((id) => id !== courseId)
      );
    } else {
      setExpandedCourses((prevCourses) => [...prevCourses, courseId]);
    }
  };

  const handleVideoApproval = (courseId: number, lessonId: number) => {
    const lessonKey = `${courseId}-${lessonId}`;
    setApprovedLessons((prevLessons) => ({
      ...prevLessons,
      [lessonKey]: !prevLessons[lessonKey],
    }));

    const updatedCourses = courses.map((course) => {
      if (course.id === courseId) {
        const updatedLessons = course.lessons.map((lesson) => {
          if (lesson.id === lessonId) {
            return {
              ...lesson,
              approved: !lesson.approved,
            };
          }
          return lesson;
        });
        return {
          ...course,
          lessons: updatedLessons,
        };
      }
      return course;
    });

    const allVideosApproved = updatedCourses.every((course) =>
      course.lessons.every((lesson) => lesson.approved)
    );

    setExpandedCourses(
      allVideosApproved
        ? updatedCourses.map((course) => course.id)
        : expandedCourses
    );
  };

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css"
        />
      </Head>
      <div className="container mt-5">
        <h1 className="mb-3">Danh sách khóa học</h1>
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Tên khóa học</th>
              <th style={{ width: "100px" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <React.Fragment key={course.id}>
                <tr>
                  <td>
                    <button
                      className="btn btn-link text-start"
                      onClick={() => handleCourseClick(course.id)}
                      style={{ textDecoration: "none" }}
                    >
                      {course.name}
                    </button>
                  </td>
                  <td>
                    <div className="d-flex">
                      <button className="btn btn-success me-2">Duyệt</button>
                      <button className="btn btn-danger">Từ chối</button>
                    </div>
                  </td>
                </tr>
                {expandedCourses.includes(course.id) &&
                  course.lessons.map((lesson) => (
                    <tr key={lesson.id}>
                      <td colSpan={2}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <h4>{lesson.name}</h4>
                          <div
                            className="embed-responsive embed-responsive-16by9"
                            style={{
                              position: "relative",
                              width: "80%",
                              paddingBottom: "56.25%",
                            }}
                          >
                            <video
                              className="embed-responsive-item"
                              src={lesson.videoSrc}
                              controls
                              style={{
                                position: "absolute",
                                top: 50,
                                left: 100,
                                width: "80%",
                                height: "80%",
                              }}
                            ></video>
                          </div>
                          {!lesson.approved && (
                            <button
                              className="btn btn-primary mt-2"
                              onClick={() =>
                                handleVideoApproval(course.id, lesson.id)
                              }
                            >
                              {approvedLessons[`${course.id}-${lesson.id}`]
                                ? "Đã duyệt"
                                : "Duyệt video"}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
