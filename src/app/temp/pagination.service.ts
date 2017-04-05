import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class PostTableService {
    public delURL: string = '';
    public toEditURL: string = '';
    public postListURL = 'mock-data/pagination-mock.json';
    public postListSearchURL = 'mock-data/pagination-search-mock.json';

    constructor(public http: Http) { }

    public getPostTable(searchText: string, page: number=1): Observable<any> {
        let url = this.postListURL;
        let params = new URLSearchParams();
        if (searchText) {
            params.set('searchText', searchText);
            url = this.postListSearchURL;
            console.log(`searchText=${searchText}`);
        }
        params.set('page', String(page));
        
        return this.http
            .get(url, { search: params })
            .map((res: Response) => res.json())
            .catch((error:any) => Observable.throw(error || 'Server error'));
    }

    public del(postId: number):Observable<any> {
        return this.http.delete(this.delURL)
            .map((res: Response) => res.json());
    }

    public toEdit(postId: number):Observable<any> {
        return this.http.get(this.toEditURL)
            .map((res: Response) => res.json());
    }

    search(term: string): Observable<any> {
        return this.http
                .get(`mock-data/pagination-search-mock.json?name=${term}`)
                .map((r: Response) => r.json());
    }
}