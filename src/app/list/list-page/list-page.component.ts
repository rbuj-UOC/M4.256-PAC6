import { Component, OnInit, inject } from '@angular/core';
import { GradesService } from '../../shared/grades.service';
import { StudentDTO } from '../../shared/student.dto';

@Component({
  selector: 'app-list-page',
  standalone: false,
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss'
})
export class ListPageComponent implements OnInit {
  private gradesService = inject(GradesService);

  students: StudentDTO[] = [];

  ngOnInit(): void {
    this.gradesService.getGrades().subscribe((data) => {
      this.students = data;
    });
  }
}
