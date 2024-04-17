import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[AuthService]
})
export class AppComponent implements OnInit,OnDestroy{
  title = 'Console';
  constructor(private AS:AuthService) { }
  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
    console.log('clear storage');
    localStorage.clear();
  }
}
