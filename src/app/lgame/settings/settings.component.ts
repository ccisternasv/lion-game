import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Settings } from './settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
 
  private _settings: Settings;

  constructor() { 
  }

  public get settings(): Settings {
    return this._settings;
  }

  @Input()
  public set settings(value: Settings) {
    this._settings = value;
    this._settings.level = 5;
  }

  ngOnInit() {
  }

  public saveSettings(){

  }

}
