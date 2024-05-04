import React from 'react';
import { User } from '../types/userTypes';

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Role</th>
          <th>Email</th>
          <th>Age</th>
          <th>Post Code</th>
          <th>Phone</th>
          <th>Hobbies</th>
          <th>URL</th>
          <th>Study Minutes</th>
          <th>Task Code</th>
          <th>Study Languages</th>
          <th>Score</th>
          <th>Experience Days</th>
          <th>Used Languages</th>
          <th>Available Start Code</th>
          <th>Available End Code</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.role}</td>
            <td>{user.email}</td>
            <td>{user.age}</td>
            <td>{user.postCode}</td>
            <td>{user.phone}</td>
            <td>{user.hobbies.join(", ")}</td>
            <td><a href={user.url} target="_blank" rel="noopener noreferrer">Website</a></td>
            <td>{user.studyMinutes}</td>
            <td>{user.taskCode}</td>
            <td>{user.studyLangs?.join(", ")}</td>
            <td>{user.score}</td>
            <td>{user.experienceDays}</td>
            <td>{user.useLangs?.join(", ")}</td>
            <td>{user.availableStartCode}</td>
            <td>{user.availableEndCode}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
