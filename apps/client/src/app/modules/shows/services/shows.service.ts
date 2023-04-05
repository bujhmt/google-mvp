import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {CreateShowPayload, GetShowsPayload} from '../payloads';
import {firstValueFrom} from 'rxjs';
import {Show} from '@google-mvp/shared/model';
import {stringify} from 'qs';

@Injectable()
export class ShowsService {
    private readonly baseUrl = `${environment.baseUri}/shows`;

    constructor(
        private readonly httpClient: HttpClient,
    ) {
    }

    public getShows(payload: GetShowsPayload): Promise<[Show[], number]> {
        return firstValueFrom(this.httpClient.get<[Show[], number]>(`${this.baseUrl}?${stringify(payload)}`));
    }

    public createShow(data: CreateShowPayload): Promise<Show> {
        return firstValueFrom(this.httpClient.post<Show>(`${this.baseUrl}/`, data));
    }
}
