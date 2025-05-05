import { Component, signal } from '@angular/core';
import { Course } from '../models/course';
import { MiunService } from '../services/miun.service';


@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  courses = signal<Course[]>([]);
  error = signal<string | null>(null);

  constructor(private miunservice: MiunService) {}

  ngOnInit() {
    this.loadCourses();
    console.log('Courses:', this.courses());
  }

  async loadCourses() {
    try {
      const response = await this.miunservice.getCourses();
      console.table(response);
      this.courses.set(response);
      console.table(this.courses());
      this.error.set(null);
    } catch (error) {
      this.error.set('Error loading courses: ' + error);
    }
}
}
