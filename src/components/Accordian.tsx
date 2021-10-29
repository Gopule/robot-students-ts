import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Student } from "../App";

interface Props {
  isActive: string[];
  setIsActive: (filteredActiveArray: string[]) => string[] | void;
  student: Student;
}

const Accordian: React.FC<Props> = ({
  isActive,
  setIsActive,
  student,
}: Props) => {
  return (
    <div className="drop-icon-container">
      {!isActive.includes(student.id) ? (
        <FaPlus
          className="drop-icon"
          onClick={() => {
            setIsActive([...isActive, student.id]);
          }}
        />
      ) : (
        <FaMinus
          className="drop-icon"
          onClick={() => {
            const filteredIsActive = (arr: string[]) => {
              return arr.filter((id) => id !== student.id);
            };
            setIsActive([...filteredIsActive(isActive)]);
          }}
        />
      )}
    </div>
  );
};

export default Accordian;
