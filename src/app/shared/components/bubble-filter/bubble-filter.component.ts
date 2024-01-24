import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Genre } from 'src/app/core/interfaces/genre.interface';

@Component({
  selector: 'app-bubble-filter',
  templateUrl: './bubble-filter.component.html',
  styleUrls: ['./bubble-filter.component.scss']
})
export class BubbleFilterComponent {
  @Input() filter!: Genre;

  @Output() event = new EventEmitter<Genre>();

  onEvent(): void {
    this.event.emit(this.filter);
  }
}
