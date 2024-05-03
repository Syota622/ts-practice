export interface User {
  id: number;
  name: string;
  role: 'student' | 'mentor';
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