import {Module, OnModuleInit} from '@nestjs/common';
import {SculpturesService} from './services';
import {SculpturesController} from './controllers';

@Module({
    controllers: [
        SculpturesController,
    ],
    providers: [
        SculpturesService,
    ],
})
export class SculpturesModule implements OnModuleInit {
    constructor(
        private readonly sculpturesService: SculpturesService,
    ) {
    }

    async onModuleInit() {
        await this.sculpturesService.initializeIndex();
    }
}
