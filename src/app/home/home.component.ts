  // import { Component, signal } from '@angular/core';
  // import { Course } from '../models/course';
  // import { MiunService } from '../services/miun.service';
  // import { CommonModule } from '@angular/common'; 


  // @Component({
  //   selector: 'app-home',
  //   imports: [CommonModule],
  //   templateUrl: './home.component.html',
  //   styleUrl: './home.component.scss'
  // })
  // export class HomeComponent {  
  //   courses = signal<Course[]>([]);
  //   error = signal<string | null>(null);

  //   constructor(private miunservice: MiunService) {}

  //   ngOnInit() {
  //     this.loadCourses();
  //     console.log('Courses:', this.courses());
  //   }

  //   async loadCourses() {
  //     try {
  //       const response = await this.miunservice.getCourses();
  //       console.table(response);
  //       this.courses.set(response);
  //       console.table(this.courses());
  //       this.error.set(null);
  //     } catch (error) {
  //       this.error.set('Error loading courses: ' + error);
  //     }
  // }
  // }
  import { Component, signal, computed } from '@angular/core';
  import { Course } from '../models/course';
  import { MiunService } from '../services/miun.service';
  import { CommonModule } from '@angular/common';
  
  @Component({
    selector: 'app-home',
    imports: [CommonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
  })
  export class HomeComponent {
    courses = signal<Course[]>([]);
    sortKey = signal<keyof Course | null>(null);
    sortAscending = signal<boolean>(true);
    error = signal<string | null>(null);
  
    constructor(private miunService: MiunService) {}
  
    ngOnInit() {
      this.loadCourses();
    }
  
    async loadCourses() {
      try {
        const response = await this.miunService.getCourses();
        this.courses.set(response);
        console.table(response);  
      } catch (error) {
        console.error('Error loading courses:', error);
        this.error.set('Failed to load courses. Please try again later.');
      }
    }
  
    // Filtrering och sortering med `computed()`
    sortedCourses = computed(() => {
      return [...this.courses()].sort((a, b) => {
        const key = this.sortKey();
        if (!key) return 0;
  
        const fieldA = a[key].toString();
        const fieldB = b[key].toString();
  
        return this.sortAscending() ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
      });
    });
  
    // Funktion för att ändra sortering
    sortBy(key: keyof Course) {
      if (this.sortKey() === key) {
        this.sortAscending.set(!this.sortAscending());
      } else {
        this.sortKey.set(key);
        this.sortAscending.set(true);
      }
    }
  }
  