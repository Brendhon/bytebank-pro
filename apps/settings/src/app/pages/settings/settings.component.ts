import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  templateUrl: './settings.component.html',
})
export class SettingsPageComponent implements OnInit {
  
  constructor() {}
  
  ngOnInit(): void {
    console.log('settings page initialized');
  }
}
