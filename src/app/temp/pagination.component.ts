import { Component, OnInit, Input} from '@angular/core';
import { FormControl } from '@angular/forms';
import { flyIn } from '../animations/fly-in';
import { ActivatedRoute, Router, UrlTree, PRIMARY_OUTLET, UrlSegmentGroup, UrlSegment } from '@angular/router';
import { PostTableService } from './pagination.service';
import { Subject }           from 'rxjs/Subject';
import { Observable }        from 'rxjs/Observable';
import { Post } from './pagination-model';

@Component({
  selector: 'pagination-table',
  templateUrl: 'app/temp/pagination.component.html',
  styleUrls: ['app/temp/pagination.component.scss'],
  animations: [
    flyIn
  ]
})
export class PaginationTableComponent implements OnInit {

	public postList: Array<Post>;
    public maxSize: number = 5;         // 最多显示5个分页链接
    public itemsPerPage: number = 5;    // 每页记录数
    public totalItems: number = 15;     // 总记录数
    public currentPage: number = 1;     // 当前页码
    public searchText:string;

    private searchTerms = new Subject<string>();
    // private isSearch: boolean = false; // 表示是否为搜索action
    
  	constructor(public router: Router,
        public activeRoute: ActivatedRoute,
        public postTableService: PostTableService) {
    }

  	ngOnInit(): void {
        // 路由监听
  		this.activeRoute.params.subscribe(params => {
                console.log('router watch params >', params);
                this.getPostsByPage(this.searchText, this.currentPage);
            }
        );
 
        this.searchTerms
            .debounceTime(300)        // wait for 300ms pause in events
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .subscribe(searchText => {
				console.log('search currentPage:', this.currentPage);
	        	this.getPostsByPage(this.searchText, this.currentPage);
	        });
  	}
    
    public search($event): void {
        this.searchTerms.next(this.searchText);
    }

    public getPostsByPage(searchText: string, page: number) {
        let offset = (this.currentPage-1)*this.itemsPerPage;
		let end = (this.currentPage)*this.itemsPerPage;
        console.log(offset, end); 
        return this.postTableService.getPostTable(searchText, page).subscribe(
            res => {
                this.totalItems = res.total;
                // TODO.正式环境中，需要去掉slice
                this.postList = res['items'].slice(offset, end > this.totalItems ? this.totalItems : end);
                console.log(this.postList);
            },
            error => {console.log(error)},
            () => {}
        );
    }

    public pageChanged(event:any): void {
      let urlTree:UrlTree = this.router.parseUrl(this.router.url);
      const g:UrlSegmentGroup = urlTree.root.children[PRIMARY_OUTLET];
      const s:UrlSegment[] = g.segments;
      this.router.navigateByUrl(s[0]+"/page/"+event.page);
    }

    public goToWrite(): void {
      this.router.navigateByUrl("user/write");
    }

    public editPost(event): void {
        var target = event.currentTarget;
        var nameAttr = target.attributes.name;
        var value = nameAttr.nodeValue;
        console.log("postId>"+value);
    }

    public top(event): void {
        var target = event.currentTarget;
        var nameAttr = target.attributes.name;
        var value = nameAttr.nodeValue;
        console.log("postId>"+value);
    }

    public unTop(event):void{
        var target = event.currentTarget;
        var nameAttr = target.attributes.name;
        var value = nameAttr.nodeValue;
        console.log("postId>"+value);
    }

    public delPost(event): void {
        var target = event.currentTarget;
        var nameAttr = target.attributes.name;
        var value = nameAttr.nodeValue;
        console.log("postId>"+value);
    }

}
