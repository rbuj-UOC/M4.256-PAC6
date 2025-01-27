import { Component, OnInit } from '@angular/core';
import Chart, { ChartType } from 'chart.js/auto';
import { GradesService } from '../../shared/grades.service';

@Component({
  selector: 'app-gender',
  standalone: false,
  templateUrl: './gender.component.html',
  styleUrl: './gender.component.scss'
})
export class GenderComponent implements OnInit {
  chart: Chart;

  constructor(private gradesService: GradesService) {}

  ngOnInit(): void {
    const start = Date.now();
    while (Date.now() - start < 3000) {}

    this.gradesService.getGrades().subscribe((students) => {
      const gradesData: number[] = students.reduce(
        (acc, student) => {
          if (student.gender === 'M') {
            acc[0]++;
          } else {
            acc[1]++;
          }
          return acc;
        },
        [0, 0]
      );
      const data = {
        labels: ['Male', 'Female'],
        datasets: [
          {
            label: 'Student Gender',
            data: gradesData,
            backgroundColor: ['rgb(63, 81, 181)', 'rgb(255, 99, 132)'],
            hoverOffset: 4
          }
        ]
      };
      this.chart = new Chart('gender', {
        type: 'pie' as ChartType,
        data,
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Student Gender'
            }
          }
        }
      });
    });
  }
}
