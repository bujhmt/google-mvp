import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from 'primeng/table';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';
import {SplitButtonModule} from 'primeng/splitbutton';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {FlexTableCellDirective, FlexTableHeadDirective} from './directives';
import {FlexTable} from './components';

@NgModule({
    imports: [
        CommonModule,
        TableModule,
        ToggleButtonModule,
        FormsModule,
        ButtonModule,
        TooltipModule,
        SplitButtonModule,
        MultiSelectModule,
        ContextMenuModule,
    ],
    declarations: [
        FlexTableCellDirective,
        FlexTableHeadDirective,
        FlexTable,
    ],
    exports: [
        FlexTableCellDirective,
        FlexTableHeadDirective,
        FlexTable,
    ],
})
export class FlexTableModule {}
