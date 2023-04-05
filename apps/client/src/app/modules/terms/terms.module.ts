import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TermsPage} from './pages';
import {TermsRoutingModule} from './terms-routing.module';
import {ChipsModule} from 'primeng/chips';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ScrollerModule} from 'primeng/scroller';
import {DocumentFormComponent} from './components';
import {ButtonModule} from 'primeng/button';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DividerModule} from 'primeng/divider';
import {SelectButtonModule} from 'primeng/selectbutton';

@NgModule({
    imports: [
        CommonModule,
        TermsRoutingModule,
        ChipsModule,
        FormsModule,
        ReactiveFormsModule,
        SelectButtonModule,
        ScrollerModule,
        ButtonModule,
        InputTextareaModule,
        DividerModule,
    ],
    declarations: [
        TermsPage,
        DocumentFormComponent,
    ],
})
export class TermsModule {
}
