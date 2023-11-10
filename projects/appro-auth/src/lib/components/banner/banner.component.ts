import { Component } from '@angular/core';
import {Observable} from "rxjs";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  isLogged: Observable<boolean>
  constructor(service : AuthService) {
    this.isLogged = service.isLogged()
  }
}
