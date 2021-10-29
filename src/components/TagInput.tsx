import React from "react";
import { Student, Title, TagTitle } from "../App";

interface Props {
  setTagTitle: (title: Title) => Title | void;
  setTags: (arrOfTags: TagTitle[]) => TagTitle[] | void;
  tags: TagTitle[];
  student: Student;
  tagTitle: Title;
}

const TagInput: React.FC<Props> = ({
  tagTitle,
  setTagTitle,
  setTags,
  tags,
  student,
}: Props) => {
  return (
    <input
      type="text"
      name="tagTitle"
      autoComplete="off"
      placeholder="Add a tag"
      className="add-tag"
      value={tagTitle.id === student.id ? tagTitle.title : ""}
      onChange={(event) => {
        const studentTitle = { ...tagTitle };
        studentTitle.id = student.id;
        studentTitle.title = event.target.value;
        setTagTitle(studentTitle);
      }}
      onKeyDown={(evt) => {
        if (evt.key === "Enter") {
          setTags([
            ...tags,
            {
              studentId: tagTitle.id,
              title: tagTitle.title,
            },
          ]);
          setTagTitle({ id: "", title: "" });
        }
      }}
    />
  );
};

export default TagInput;
