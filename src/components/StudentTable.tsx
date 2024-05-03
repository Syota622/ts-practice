// StudentTable.tsx
import React, { useState } from 'react';
import { User } from '../types/userTypes';

interface StudentTableProps {
  users: User[];
}

const StudentTable: React.FC<StudentTableProps> = ({ users }) => {
    
  // 勉強時間かハピネススコアでソートする
  // studyMinutes: 勉強時間、score: ハピネススコア
  const [sortConfig, setSortConfig] = useState<{ key: 'studyMinutes' | 'score'; direction: 'ascending' | 'descending' } | null>(null);

  // 生徒だけを抽出して、ソートする
  const sortedUsers = [...users].filter(user => user.role === 'student').sort((a, b) => {
    if (!sortConfig) return 0;
    if (a[sortConfig.key]! < b[sortConfig.key]!) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key]! > b[sortConfig.key]!) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // ソートする関数
  const requestSort = (key: 'studyMinutes' | 'score') => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

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
    <div>
      <div>
        <button onClick={() => requestSort('studyMinutes')}>勉強時間(昇順・降順)</button>
        <button onClick={() => requestSort('score')}>ハピネススコア(昇順・降順)</button>
      </div>
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
          {sortedUsers.map(student => (
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
    </div>
  );
}

export default StudentTable;
