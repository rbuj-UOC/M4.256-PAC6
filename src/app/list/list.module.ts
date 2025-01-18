import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { GradesService } from '../shared/grades.service';
import { ListPageComponent } from './list-page/list-page.component';
import { ListRoutingModule } from './list-routing.module';

@NgModule({
  declarations: [ListPageComponent],
  imports: [
    CommonModule,
    ListRoutingModule,
    MatCardModule,
    ScrollingModule,
    HttpClientModule
  ],
  providers: [GradesService]
})
export class ListModule {}
