import { AfterViewInit, Component, Inject, Input, TemplateRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CarouselContext } from 'src/app/core/interfaces/carousel-context.interface';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterViewInit {
  @Input() template!: TemplateRef<HTMLElement | CarouselContext>;
  @Input() data!: Array<any>;
  @Input() id!: string;
  @Input() displayArrowRight = true;
  
  indexTheme = 0;
  displayArrowLeft = false;
  carouselElement!: HTMLElement | null;

  constructor(@Inject(DOCUMENT) private document: Document, readonly library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  ngAfterViewInit(): void {  
    this.onGetElementCarousel();
    this.onSetInitialScrollPositon();
  }

  onSetInitialScrollPositon(): void {
    if (this.carouselElement) {
      this.carouselElement.scrollBy({ left: this.indexTheme * 150, behavior: 'smooth' });
      this.carouselElement.addEventListener('scroll', this.handleScrollRight);
    }
}

  onGetElementCarousel(): void {
    this.carouselElement = this.document.getElementById(this.id);
  }

  onRight(): void {
    if (this.carouselElement) {
      this.carouselElement.scrollBy({ left: 150, behavior: 'smooth' });
      this.carouselElement.addEventListener('scroll', this.handleScrollRight);
    }
  }

  onLeft(): void {
    if (this.carouselElement) {
      this.carouselElement.scrollBy({ left: -150, behavior: 'smooth' });
      this.carouselElement.addEventListener('scroll', this.handleScrollLeft);
    }
  }

  handleScrollRight = (): void => {
    if (this.carouselElement) {
      const displayArrow = this.carouselElement.scrollLeft > 0;
      this.displayArrowLeft = displayArrow;
      if (this.carouselElement.scrollLeft + this.carouselElement.clientWidth >= this.carouselElement.scrollWidth) {
        this.displayArrowRight = false;
        this.carouselElement.removeEventListener('scroll', this.handleScrollRight);
      }
    }
  }
  
  handleScrollLeft = (): void => {
    if (this.carouselElement) {
      this.displayArrowRight = true;
      if (this.carouselElement.scrollLeft <= 0) {
        this.displayArrowLeft = false;
        this.carouselElement.removeEventListener('scroll', this.handleScrollLeft);
      }
    }
  }
}