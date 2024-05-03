import React, { useState } from 'react';
import { User } from '../types'; // User 型をインポート

interface FormData {
  name: string;
  role: string; // 'student' または 'mentor'
  email: string;
  age: string; // 入力は文字列ですが、数値に変換する必要があります
  postCode: string;
  phone: string;
  hobbies: string; // 文字列ですが、配列に変換する必要があります
  url: string;
  studyMinutes: string;
  taskCode: string;
  studyLangs: string;
  score: string;
  experienceDays: string;
  useLangs: string;
  availableStartCode: string;
  availableEndCode: string;
}

interface UserFormProps {
  addUser: (user: User) => void;
}

const initialFormState: FormData = {
  name: '',
  role: '',
  email: '',
  age: '',
  postCode: '',
  phone: '',
  hobbies: '',
  url: '',
  studyMinutes: '',
  taskCode: '',
  studyLangs: '',
  score: '',
  experienceDays: '',
  useLangs: '',
  availableStartCode: '',
  availableEndCode: ''
};

const UserForm = ({ addUser }: UserFormProps) => {
  const [formData, setFormData] = useState<FormData>(initialFormState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.role) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // role の値を 'student' または 'mentor' に限定するための型チェックを行います。
    const roleValidated = formData.role === 'student' || formData.role === 'mentor' ? formData.role : 'student'; // デフォルトを 'student' とする

    const newUser: User = {
      ...formData,
      id: 0, // IDはApp.tsxで設定
      role: roleValidated, // 検証済みの role 値
      age: parseInt(formData.age, 10),
      hobbies: formData.hobbies.split(',').map(hobby => hobby.trim()),
      studyMinutes: parseInt(formData.studyMinutes, 10),
      taskCode: parseInt(formData.taskCode, 10),
      studyLangs: formData.studyLangs.split(',').map(lang => lang.trim()),
      score: parseInt(formData.score, 10),
      experienceDays: parseInt(formData.experienceDays, 10),
      useLangs: formData.useLangs.split(',').map(lang => lang.trim()),
      availableStartCode: parseInt(formData.availableStartCode, 10),
      availableEndCode: parseInt(formData.availableEndCode, 10)
    };
    addUser(newUser);
    setFormData(initialFormState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>名前:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div>
        <label>役割 (student or mentor):</label>
        <input type="text" name="role" value={formData.role} onChange={handleChange} />
      </div>
      <div>
        <label>メール:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div>
        <label>年齢:</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} />
      </div>
      <div>
        <label>郵便番号:</label>
        <input type="text" name="postCode" value={formData.postCode} onChange={handleChange} />
      </div>
      <div>
        <label>電話番号:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
      </div>
      <div>
        <label>趣味:</label>
        <input type="text" name="hobbies" value={formData.hobbies} onChange={handleChange} />
      </div>
      <div>
        <label>ウェブサイトURL:</label>
        <input type="url" name="url" value={formData.url} onChange={handleChange} />
      </div>
      <div>
        <label>勉強時間 (分):</label>
        <input type="number" name="studyMinutes" value={formData.studyMinutes} onChange={handleChange} />
      </div>
      <div>
        <label>課題コード:</label>
        <input type="number" name="taskCode" value={formData.taskCode} onChange={handleChange} />
      </div>
      <div>
        <label>勉強中の言語:</label>
        <input type="text" name="studyLangs" value={formData.studyLangs} onChange={handleChange} />
      </div>
      <div>
        <label>ハピネススコア:</label>
        <input type="number" name="score" value={formData.score} onChange={handleChange} />
      </div>
      <div>
        <label>実務経験月数:</label>
        <input type="number" name="experienceDays" value={formData.experienceDays} onChange={handleChange} />
      </div>
      <div>
        <label>使用言語:</label>
        <input type="text" name="useLangs" value={formData.useLangs} onChange={handleChange} />
      </div>
      <div>
        <label>対応開始課題コード:</label>
        <input type="number" name="availableStartCode" value={formData.availableStartCode} onChange={handleChange} />
      </div>
      <div>
        <label>対応終了課題コード:</label>
        <input type="number" name="availableEndCode" value={formData.availableEndCode} onChange={handleChange} />
      </div>
      <button type="submit">ユーザー追加</button>
    </form>
  );
};

export default UserForm;