import {Injectable, EventEmitter, Output} from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    constructor(private api: ApiService) {
    }

    public allData(params: string) {
        return this.api.get(params);
    }

    public properties(params: string) {
        return this.api.get(params);
    }
}