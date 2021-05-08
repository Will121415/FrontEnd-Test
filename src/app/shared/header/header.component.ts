import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/core/auth/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public user$: Observable<any> = this.authService.currentUser;
  public openMenu = false;
  total$: Observable<number>;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {

  }


  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


  ngOnInit(): void {
  }

}
