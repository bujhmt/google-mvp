import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({selector: '[flexTableCell]'})
export class FlexTableCellDirective {
    @Input('flexTableCell') field: string;

    constructor(
        public template: TemplateRef<any>,
    ) {}
}
