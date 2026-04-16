import { useState } from "react";
import "./App.css";

function Header() {
  return (
    <header className="header">
      <h1>Student Scoreboard</h1>
      <p>Manage student marks easily</p>
    </header>
  );
}

function StudentRow({ student, onScoreChange }) {
  const status = student.score >= 40 ? "Pass" : "Fail";

  return (
    <tr>
      <td>{student.name}</td>
      <td>
        <input
          type="number"
          value={student.score}
          onChange={(e) => onScoreChange(student.id, e.target.value)}
          className="score-input"
        />
      </td>
      <td className={status === "Pass" ? "pass" : "fail"}>{status}</td>
    </tr>
  );
}

function StudentTable({ students, onScoreChange }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Score</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <StudentRow
              key={student.id}
              student={student}
              onScoreChange={onScoreChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AddStudentForm({ onAddStudent }) {
  const [name, setName] = useState("");
  const [score, setScore] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "" || score === "") {
      alert("Please enter student name and score");
      return;
    }

    onAddStudent(name, score);
    setName("");
    setScore("");
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h2>Add New Student</h2>

      <input
        type="text"
        placeholder="Enter student name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter score"
        value={score}
        onChange={(e) => setScore(e.target.value)}
      />

      <button type="submit">Add Student</button>
    </form>
  );
}

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Ayush", score: 78 },
    { id: 2, name: "Rahul", score: 35 },
    { id: 3, name: "Priya", score: 56 },
  ]);

  const handleScoreChange = (id, newScore) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id
          ? { ...student, score: Number(newScore) }
          : student
      )
    );
  };

  const handleAddStudent = (name, score) => {
    const newStudent = {
      id: Date.now(),
      name: name,
      score: Number(score),
    };

    setStudents((prevStudents) => [...prevStudents, newStudent]);
  };

  return (
    <div className="app">
      <Header />
      <AddStudentForm onAddStudent={handleAddStudent} />
      <StudentTable students={students} onScoreChange={handleScoreChange} />
    </div>
  );
}

export default App;