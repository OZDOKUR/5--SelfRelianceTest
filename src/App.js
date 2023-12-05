import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import questions from "./question.json";

function App() {
  const [showFinalResult, setFinalResult] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const optionClicked = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinalResult(true);
    }
  };

  const restartTest = () => {
    setScore(0);
    setCurrentQuestion(0);
    setFinalResult(false);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Özgüven Testi</h1>

        {showFinalResult ? (
          <div className="result">
            <h1>
              Sonuç {score} / {questions.length}{" "}
            </h1>
            <h2>({Math.round((score / questions.length) * 100)}%)</h2>
            <h3>özgüvenlisiniz</h3>
            <button onClick={() => restartTest()} className="btn btn-primary">
              Testi Yeniden Başlat
            </button>
          </div>
        ) : (
          <div className="question-card">
            <h2>
              Soru {currentQuestion + 1} / {questions.length}
            </h2>
            <h3>{questions[currentQuestion].text}</h3>
            <div className="options row">
              {questions[currentQuestion].options.map((option, index) => (
                <div key={option.id} className="col-md-4 mb-3">
                  <button
                    onClick={() => optionClicked(option.isCorrect)}
                    className={`btn ${
                      index === 0
                        ? "btn-outline-danger"
                        : index === 1
                        ? "btn-outline-info"
                        : "btn-outline-primary"
                    }`}
                    style={{ width: "100%" }}
                  >
                    {option.text}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
