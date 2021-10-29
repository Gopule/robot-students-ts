import React from "react";
import { Student } from "../App";

interface Props {
  average: (grades: string[]) => number | void;
  student: Student;
}

const StudentDetails: React.FC<Props> = ({ average, student }: Props) => {
  return (
    <div>
      <h2 className="student-name">
        {student.firstName} {student.lastName}
      </h2>
      <p>Email: {student.email}</p>
      <p>Company: {student.company}</p>
      <p>Skill: {student.skill}</p>
      <p>Average: {average(student.grades)}%</p>
    </div>
  );
};

export default StudentDetails;
