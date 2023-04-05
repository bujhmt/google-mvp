import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ShowsPage} from './pages/shows/shows.page';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: ShowsPage,
            }
        ])
    ],
    exports: [
        RouterModule,
    ]
})
export class ShowsRoutingModule {
}
