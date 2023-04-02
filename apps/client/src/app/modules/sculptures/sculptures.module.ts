import {NgModule} from '@angular/core';
import {SculpturesRoutingModule} from './sculptures-routing.module';
import {CommonModule} from '@angular/common';
import {SculpturesPage} from './pages';
import {HttpClientModule} from '@angular/common/http';
import {SculpturesService} from './services';
import {FlexTableModule} from '@google-mvp/client/ui-flex-table';
import {ButtonModule} from 'primeng/button';
import {SculptureFormComponent} from './components';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {ChipsModule} from 'primeng/chips';

@NgModule({
    imports: [
        SculpturesRoutingModule,
        CommonModule,
        HttpClientModule,
        FlexTableModule,
        ButtonModule,
        InputTextareaModule,
        ReactiveFormsModule,
        InputTextModule,
        InputNumberModule,
        ChipsModule,
    ],
    declarations: [
        SculpturesPage,
        SculptureFormComponent,
    ],
    providers: [
        SculpturesService,
    ],
})
export class SculpturesModule {
}
