import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterFromValue} from "../models/register-from-value";
import {Login, LoginResponse} from "../models/login";
import {BehaviorSubject, catchError, map, Observable, tap, throwError} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = "http://localhost:3000"

  private registerPath : string = "/register"
  private loginPath : string = "/login"

  private userStorageKey: string = "CURRENT_USER"

  private currentUserSubject : BehaviorSubject<LoginResponse | null>;
  currentUser: Observable<LoginResponse | null>;
  constructor(private http: HttpClient, private router: Router) {
    let userStorageValue = localStorage.getItem(this.userStorageKey) ?? sessionStorage.getItem(this.userStorageKey)
    this.currentUserSubject = new BehaviorSubject<LoginResponse | null>(JSON.parse(userStorageValue!));
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentUserSubject.subscribe(value => console.log(value))
  }

  get token() {
    return this.currentUserSubject.value?.accessToken;
  }

  isLogged(): Observable<boolean> {
    return this.currentUser.pipe(map(currentUser => !!currentUser))
  }

  register(personne : RegisterFromValue) {
    // Lors de l'évaluation d'une variable, elle peut être considérée comme étant 'falsy' sous certaines conditions
    // Afin de verifier qu'elle ne l'est pas, il me suffit de faire une double inversion (!!)
    return this.http.post(`${this.apiUrl}${this.registerPath}`, personne)
  }

  login(credentials : Login) {
    return this.http.post<LoginResponse>(`${this.apiUrl}${this.loginPath}`, credentials)
      .pipe(tap(response => {
          if (response) {
            this.currentUserSubject.next(response);
            sessionStorage.setItem(this.userStorageKey, JSON.stringify(response))
            /* toujours avoir le consentement de l'utilisateur avant de stocker de façon permanente des informations sur son appareil
            if (credentials.rememberMe)
            localStorage.setItem(this.userStorageKey, JSON.stringify(result))*/
          } else {
            this.logout()
          }
      }),
        map(({user}) => `${user.firstName} ${user.lastName}`),
      catchError(err => {
        this.logout()
        return throwError(() => err)
      }))
  }

  logout() {
    sessionStorage.clear()
    localStorage.clear()
    this.currentUserSubject.next(null)
    this.router.navigate(['/login'])
    /* navigateByUrl implique un rechargement complet de la page et non uniquement des composants nécessaires
    this.router.navigateByUrl('/login')*/
  }
}
