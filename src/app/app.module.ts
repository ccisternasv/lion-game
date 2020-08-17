import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingsComponent } from './lgame/settings/settings.component';
import { PlaygroundComponent } from './lgame/playground/playground.component';
import { LgameComponent } from './lgame/lgame/lgame.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    PlaygroundComponent,
    LgameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
