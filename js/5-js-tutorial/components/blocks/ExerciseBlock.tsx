"use client";

import { useState } from "react";

interface Props {
    question: string;
    options: string[];
    answer: number;
}

export default function ExerciseBlock({ question, options, answer }: Props) {
    const [selected, setSelected] = useState<number | null>(null);
    const [feedback, setFeedback] = useState<{ text: string; correct: boolean } | null>(null);

    const handleSubmit = () => {
        if (selected === null) return;
        if (selected === answer) {
            setFeedback({ text: "Correct!", correct: true });
        } else {
            setFeedback({ text: "Wrong, try again!", correct: false });
        }
    };

    return (
        <div className="exercise-box">
            <div className="exercise-title">Exercise:</div>
            <div className="exercise-question">{question}</div>
            <div className="exercise-options">
                {options.map((opt, i) => (
                    <label key={i} className="exercise-option">
                        <input
                            type="radio"
                            name={`ex-${question.slice(0, 10)}`}
                            value={i}
                            checked={selected === i}
                            onChange={() => setSelected(i)}
                        />
                        <span>{opt}</span>
                    </label>
                ))}
            </div>
            <button className="exercise-submit" onClick={handleSubmit}>Submit Answer</button>
            {feedback && (
                <div className={`exercise-feedback ${feedback.correct ? "correct" : "wrong"}`}>
                    {feedback.text}
                </div>
            )}
        </div>
    );
}
