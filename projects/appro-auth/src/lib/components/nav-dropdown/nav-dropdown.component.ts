import {Component} from '@angular/core';
import {map, Observable, of} from "rxjs";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-nav-dropdown',
  templateUrl: './nav-dropdown.component.html',
  styleUrls: ['./nav-dropdown.component.css']
})
export class NavDropdownComponent {

  isDropdownOpen: boolean = false;
  logged: Observable<boolean>;
  currentUserName: Observable<string>;

  constructor(private authService: AuthService) {
    this.logged = authService.isLogged()
    this.currentUserName = authService.currentUser.pipe(map(res => res?.user.firstName ?? ""))
  }

  toogleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    this.authService.logout();
  }

}
