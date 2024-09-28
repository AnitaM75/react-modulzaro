import { useContext } from "react";
import { QuizContext } from "../Context/QuizContext";

const Question = ({ question }) => {
  const { handleAnswer } = useContext(QuizContext);

  const handleOptionClick = (option) => {
    handleAnswer(question.id, option);
  };

  return (
    <div className="question-container text-center">
      <h2>{question.question}</h2>
      <div className="d-flex justify-content-center ">
        <div className="btn-group-vertical w-75" role="group" style={{ maxWidth: '80%' }}>
          {question.options.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(answer)}
              className={`btn btn-outline-light rounded w-100 mb-4 ${question.selectedOption === answer ? 'active' : ''}`}
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question;




