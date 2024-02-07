import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ScullyLibModule } from '@scullyio/ng-lib';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  standalone: true,
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated,
  imports: [ScullyLibModule]
})
export class PostsComponent implements OnInit {
  ngOnInit() {}

  constructor(private router: Router, private route: ActivatedRoute) {
  }
}
