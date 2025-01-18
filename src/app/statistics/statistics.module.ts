import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { GradesService } from '../shared/grades.service';
import { GenderComponent } from './gender/gender.component';
import { GeneralResultsComponent } from './general-results/general-results.component';
import { ResumeDataComponent } from './resume-data/resume-data.component';
import { StatisticsPageComponent } from './statistics-page/statistics-page.component';
import { StatisticsRoutingModule } from './statistics-routing.module';

@NgModule({
  declarations: [
    StatisticsPageComponent,
    ResumeDataComponent,
    GenderComponent,
    GeneralResultsComponent
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [GradesService]
})
export class StatisticsModule {}
