import {Component, Input, Output, EventEmitter, OnChanges} from 'angular2/core';

@Component({
    selector: 'pagination',
    template: `
        <nav aria-label="Page navigation" *ngIf="items.length > pageSize">
            <ul class="pagination">
                <li [class.disabled]="currentPage == 1">
                    <a (click)="previous()" aria-label="Previous" class="clickable">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li [class.active]="currentPage == page" *ngFor="#page of pages" (click)="changePage(page)" class="clickable"><a>{{page}}</a></li>
                <li [class.disabled]="currentPage == pages.length">
                    <a (click)="next()" aria-label="Next" class="clickable">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    `
})

export class PaginationComponent implements OnChanges {
    @Input() items = [];
    @Input('page-size') pageSize = 10;
    @Output('page-changed') pageChanged = new EventEmitter();
    currentPage;
    pages: any[];
    
    ngOnChanges() {
        this.currentPage = 1;
        var pagesCount = Math.ceil(this.items.length / this.pageSize);
        this.pages = [];
		for (var i = 1; i <= pagesCount; i++)
			this.pages.push(i);
    }

    changePage(page) {
		this.currentPage = page; 
		this.pageChanged.emit(page);
	}

	previous() {
		if (this.currentPage == 1)
			return;

		this.currentPage--;
		this.pageChanged.emit(this.currentPage);
	}

	next() {
		if (this.currentPage == this.pages.length)
			return; 
		
		this.currentPage++;
		this.pageChanged.emit(this.currentPage);
	}
}