import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Settings } from '../settings/settings';

@Component({
  selector: 'app-lgame',
  templateUrl: './lgame.component.html',
  styleUrls: ['./lgame.component.css']
})
export class LgameComponent implements OnInit {
  public settings: Settings;


  constructor() {
    this.settings = new Settings();
    this.settings.level = 3;
   }

  public get gameSettings(): Settings {
    return this.settings;
  }
  public set gameSettings(value: Settings) {
    this.settings = value;
  }

  ngOnInit() {
  }

  @Input()
  public settingsSavedHandler(settings:Settings){
    this.gameSettings = settings;
    console.log(" Settings received", settings);
  }

  printSettings(){
    console.log(" Parent settings: ", this.settings);
  }

  @HostListener('document:keyup',['$event'])
  reactToInstByKey(keyInput:KeyboardEvent){
    const instr = keyInput.key;
    this.settings.players.forEach(player => player.reactToKeyInstr(instr));
  }

}
