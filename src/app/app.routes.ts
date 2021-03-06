import { Routes, RouterModule } from '@angular/router';
import { CarouselHomeComponent } from './carousel-home/carousel-home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthGuard } from './_config/auth/auth.guard';
 
const AppRoutes: Routes = [
	//{path: 'empleados', loadChildren: './users/users.module#UsersModule' , canActivate: [AuthGuard]},

	//Pricipals Componentets 
    { path: '',   			    component: CarouselHomeComponent }, 
    { path: 'login', 		    component: SignInComponent }, 
    //Modules for entry
    { path: 'empleados', 	    loadChildren: './users/users.module#UsersModule' },
	{ path: 'seguridad-social', loadChildren: './social-security/social-security.module#SocialSecurityModule' },
    { path: 'evidencias',       loadChildren: './carousels/carousels.module#CarouselsModule' },
    { path: 'trabajos', 	    loadChildren: './jobs/jobs.module#JobsModule' },
	{ path: 'herramientas', 	loadChildren: './tools/tools.module#ToolsModule' },
	{ path: 'facturas', 	    loadChildren: './checkins/checkins.module#CheckinsModule' },
    
    //Any other route (No autorizate) 
    { path: '**',               redirectTo:'', pathMatch : 'full' },

   ];
    
 export const Routing = RouterModule.forRoot(AppRoutes,{useHash: true});
