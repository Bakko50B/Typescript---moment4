import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MiunService {


  url = 'https://webbutveckling.miun.se/files/ramschema.json';

  constructor(private http: HttpClient ) { }

  async getCourses(): Promise<Course[]> { 
    const Courses = this.http.get<Course[]>(this.url);
    return await firstValueFrom(Courses); 
  }
}
