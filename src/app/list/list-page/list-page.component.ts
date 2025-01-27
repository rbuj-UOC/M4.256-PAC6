import { Component, OnInit } from '@angular/core';
import { GradesService } from '../../shared/grades.service';
import { StudentDTO } from '../../shared/student.dto';

@Component({
  selector: 'app-list-page',
  standalone: false,
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss'
})
export class ListPageComponent implements OnInit {
  students: StudentDTO[] = [];

  constructor(private gradesService: GradesService) {}

  ngOnInit(): void {
    this.gradesService.getGrades().subscribe((data) => {
      this.students = data;
    });
  }
}
