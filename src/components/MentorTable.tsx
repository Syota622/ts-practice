// MentorTable.tsx
import React, { useState } from 'react';

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
  
  // 実務経験でソートする
  // experienceDays: 実務経験
  const [sortConfig, setSortConfig] = useState<{ key: 'experienceDays'; direction: 'ascending' | 'descending' } | null>(null);

  // メンターだけを抽出して、ソートする
  const sortedMentors = [...users].filter(user => user.role === 'mentor').sort((a, b) => {
    if (!sortConfig) return 0;
    const aValue = a[sortConfig.key] ?? 0; // Nullish coalescing operator for handling undefined
    const bValue = b[sortConfig.key] ?? 0; // Nullish coalescing operator for handling undefined
    if (aValue < bValue) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // ソートする関数
  const requestSort = (key: 'experienceDays') => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

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
    <div>
      <div>
        <button onClick={() => requestSort('experienceDays')}>実務経験(昇順・降順)</button>
      </div>
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
          {sortedMentors.map(mentor => (
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
    </div>
  );
}

export default MentorTable;
