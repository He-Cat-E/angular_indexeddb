import {Routes} from '@angular/router';
import { SignInComponent } from './navigation-bar/sign-in/sign-in.component';
import { SignUpComponent } from './navigation-bar/sign-up/sign-up.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { DataTableComponent } from './data-table/data-table.component';
import { DashboardComponent } from './dashboard/dashboard.component';
export const routes:Routes = [
    { path: '', redirectTo: 'app', pathMatch: 'full' },
    {path:'app',component:NavigationBarComponent,
        children:[
            {path: '',component:WelcomePageComponent},
            {path: 'signin', component: SignInComponent},
            {path: 'signup', component: SignUpComponent},
            {path:'not-found',component:PageNotFoundComponent},
            {path:'console',component:DataTableComponent},
            {path:'dashboard',component:DashboardComponent},
            {path: '**', redirectTo:'/app/not-found'},
        ]
    },
    {path: '**',redirectTo:'/app/not-found'}
];