import React from 'react';

interface User {
  id: number;
  name: string;
  role: string;
  email: string;
  age: number;
  postCode: string;
  phone: string;
  hobbies: string[];
  url: string;
  studyMinutes?: number;
  taskCode?: number;
  studyLangs?: string[];
  score?: number;
  experienceDays?: number;
  useLangs?: string[];
  availableStartCode?: number;
  availableEndCode?: number;
}

interface StudentTableProps {
  users: User[];
}

const StudentTable: React.FC<StudentTableProps> = ({ users }) => {
  // 生徒だけを抽出
  const students = users.filter(user => user.role === 'student');

  // 課題番号が、担当範囲に含まれているメンターの名前を表示
  const getMentorsForMentor = (student: User) => {
    return users.filter(mentor =>
      mentor.role === 'mentor' &&
      mentor.availableStartCode !== undefined && // availableStartCodeがundefinedでないことを確認
      mentor.availableEndCode !== undefined && // availableEndCodeがundefinedでないことを確認
      mentor.availableStartCode <= student.taskCode! &&
      mentor.availableEndCode >= student.taskCode!
    ).map(mentor => mentor.name).join(", ");
  };

  return (
    <table>
      <thead>
        <tr>
          <th>勉強時間</th>
          <th>課題番号</th>
          <th>勉強中の言語</th>
          <th>ハピネススコア</th>
          <th>対応可能なメンター</th>
        </tr>
      </thead>
      <tbody>
        {students.map(student => (
          <tr key={student.id}>
            <td>{student.studyMinutes}</td>
            <td>{student.taskCode}</td>
            <td>{student.studyLangs?.join(", ")}</td>
            <td>{student.score}</td>
            <td>{getMentorsForMentor(student)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentTable;
