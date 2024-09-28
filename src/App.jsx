import { QuizProvider } from "./Context/QuizContext.jsx";
import Quiz from "./Components/Quiz.jsx";

const App = () => {
  return (
    <QuizProvider>
      <Quiz />
    </QuizProvider>
  );
};

export default App;
