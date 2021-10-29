import React from "react";
import { Student } from "../App";

interface Props {
  isActive: string[];
  student: Student;
}

const StudentsTests: React.FC<Props> = ({ isActive, student }: Props) => {
  return (
    <div
      className="all-test"
      style={{
        display: isActive.includes(student.id) ? "block" : "none",
      }}
    >
      {student.grades.map((grade, idx) => (
        <div key={idx} className="single-grade">
          <p>Test {idx + 1}:</p>
          <p>{grade}%</p>
        </div>
      ))}
    </div>
  );
};

export default StudentsTests;
