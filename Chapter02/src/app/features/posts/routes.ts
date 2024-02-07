import { Routes } from '@angular/router';
import { PostsComponent } from './posts.component';

export const POST_ROUTES: Routes = [
    { path: ':id',  component: PostsComponent },
    { path: '**', component: PostsComponent }
];