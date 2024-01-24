import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() itemsPerPage = 20;
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  
  @Output() pageChanged = new EventEmitter<number>();

  buttonStartIndex = 1;
  buttonsToShow = 5;

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.pageChanged.emit(page);
  }

  onPrevious(): void {
    if (this.buttonStartIndex > 1) {
      this.buttonStartIndex -= this.buttonsToShow;
      this.currentPage = this.buttonStartIndex;
    }
  }

  onNext(): void {
    const totalPages = Math.ceil(this.totalPages / this.itemsPerPage);
    const lastButtonStartIndex = Math.max(1, totalPages - this.buttonsToShow + 1);

    if (this.buttonStartIndex < lastButtonStartIndex) {
      this.buttonStartIndex += this.buttonsToShow;
      this.currentPage = this.buttonStartIndex;
    }
  }

  onGeneratePages(): number[] {
    if (this.totalPages) {
      const totalPages = Math.ceil(this.totalPages / this.itemsPerPage);
      const buttonEndIndex = Math.min(this.buttonStartIndex + this.buttonsToShow - 1, totalPages);

      return new Array(buttonEndIndex - this.buttonStartIndex + 1).fill(0).map((_, index) => this.buttonStartIndex + index);
    }

    return [];
  }
}
