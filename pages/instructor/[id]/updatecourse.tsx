import React, { useState } from 'react';
import Styles from '@/styles/addlesson.module.css';
import VideoUpload from '@/pages/components/instructor/uploadvideo';

const CreateCoursePage = () => {
  const [lessonsData, setLessonsData] = useState<{ questions: { question: string; answer: string }[] }[]>([]);

  const addLesson = () => {
    const lessonIndex = lessonsData.length;
    const newLessonsData = [...lessonsData, { questions: [] }];
    setLessonsData(newLessonsData);
  };

  const addQuiz = (lessonIndex: number) => {
    const newQuestions = [...lessonsData[lessonIndex].questions, { question: '', answer: '' }];
    const newLessonsData = [...lessonsData];
    newLessonsData[lessonIndex].questions = newQuestions;
    setLessonsData(newLessonsData);
  };

  const removeQuiz = (lessonIndex: number, questionIndex: number) => {
    const newQuestions = [...lessonsData[lessonIndex].questions];
    newQuestions.splice(questionIndex, 1);
    const newLessonsData = [...lessonsData];
    newLessonsData[lessonIndex].questions = newQuestions;
    setLessonsData(newLessonsData);
  };

  const removeLesson = (lessonIndex: number) => {
    const newLessonsData = lessonsData.filter((_, index) => index !== lessonIndex);
    setLessonsData(newLessonsData);
  };

  const displayLessonsData = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(lessonsData);
  };

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <h1>Tạo bài học</h1>
      </div>

      <div className={Styles.form_container}>
        <form onSubmit={displayLessonsData}>
          <div id="lessons">
            {lessonsData.map((lesson, lessonIndex) => (
              <div key={lessonIndex} className={Styles.lesson_input}>
                <label htmlFor={`lessonTitle${lessonIndex}`} className={Styles.label_add_lesson}>
                  Tiêu đề bài học:
                </label>
                <input type="text" id={`lessonTitle${lessonIndex}`} name="lessonTitle[]" required />

                <VideoUpload lessonIndex={lessonIndex} />

                <div id={`quizzes${lessonIndex}`}>
                  <button
                    type="button"
                    className={Styles.add_quiz_button}
                    onClick={() => addQuiz(lessonIndex)}
                    id={Styles.button}
                  >
                    Thêm câu hỏi
                  </button>

                  {lesson.questions.map((question, questionIndex) => (
                    <div key={questionIndex} className={Styles.quiz_input}>
                      <label htmlFor={`question${lessonIndex}_${questionIndex}`}>Câu hỏi:</label>
                      <input
                        type="text"
                        id={`question${lessonIndex}_${questionIndex}`}
                        name={`question[${lessonIndex}][]`}
                        required
                        value={question.question}
                        onChange={(e) => {
                          const newQuestions = [...lessonsData[lessonIndex].questions];
                          newQuestions[questionIndex].question = e.target.value;
                          const newLessonsData = [...lessonsData];
                          newLessonsData[lessonIndex].questions = newQuestions;
                          setLessonsData(newLessonsData);
                        }}
                      />

                      <label htmlFor={`answer${lessonIndex}_${questionIndex}`}>Câu trả lời:</label>
                      <input
                        type="text"
                        id={`answer${lessonIndex}_${questionIndex}`}
                        name={`answer[${lessonIndex}][]`}
                        required
                        value={question.answer}
                        onChange={(e) => {
                          const newQuestions = [...lessonsData[lessonIndex].questions];
                          newQuestions[questionIndex].answer = e.target.value;
                          const newLessonsData = [...lessonsData];
                          newLessonsData[lessonIndex].questions = newQuestions;
                          setLessonsData(newLessonsData);
                        }}
                      />

                      <button
                        type="button"
                        className={Styles.remove_quiz_button}
                        onClick={() => removeQuiz(lessonIndex, questionIndex)}
                        id={Styles.button}
                      >
                        Xóa câu hỏi
                      </button>
                    </div>
                  ))}
                </div>
                <hr className={Styles.line_lesson} />

                <button
                  type="button"
                  className={Styles.remove_lesson_button}
                  onClick={() => removeLesson(lessonIndex)}
                  id={Styles.button}
                >
                  Xóa bài học
                </button>
              </div>
            ))}
          </div>

          <button type="button" className={Styles.add_lesson_button} onClick={addLesson} id={Styles.button}>
            Thêm bài học
          </button>

          <br />

          <input type="submit" className={Styles.submit_button} value="Save" id={Styles.button} />
        </form>
      </div>
    </div>
  );
};

export default CreateCoursePage;
