import { Component, OnDestroy, ChangeDetectorRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'simple-crm';
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  
  constructor() {
    const changeDetectorRef = inject(ChangeDetectorRef);
    const media = inject(MediaMatcher);

    this.mobileQuery = media.matchMedia('(max-width: 768px)'); 
    //creates a MediaQueryList object that checks if the screen width is 600px or less. 
    //The matches property of this object indicates whether the condition is currently met.

    this._mobileQueryListener = () => changeDetectorRef.detectChanges(); 
    //defination  of _mobileQueryListener - tells angular to refresh view
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
    //adds mobileQuery listener  - this._mobileQueryListener is executed when mobileQuery changes -> changeDetectorRef.detectChanges()
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
