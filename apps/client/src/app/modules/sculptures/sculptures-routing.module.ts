import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SculpturesPage} from './pages';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: SculpturesPage,
            }
        ])
    ],
    exports: [
        RouterModule,
    ]
})
export class SculpturesRoutingModule {
}
