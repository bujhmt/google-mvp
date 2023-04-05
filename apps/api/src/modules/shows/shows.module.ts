import {Module, OnModuleInit} from '@nestjs/common';
import {ShowsService} from './services';
import {ShowsController} from './controllers';

@Module({
    controllers: [
        ShowsController,
    ],
    providers: [
        ShowsService,
    ],
})
export class ShowsModule implements OnModuleInit {
    constructor(
        private readonly sculpturesService: ShowsService,
    ) {
    }

    async onModuleInit() {
        await this.sculpturesService.initializeIndex();
    }
}
