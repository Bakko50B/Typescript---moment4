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
    searchQuery = signal<string>('');             // Sökfält
    sortKey = signal<keyof Course | null>(null);  // Sorteringsfält
    sortAscending = signal<boolean>(true);        // Sorteringsordning
    error = signal<string | null>(null);
  
    constructor(private miunService: MiunService) {}
  
    ngOnInit() {
      this.loadCourses();
    }
  
    async loadCourses() {
      try {
        const response = await this.miunService.getCourses();
        this.courses.set(response);
      } catch (error) {
        console.error('Error loading courses:', error);
        this.error.set('Failed to load courses. Please try again later.');
      }
    }
  
    // Filtrering + Sortering i EN `computed()` Signal
    filteredSortedCourses = computed(() => {
      const query = this.searchQuery().toLowerCase();
  
      // Filtrera
      const filtered = this.courses().filter(course =>
        course.code.toLowerCase().includes(query) ||
        course.coursename.toLowerCase().includes(query) 
      );
  
      // Sortera 
      const key = this.sortKey();
      if (!key) return filtered; // Om ingen sortering är aktiv, returnera filtrerad lista
  
      return filtered.sort((a, b) => {
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
  
    // Event-handler för sökfiltret 
    onSearchInput(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      if (inputElement) {
        this.searchQuery.set(inputElement.value);
      }
    }
  }
  
