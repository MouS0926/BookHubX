import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunityService } from 'src/app/services/community.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{
  userBooks: any[] = [];
  constructor(private communitySerivce: CommunityService, private route: ActivatedRoute) {}

ngOnInit(): void {
  const userId = this.route.snapshot.paramMap.get('userId');
  this.loadUserBooks(userId!);
}


  loadUserBooks(userId: string): void {
    // this.communitySerivce.getUserBooks(userId).subscribe(
    //   (userBooks) => {
    //     this.userBooks = userBooks;
    //   },
    //   (error) => {
    //     console.error('Error fetching user books:', error);
    //   }
    // );
  }
}
