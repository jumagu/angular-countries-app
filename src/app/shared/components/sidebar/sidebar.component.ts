import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  public isSmallScreen: boolean = false;

  constructor() {
    this.onResize();
  }

  @HostListener('window:resize', ['$event']) onResize(): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    this.isSmallScreen = window.innerWidth < 768;
  }
}
