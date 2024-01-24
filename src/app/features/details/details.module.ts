import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { MovieDetailsRoutingModule } from './movie-details-routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    MovieDetailsComponent
  ],
  imports: [
    CommonModule,
    MovieDetailsRoutingModule,
    FontAwesomeModule,
    SharedModule
  ]
})
export class DetailsModule { }
