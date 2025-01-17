import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { Observable, catchError, map, of } from 'rxjs';
import { StudentDTO } from './student.dto';

@Injectable({
  providedIn: 'root'
})
export class GradesService {
  private csvUrl = 'assets/notas_alumnos-1.csv';
  constructor(
    private papa: Papa,
    private http: HttpClient
  ) {}

  getGrades(): Observable<StudentDTO[]> {
    return this.http.get(this.csvUrl, { responseType: 'text' }).pipe(
      map((data) => {
        const parsedData = this.papa.parse(data, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            console.log('Parsed: ', result);
          }
        });

        const grades: StudentDTO[] = parsedData.data.map((item: any) => ({
          id: item.ID_Alumno,
          name: item.Nombre,
          surnames: item.Apellidos,
          gender: item.Sexo,
          grade: item.Nota_Final,
          absences: item.Faltas_Asistencia
        }));

        return grades;
      }),
      catchError((error) => {
        console.error('Error loading CSV file:', error);
        return of([]);
      })
    );
  }
}
