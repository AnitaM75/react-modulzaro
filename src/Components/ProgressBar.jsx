const ProgressBar = ({ totalQuestions, currentQuestionIndex }) => {
  const progress = ((currentQuestionIndex ) / totalQuestions) * 100;

  return (
    <div className="mb-3">
      <div className="progress">
        <div
          className="progress-bar bg-primary"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {Math.round(progress)}%
        </div>
      </div>
      <p className="mt-2">
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </p>
    </div>
  );
};

export default ProgressBar;
