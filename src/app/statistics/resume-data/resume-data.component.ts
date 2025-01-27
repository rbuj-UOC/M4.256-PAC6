import { Component, OnInit } from '@angular/core';
import { GradesService } from '../../shared/grades.service';

@Component({
  selector: 'app-resume-data',
  standalone: false,
  templateUrl: './resume-data.component.html',
  styleUrl: './resume-data.component.scss'
})
export class ResumeDataComponent implements OnInit {
  count: number;
  passed: number;
  failed: number;

  constructor(private gradesService: GradesService) {}

  ngOnInit(): void {
    const start = Date.now();
    while (Date.now() - start < 3000) {}

    this.gradesService.getGrades().subscribe((students) => {
      [this.passed, this.failed] = students.reduce(
        (acc, student) => {
          if (student.grade >= 5) {
            acc[0]++;
          } else {
            acc[1]++;
          }
          return acc;
        },
        [0, 0]
      );
      this.count = students.length;
    });
  }
}
