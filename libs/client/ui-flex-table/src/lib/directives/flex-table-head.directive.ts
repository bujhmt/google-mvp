import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({selector: '[flexTableHead]'})
export class FlexTableHeadDirective {
    @Input('flexTableHead') field: string;

    constructor(
        public template: TemplateRef<any>,
    ) {}
}
