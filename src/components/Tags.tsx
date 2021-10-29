import React from "react";
import { Student, TagTitle } from "../App";

interface Props {
  tags: TagTitle[];
  student: Student;
}

const Tags: React.FC<Props> = ({ tags, student }: Props) => {
  return (
    <div className="student-tags">
      {tags.map((tagObj, idx) =>
        tagObj.studentId === student.id ? (
          <span key={idx} className="tags">
            {tagObj.title}
          </span>
        ) : (
          <div key={idx} />
        )
      )}
    </div>
  );
};

export default Tags;
