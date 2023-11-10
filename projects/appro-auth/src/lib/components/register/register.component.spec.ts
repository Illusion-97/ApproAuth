import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {of} from "rxjs";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import SpyObj = jasmine.SpyObj;

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceSpy : SpyObj<AuthService>;
  let routerSpy : SpyObj<Router>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['register'])
    const jasmineRouterSpy = jasmine.createSpyObj('Router', ['navigate'])
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [
        /*RouterModule,*/
        ReactiveFormsModule
      ],
      // Provider permet de 'Mocker' les dépendances nécessaires
      providers: [
        /*{provide: AuthService, useClass: MockAuthService},*/
        {provide: AuthService, useValue: spy},
        /*{provide: ActivatedRoute, useClass: MockActivatedRoute}*/
        {provide: Router, useValue: jasmineRouterSpy}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as SpyObj<AuthService>
    routerSpy = TestBed.inject(Router) as SpyObj<Router>
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("existing untouched control should not be invalid", () => {
    // Arrange
    const existingControl = "password"
    // Act
    const result = component.isInvalid(existingControl)
    // Assert
    expect(result).toBe(false);
  })

  it("empty password should be invalid", () => {
    const passwordValue = "";
    component.passwordControl.patchValue(passwordValue)

    const result = component.passwordControl.invalid

    expect(result).toBe(true)
  })

  it("handle login with valid form should call service register", () => {
    const registerFormValue = {
      firstName: "Yanis",
      lastName: "ADEKALOM",
      email: "email@gmail.com",
      password: "aDummyPassword"
    }
    // Cette méthode pourrait vous permettre de remplir un formulaire avec des objets récupérés via appel API
    component.form.patchValue(registerFormValue)
    component.confirmPasswordControl.patchValue(registerFormValue.password)

    authServiceSpy.register.and.returnValue(of({}))

    component.handleSubmit()

    expect(authServiceSpy.register.calls.count()).toBe(1)
  })

  it("handle login with valid form should redirect to login", () => {
    const registerFormValue = {
      firstName: "Yanis",
      lastName: "ADEKALOM",
      email: "email@gmail.com",
      password: "aDummyPassword"
    }
    // Cette méthode pourrait vous permettre de remplir un formulaire avec des objets récupérés via appel API
    component.form.patchValue(registerFormValue)
    component.confirmPasswordControl.patchValue(registerFormValue.password)

    authServiceSpy.register.and.returnValue(of({}))
    routerSpy.navigate.and.stub()

    component.handleSubmit()

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login'])
  })
});

class MockAuthService {
  register(value: any) {
    return of({})
  }
}

class MockActivatedRoute {

}
