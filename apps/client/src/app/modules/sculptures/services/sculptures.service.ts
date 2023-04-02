import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {CreateSculpturePayload, GetSculpturesPayload} from '../payloads';
import {firstValueFrom} from 'rxjs';
import {Sculpture} from '@google-mvp/shared/model';
import {stringify} from 'qs';

@Injectable()
export class SculpturesService {
    private readonly baseUrl = `${environment.baseUri}/sculptures`;

    constructor(
        private readonly httpClient: HttpClient,
    ) {
    }

    public getSculptures(payload: GetSculpturesPayload): Promise<[Sculpture[], number]> {
        return firstValueFrom(this.httpClient.get<[Sculpture[], number]>(`${this.baseUrl}?${stringify(payload)}`));
    }

    public createSculpture(data: CreateSculpturePayload): Promise<string> {
        return firstValueFrom(this.httpClient.post<string>(`${this.baseUrl}/`, data));
    }
}
