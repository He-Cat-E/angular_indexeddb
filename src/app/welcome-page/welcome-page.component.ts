import { Component } from '@angular/core';
import { CryptoService } from '../services/crypto.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export class WelcomePageComponent {
  constructor(private CS:CryptoService,private AS:AuthService) {
    this.AS.currentLoggedInUser = undefined;
  }
}
