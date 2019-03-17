import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }

  getUsername() {
    return localStorage.getItem('user_name');
  }

  initName() {
    document.getElementById("nameInput").textContent = localStorage.getItem('user_name');
  }

}
