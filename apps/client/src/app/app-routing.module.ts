import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: 'sculptures',
                    loadChildren: () => import('./modules/sculptures/sculptures.module').then((m) => m.SculpturesModule),
                },
                {
                    path: '**',
                    redirectTo: 'sculptures',
                },
            ],
            {scrollPositionRestoration: 'enabled'},
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
