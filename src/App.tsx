import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import StudentDetails from "./components/StudentDetails";
import StudentsTests from "./components/StudentTests";
import Tags from "./components/Tags";
import TagInput from "./components/TagInput";
import Accordian from "./components/Accordian";

export interface Student {
  city?: string;
  company?: string;
  email?: string;
  firstName: string;
  grades: string[];
  id: string;
  lastName: string;
  pic: string;
  skill?: string;
}

export interface Title {
  id: string;
  title: string;
}

export interface TagTitle {
  studentId: string;
  title: string;
}

const App: React.FC = () => {
  const [searchName, setSearchName] = useState<string>("");
  const [searchTag, setSearchTag] = useState<string>("");
  const [tagTitle, setTagTitle] = useState<Title>({ id: "", title: "" });
  const [students, setStudents] = useState<Student[]>([]);
  const [isActive, setIsActive] = useState<string[]>([]);
  const [tags, setTags] = useState<TagTitle[]>([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        "https://api.hatchways.io/assessment/students"
      );
      const data = res.data.students;
      setStudents(data);
    };
    getData();
  }, []);

  const average = (arr: string[]): number => {
    return (
      arr.reduce((acc, cv) => {
        return acc + Number(cv);
      }, 0) / arr.length
    );
  };

  return (
    <div>
      <div id="main">
        {students.length > 0 ? (
          <div className="all-students">
            <SearchBar
              setSearchName={setSearchName}
              setSearchTag={setSearchTag}
            />
            {students
              .filter((student) => {
                const name =
                  `${student.firstName} ${student.lastName}`.toLowerCase();
                let combinedTagNames = "";
                tags.forEach((tagObj) => {
                  if (tagObj.studentId === student.id) {
                    combinedTagNames += tagObj.title + " ";
                  }
                });
                const nameSearch = name.includes(searchName.toLowerCase());
                const tagSearch = combinedTagNames
                  .toLowerCase()
                  .includes(searchTag.toLowerCase());

                if (searchName.length && searchTag.length) {
                  if (nameSearch && tagSearch) return true;
                } else if (searchName.length && !searchTag.length) {
                  if (nameSearch) return true;
                } else if (!searchName.length && searchTag.length) {
                  if (tagSearch) return true;
                } else return true;
                return false;
              })
              .map((student) => (
                <div key={student.id}>
                  <div className="single-student">
                    <img
                      src={student.pic}
                      alt={student.firstName}
                      className="image"
                    />
                    <div className="student-description">
                      <StudentDetails average={average} student={student} />

                      <StudentsTests student={student} isActive={isActive} />

                      <Tags tags={tags} student={student} />

                      <TagInput
                        student={student}
                        tagTitle={tagTitle}
                        tags={tags}
                        setTagTitle={setTagTitle}
                        setTags={setTags}
                      />
                    </div>

                    <Accordian
                      student={student}
                      setIsActive={setIsActive}
                      isActive={isActive}
                    />
                  </div>
                  <hr />
                </div>
              ))}
          </div>
        ) : (
          <div>There are no students in the database.</div>
        )}
      </div>
    </div>
  );
};

export default App;
