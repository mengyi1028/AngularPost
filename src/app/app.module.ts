import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
	MatInputModule,
	MatCardModule,
	MatButtonModule,
	MatToolbarModule,
	MatPaginatorModule
		} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
	   
import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import {PostService} from './posts/post.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
	HeaderComponent,
	PostListComponent
  ],
  imports: [
    BrowserModule,
	AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    MatInputModule,
	MatCardModule,
	MatButtonModule,
	MatToolbarModule,
	MatExpansionModule,
	MatPaginatorModule,
	HttpClientModule
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
