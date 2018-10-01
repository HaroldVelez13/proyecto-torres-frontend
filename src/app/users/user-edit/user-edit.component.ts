import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { IUser } from '../iuser';
import * as Constants from '../../_config/constants';
import {MatSnackBar} from '@angular/material';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { AdminChangePasswordComponent } from '../admin-change-password/admin-change-password.component';


@Component({
	selector: 'app-user-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

	editUserForm: FormGroup; 
	loading:boolean = false;
	user: boolean;
	userId:number;
	avatar:any = Constants.BASE_URL+'images/proyecto_torres/avatars/';

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



	edit_validation_messages = {
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

	constructor(	private userService : UserService,
				  	private activatedRoute: ActivatedRoute,
				  	private router: Router,
	          		private fb: FormBuilder,
          			private snackBar: MatSnackBar,
          			private dialog: MatDialog) { }

	ngOnInit() {
		this.editForms();  	
		this.userId =  parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
		this.getUser(this.userId);
	}
  

  	editForms():void{

	    this.editUserForm = this.fb.group({
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
		    finish_at: new FormControl(null, []), 
		    gender: new FormControl(null, [Validators.required]),
	    	img_url: new FormControl(null, []),
	    	ep_id: new FormControl(null, []),
	    	pension_id: new FormControl(null, [])
		})
	}

	edit(userForm, dir:string){

	     // stop here if form is invalid
	    if (this.editUserForm.invalid) {
	        return;
	    }
	    
	    this.loading = true;

	  	this.userService.update(userForm)
	       .pipe(first())
	        .subscribe(
	            data => {
	                this.loading = false;
	                this.userDetails(dir, data);
	            },
	            error => {
	                this.loading = false;
	            });
	}

	private getUser(id:number){
		this.userService.getById(id).subscribe((data: any) => {
			let user:IUser = data.user;
			this.eps = data.eps;
			this.pensions = data.pensions;

			this.avatar+=user.img_url;
			this.editUserForm.setValue({
				id: user.id,
				name: user.name,
				last_name: user.last_name,
				cc: user.cc,
				address: user.address,
				phone: user.phone,
				cell: user.cell,
				uniform_size: user.uniform_size,
				shoe_size: user.shoe_size,
				email: user.email, 
				img_url: user.img_url,
				birthday:user.birthday,
				init_at:user.init_at,
				finish_at:user.finish_at||null,
				gender:user.gender,
				ep_id:user.ep_id,
				pension_id:user.pension_id,
				rol:user.rol
			});
			this.user = true; 
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
		    this.editUserForm.get('img_url').setValue(reader.result);	
		    this.avatar = reader.result;	       
		  }		  
	    }
	}
	userDetails(dir:string, user:IUser){
		var fullName= user.name+' '+user.last_name;		

		this.snackBar.open('Usuario '+fullName+' Editado con exito', null,{
	        duration: 1200,

	    }).afterDismissed().subscribe(() => {
		  	if (dir=='back') {
				this.router.navigate(['/empleados']);
			}
			if (dir=='go') {
				this.router.navigate(['/empleados/detalle/', user.id]);
			}

		});
		
	}

    changePassword() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        this.dialog.open(AdminChangePasswordComponent, dialogConfig)
              .afterClosed().subscribe(
                formValue => { 
                	if (formValue) {
                        this.userService.changePassword(this.userId, formValue).pipe(first()).subscribe(res => { 
                         if(res.success){
                         	this.changeSnackBar(res.success);
                         }
                         
                        });
                    }
                  });         
    }

    changeSnackBar(message:string) {
      this.snackBar.open(message, null,{
        duration: 1200,
      });
    }


}
