import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideRouter } from '@angular/router';
import { routes } from './nav.routes';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SignInComponent } from './navigation-bar/sign-in/sign-in.component';
import { SignUpComponent } from './navigation-bar/sign-up/sign-up.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { DataTableComponent } from './data-table/data-table.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { AddEditDailogComponent } from './data-table/add-edit-dailog/add-edit-dailog.component';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DisplayComponent } from './data-table/display/display.component';
@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    SignInComponent,
    SignUpComponent,
    PageNotFoundComponent,
    WelcomePageComponent,
    DataTableComponent,
    DashboardComponent,
    AddEditDailogComponent,
    DisplayComponent,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatTabsModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction,
    MatTooltipModule,
    MatDatepickerModule,
    MatCardModule,
    MatCheckboxModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideRouter(routes),
    provideNativeDateAdapter()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
