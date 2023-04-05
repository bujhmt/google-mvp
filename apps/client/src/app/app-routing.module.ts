import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: 'shows',
                    loadChildren: () => import('./modules/shows/shows.module').then((m) => m.ShowsModule),
                },
                {
                    path: 'terms',
                    loadChildren: () => import('./modules/terms/terms.module').then((m) => m.TermsModule),
                },
                {
                    path: '**',
                    redirectTo: 'shows',
                },
            ],
            {scrollPositionRestoration: 'enabled'},
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
