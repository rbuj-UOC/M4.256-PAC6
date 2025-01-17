import { Component, OnInit } from '@angular/core';
import { GradesService } from '../../shared/grades.service';
import { StudentDTO } from '../../shared/student.dto';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  students: StudentDTO[] = [];

  constructor(private gradesService: GradesService) {}

  ngOnInit(): void {
    this.gradesService.getGrades().subscribe((data) => {
      this.students = data;
    });
  }

  trackById(index: number, student: StudentDTO): number {
    return student.id;
  }
}
