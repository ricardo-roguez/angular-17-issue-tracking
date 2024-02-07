import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ScullyLibModule} from '@scullyio/ng-lib';
import {PostsComponent} from './posts.component';

@NgModule({
  declarations: [PostsComponent],
  imports: [CommonModule, ScullyLibModule],
})
export class PostsModule {}
