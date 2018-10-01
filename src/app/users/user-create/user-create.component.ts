import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { IUser } from '../iuser';
import {Router} from '@angular/router';
import * as Constants from '../../_config/constants';
import {MatSnackBar} from '@angular/material';




@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit {

	createUserForm: FormGroup; 
	loading:boolean = false;
	init_image:any = Constants.BASE_URL+'images/proyecto_torres/avatars/default.png';

	uniforms = [{value: 'xs', viewValue: 'XS'},
			    {value: 's', viewValue: 'S'},
			    {value: 'm', viewValue: 'M'},
			    {value: 'l', viewValue: 'L'},
			    {value: 'xl', viewValue: 'XL'}
			  ];

	genders = [{value: 'm', viewValue: 'MASCULINO'},
			     {value: 'f', viewValue: 'FEMENINO'},
			     {value: 'o', viewValue: 'OTRO'}
			  ];

	roles = [{value: 'admin', viewValue: 'ADMINISTRADOR'},
		     {value: 'employe', viewValue: 'EMPLEADO'}
		  	];

	eps:[{}];

	pensions:[{}];

    create_validation_messages = {
		'name': [
			{ type: 'required', message: 'El Nombre es Requerido' },
			{ type: 'minLength', message: 'El Nombre debe tener al menos 3 letras' },

		],
		'last_name': [
			{ type: 'minLength', message: 'El Apellido debe tener al menos 3 letras' },
		],
		'email': [
			{ type: 'required', message: 'El correo es Requerido' },
			{ type: 'pattern', message: 'Ingresa un Correo valido' }
		],
		'cc': [
			{ type: 'required', message: 'El Numero de Cedula es Requerida' },
			{ type: 'minLength', message: 'El Numero de Cedula debe tener al menos 5 numeros' }
		],
		'birthday': [
			{ type: 'required', message: 'La fecha de Nacimiento es Requerida' },
		],
		'address': [
			{ type: 'minLength', message: 'La direccion debe tener al menos 6 letras' },
		],
		'phone': [
			{ type: 'minLength', message: 'El Telefono fijo debe tener al menos 7 letras' },
		],
		'cell': [
			{ type: 'minLength', message: 'El Telefono celular debe tener al menos 10 letras' },
		],
		'gender': [
			{ type: 'required', message: 'El Genero es Requerido' },
		],
		'rol': [
			{ type: 'required', message: 'El Cargo es Requerido' },
		],
		'shoe_size': [
			{ type: 'minlength', message: 'La Talla del Calzado se representa en dos numeros' },
			{ type: 'maxlength', message: 'La Talla del Calzado se representa en dos numeros' }
		],
		'uniform_size': [
			{ type: 'required', message: 'El Cargo es Requerido' },
		],
		'password': [
		{ type: 'minlength', message: 'La contraseña debe ser de 5 caracteres minimo' }
		]
    };

  constructor(private userService : UserService,
              private fb: FormBuilder,
              private router:Router,
              private snackBar: MatSnackBar
              ) {}

  ngOnInit() {  	
  	this.createForms();
  	this.getEpsPensions();
  }

  createForms():void{

    this.createUserForm = this.fb.group({
    	id: new FormControl(null, []),
	    name: new FormControl(null, Validators.compose([
	            Validators.required,
	            Validators.minLength(3)
	    ])),
	    last_name: new FormControl(null, [Validators.minLength(3)]),
	    cc: new FormControl(null, Validators.compose([
	    		Validators.minLength(5),
	    		Validators.required
	    ])),
	    address: new FormControl(null, [Validators.minLength(6)]),
	    phone: new FormControl(null, [Validators.minLength(7)]),
	    cell: new FormControl(null, [Validators.minLength(10)]),
	    uniform_size: new FormControl(null, []),
	    rol: new FormControl(null, [Validators.required]),
	    shoe_size: new FormControl(null, Validators.compose([
	    		Validators.minLength(2),
	    		Validators.maxLength(2)
	    ])),
	    email: new FormControl(null, Validators.compose([
	            Validators.required,
	            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
	    ])),
	    birthday: new FormControl(null, [Validators.required]), 
	    init_at: new FormControl(null, []), 
	    gender: new FormControl(null, [Validators.required]),
	   	password: new FormControl(null, Validators.compose([
	        	Validators.minLength(5)
	    ])),
    	img_url: new FormControl(null, []),
    	ep_id: new FormControl(null, []),
    	pension_id: new FormControl(null, [])
    });
  }
    getEpsPensions(){
    	this.userService.getEpsPensions()
	       .pipe(first())
	        .subscribe(
	            data => {
	                this.eps = data.eps;
	                this.pensions = data.pensions;
	            });
    }

	create(userForm, dir){

				
	    if (this.createUserForm.invalid) {
	        return;
	    }	    
	    this.loading = true;  
	    
	  	this.userService.create(userForm)
	       .pipe(first())
	        .subscribe(
	            data => {
	                this.loading = false;
	                this.createSuccess(dir, data);                
	                
	            },
	            error => {
	                this.loading = false;

	            });
	}
	  /**
	   * this is used to trigger the input
	   */ 
	openInput(){ 
	    // your can use ElementRef for this later
	    document.getElementById("avatar").click();
	    return false;	    
	}
	  
	  
	fileChange(file:any) {
		if (file.target.files && file.target.files[0]) {

		  var reader = new FileReader();
		  reader.readAsDataURL(file.target.files[0]);

		  reader.onload = (event:any) => {
		    this.createUserForm.get('img_url').setValue( reader.result);
		    this.init_image = reader.result;	       
		  }		  
	    }
	}

	createSuccess(dir:string, user:IUser){

		var fullName= user.name+' '+user.last_name;		

		this.snackBar.open('Usuario '+fullName+' Creado con exito', null,{
	        duration: 1200,

	    }).afterDismissed().subscribe(() => {
		  	if (dir=='back') {
				this.router.navigate(['/empleados']);
			}
			if (dir=='go') {
				this.router.navigate(['/empleados/detalle/', user.id]);
			}
			if (dir=='refresh') {
				this.createUserForm.reset();
			}
		});		

	}


}
