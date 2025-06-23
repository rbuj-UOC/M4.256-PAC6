import { Component, OnInit, inject } from '@angular/core';
import Chart, { ChartType } from 'chart.js/auto';
import { GradesService } from '../../shared/grades.service';

@Component({
  selector: 'app-general-results',
  standalone: false,
  templateUrl: './general-results.component.html',
  styleUrl: './general-results.component.scss'
})
export class GeneralResultsComponent implements OnInit {
  private gradesService = inject(GradesService);

  chart: Chart;

  ngOnInit(): void {
    const start = Date.now();
    while (Date.now() - start < 3000) {}

    this.gradesService.getGrades().subscribe((students) => {
      const gradesData: number[] = students.reduce(
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
      const data = {
        labels: ['Passed', 'Failed'],
        datasets: [
          {
            label: 'Student Grades',
            data: gradesData,
            backgroundColor: ['rgb(63, 81, 181)', 'rgb(255, 99, 132)'],
            hoverOffset: 4
          }
        ]
      };
      this.chart = new Chart('general-results', {
        type: 'pie' as ChartType,
        data,
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Student Grades'
            }
          }
        }
      });
    });
  }
}
