import {MediaMatcher} from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../_config/auth/auth.service';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';




@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {

  private mobileQuery: MediaQueryList;
  private subscription: Subscription;
  public rol$: any;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, 
              media: MediaMatcher, 
              private auth: AuthService,
              private router: Router
              
              ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
      this.subscription = this.auth.getRol().subscribe(rol => { 
        this.rol$ = rol;
    });
    this.auth.initRol(); 

  }

  public goHome(){         
      this.router.navigate(['/inicio']);
   
  }
//[/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/]
  shouldRun = [/(^|\.)localhost\.:4200$/] .some(h => h.test(window.location.host));
}
  


