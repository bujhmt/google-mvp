import {NgModule} from '@angular/core';
import {ShowsRoutingModule} from './shows-routing.module';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ShowsService} from './services';
import {ButtonModule} from 'primeng/button';
import {ShowFormComponent} from './components';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {ChipsModule} from 'primeng/chips';
import {ShowsPage} from './pages/shows/shows.page';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';

@NgModule({
    imports: [
        ShowsRoutingModule,
        CommonModule,
        HttpClientModule,
        ButtonModule,
        InputTextareaModule,
        ReactiveFormsModule,
        InputTextModule,
        InputNumberModule,
        ChipsModule,
        CalendarModule,
        CardModule,
    ],
    declarations: [
        ShowsPage,
        ShowFormComponent,
    ],
    providers: [
        ShowsService,
    ],
})
export class ShowsModule {
}
