export interface User {
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

export interface FormData {
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