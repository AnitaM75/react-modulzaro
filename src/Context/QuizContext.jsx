import { createContext, useEffect, useState } from "react";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchQuestions = async () => {
    const response = await fetch("http://localhost:3000/questions");
    const data = await response.json();
    setQuestions(randomArray(data));
  };
  
  useEffect(() => {
    fetchQuestions();
  }, []);

  const randomArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };
  
  const handleAnswer = (questionId, selectedOption) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(question => {
        if (question.id === questionId) {
          const isCorrect = question.correctAnswer === selectedOption; 
          if (isCorrect) {
            setScore(prevScore => prevScore + 1); 
          }
          return { ...question, selectedOption, isCorrect };
        }
        return question;
      })
    );
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setIsQuizFinished(false);
    setQuestions([]); 
    fetchQuestions();
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        currentQuestionIndex,
        score,
        isQuizFinished,
        isModalOpen,
        setIsModalOpen,
        handleAnswer,
        nextQuestion, 
        restartQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

