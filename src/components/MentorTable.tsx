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

interface MentorTableProps {
  users: User[];
}

const MentorTable: React.FC<MentorTableProps> = ({ users }) => {
  // メンターだけを抽出
  const mentors = users.filter(user => user.role === 'mentor');

  // 課担当範囲に含んでいる生徒の名前を表示
  const getStudentsForMentor = (mentor: User) => {
    return users.filter(student =>
      student.role === 'student' &&
      student.taskCode !== undefined &&
      mentor.availableStartCode! <= student.taskCode &&
      mentor.availableEndCode! >= student.taskCode
    ).map(student => student.name).join(", ");
  };

  return (
    <table>
      <thead>
        <tr>
          <th>実務経験月数</th>
          <th>現場で使っている言語</th>
          <th>担当できる課題番号初め</th>
          <th>担当できる課題番号終わり</th>
          <th>対応可能な生徒</th>
        </tr>
      </thead>
      <tbody>
        {mentors.map(mentor => (
          <tr key={mentor.id}>
            <td>{mentor.experienceDays}</td>
            <td>{mentor.useLangs?.join(", ")}</td>
            <td>{mentor.availableStartCode}</td>
            <td>{mentor.availableEndCode}</td>
            <td>{getStudentsForMentor(mentor)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MentorTable;
