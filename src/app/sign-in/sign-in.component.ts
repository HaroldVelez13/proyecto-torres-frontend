import { Component, OnInit } from '@angular/core';
import {AuthService} from '../_config/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  returnUrl: string;
  loginForm: FormGroup; 
  loading:boolean = false;

  login_validation_messages = {
      'email': [
        { type: 'required', message: 'El correo es Requerido' },
        { type: 'pattern', message: 'Ingresa un Correo valido' }
      ],
      'password': [
        { type: 'required', message: 'La contraseña es Requerida' },
        { type: 'minlength', message: 'La contraseña debe ser de 5 caracteres minimo' }
      ]
    };
  constructor(private authService : AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private alertService: AlertService
              ){ }

  ngOnInit() {
    // reset login status
    if (this.authService.isLogin()) {
      this.authService.logout().subscribe();
    }
    
    this.createForm();	 
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/empleados';
  }

  public createForm():void{

    this.loginForm = this.fb.group({
            email: new FormControl('', Validators.compose([
                                        Validators.required,
                                        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),     
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  public login(){

     // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    var email: string = this.loginForm.controls.email.value ;
    var password:string = this.loginForm.controls.password.value ;
    
      this.loading = true;
  	  this.authService.login(email,password)
       .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
  }

}
