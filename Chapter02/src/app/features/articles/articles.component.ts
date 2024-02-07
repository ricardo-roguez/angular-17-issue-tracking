import { Component, inject, OnInit } from '@angular/core';
import { ScullyLibModule, ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { map, Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [ScullyLibModule, AsyncPipe, RouterLink],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent implements OnInit {
  
  private scullyService = inject(ScullyRoutesService);
  posts$: Observable<ScullyRoute[]> | undefined;
  
  ngOnInit() {
    this.posts$ = this.scullyService.available$.pipe(
        tap(d => {
          console.log(d)
        }),
        map(post => post.filter(post => post.title))
    )
  }
}
