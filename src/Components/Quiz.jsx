import { useContext } from "react";
import { QuizContext } from "../Context/QuizContext.jsx";
import Modal from "./Modal.jsx";
import ProgressBar from "./ProgressBar.jsx";
import Question from "./Question";

const Quiz = () => {
  const {
    questions,
    currentQuestionIndex,
    score,
    isQuizFinished,
    isModalOpen,
    setIsModalOpen,
    nextQuestion,
    restartQuiz,
  } = useContext(QuizContext);

  const handleNext = () => {
    if (!questions[currentQuestionIndex].selectedOption) {
      alert("Select one answer");
      return;
    }
    nextQuestion();
  };
  const finalScorePercentage = (score / questions.length / 2) * 100;

  let messageStyle = "";
  let resultMessage = "";
  let buttonStyle = "";

  if (finalScorePercentage <= 40) {
    messageStyle = "bg-danger text-white p-2 rounded message-box";
    resultMessage = "You can do better!";
    buttonStyle = "btn-outline-danger";
  } else if (finalScorePercentage <= 70) {
    messageStyle = "bg-warning text-white p-2 rounded message-box";
    resultMessage = "Not bad!";
    buttonStyle = "btn-outline-warning";
  } else {
    messageStyle = "bg-success text-white p-2 rounded message-box";
    resultMessage = "Congratulations!";
    buttonStyle = "btn-outline-success";
  }

  return (
    <div
      className="quiz-container border-5 rounded border border-primary p-5 "
      style={{ backgroundColor: "#ffa07a" }}
    >
      <h1 className="text-center mb-4">Quiz Application</h1>
      {isQuizFinished ? (
        <div className="result text-center mb-4">
          <h2>Quiz Completed</h2>
          <div className="result-box d-flex flex-column align-items-center">
            <div className={`p-2 rounded shadow-sm mb-4 ${messageStyle}`}>
              <p className="mb-0 fs-5">{resultMessage}</p>
            </div>
            <h3>Your Final Score: {finalScorePercentage.toFixed(2)}%</h3>
            <button onClick={restartQuiz} className={`btn ${buttonStyle} mt-3 mb-4`}>
              Restart Quiz
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-3">
            <h5 className="mb-3">
              Question Category:{" "}
              {questions[currentQuestionIndex]?.category || "N/A"}
            </h5>
            <ProgressBar
              totalQuestions={questions.length}
              currentQuestionIndex={currentQuestionIndex}
            />
          </div>

          {questions.length > 0 && (
            <Question question={questions[currentQuestionIndex]} />
          )}

          <div className="d-flex justify-content-around mt-4">
            <button
              className="btn btn-success"
              onClick={() => setIsModalOpen(true)}
            >
              Add New Question
            </button>
            <button className="btn btn-primary" onClick={handleNext}>
              Next Question
            </button>
          </div>
        </>
      )}
      {isModalOpen && <Modal closeModal={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Quiz;
