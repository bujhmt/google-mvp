import {Module} from '@nestjs/common';
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
export class SculpturesModule {
}
