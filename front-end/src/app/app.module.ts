import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { VideoComponent } from './components/video/video.component';
import { AlltimeComponent } from './components/alltime/alltime.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddcommaPipe } from './pipes/addcomma.pipe';
import { LikeratioComponent } from './components/likeratio/likeratio.component';
import { CommentsComponent } from './components/comments/comments.component';
import { PreviousComponent } from './components/previous/previous.component';
import { MonthComponent } from './components/month/month.component';
import { YearComponent } from './components/year/year.component';
import { RoundupPipe } from './pipes/roundup.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VideoComponent,
    AlltimeComponent,
    NavbarComponent,
    AddcommaPipe,
    LikeratioComponent,
    CommentsComponent,
    PreviousComponent,
    MonthComponent,
    YearComponent,
    RoundupPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ChartsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
