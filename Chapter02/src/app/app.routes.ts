import { Routes } from '@angular/router';
import { ContactComponent } from './features/contact/contact.component';

export const routes: Routes = [
  { path: 'contact', component: ContactComponent },
  {
    path: 'articles',
    loadChildren: () =>
      import('./features/articles/routes').then((mod) => mod.ARTICLES_ROUTES),
  },
  {
    path: 'posts',
    loadChildren: () => 
        import('./features/posts/routes').then((mod) => mod.POST_ROUTES),
  },
  { path: '', pathMatch: 'full', redirectTo: 'articles' },
  { path: '**', redirectTo: 'articles' },
];
