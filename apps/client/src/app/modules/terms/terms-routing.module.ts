import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TermsPage} from './pages';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: TermsPage,
            }
        ])
    ],
    exports: [
        RouterModule,
    ]
})
export class TermsRoutingModule {
}
