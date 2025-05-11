/**
 * Mall (Interface) för datastrukteren  
 * */ 
export interface Course {
  code: string;
  coursename: string;
  progression: 'A' | 'B' | 'C';
  syllabus: string;
}
