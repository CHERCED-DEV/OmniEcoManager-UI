import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from '../../pages/post/post.component';
import { BlogComponent } from '../../pages/room/blog.component';
import { ThreadComponent } from '../../pages/thread/thread.component';

const blogRoutes: Routes = [
    {
        path: '',
        component: BlogComponent,
        children: [
            { path: 'post/:id', component: PostComponent },
            { path: 'thread', component: ThreadComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(blogRoutes)],
    exports: [RouterModule]
})
export class BlogRoutingModule { }
