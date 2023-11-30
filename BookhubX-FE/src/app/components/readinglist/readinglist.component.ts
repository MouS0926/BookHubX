import { Component, OnInit } from '@angular/core';
import { MyreadinglistService } from 'src/app/services/myreadinglist.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-readinglist',
  templateUrl: './readinglist.component.html',
  styleUrls: ['./readinglist.component.css']
})
export class ReadinglistComponent implements OnInit{

  orderListBooks: any[] = [];
  selectedBookId: string = '';
  userReadingList: any[] = [];

  constructor(private ordersService: OrdersService,private readingService: MyreadinglistService) {}


  ngOnInit(): void {
    this.loadOrderedBookList();
    this.loadUserReadingList()
  }

  loadOrderedBookList(): void {
    this.ordersService.getUserOrders().subscribe(
      (orders) => {
        const allBooks = orders.flatMap(order => order.books);

        const uniqueBooks = Array.from(new Set(allBooks.map(book => book.bookId)))
          .map(bookId => {
            this.ordersService.getBookDetails(bookId).subscribe(
              (bookDetails) => {
                const quantity = allBooks.find(book => book.bookId === bookId).quantity;

                const bookInfo = {
                  bookId: bookId,
                  title: bookDetails.title, // Assuming title is a property of your book model
                  quantity: quantity
                };

                this.orderListBooks.push(bookInfo);
                console.log(this.orderListBooks);
                
              },
              (error) => {
                console.error('Error fetching book details:', error);
              }
            );
          });
      },
      (error) => {
        console.error('Error fetching user orders:', error);
      }
    );
  }



  addToReadingList(): void {
    if (!this.selectedBookId) {
      console.error('Please select a book');
      return;
    }

    // Call the ReadingService to add the book to the reading list
    this.readingService.addToReadingList({ userId: 'your_user_id', bookId: this.selectedBookId }).subscribe(
      (response) => {
        console.log(response);
        alert("Book added to reading list")
        this.loadUserReadingList()
        // Optionally, you can update the UI or show a success message
      },
      (error) => {
        console.error('Error adding book to reading list:', error);
        // Optionally, you can show an error message
      }
    );
  }


  loadUserReadingList(): void {
    this.readingService.getUserReadingList().subscribe(
      (readingList) => {
        this.userReadingList = readingList;
        console.log(this.userReadingList);
        
      },
      (error) => {
        console.error('Error fetching reading list:', error);
      }
    );
  }

  confirmRemoveBook(bookId: string): void {
    const isConfirmed = window.confirm('Are you sure you want to remove this book from the reading list?');

    if (isConfirmed) {
      this.removeBookFromReadingList(bookId);
    }
  }
  removeBookFromReadingList(bookId: string): void {
    this.readingService.removeBookFromReadingList(bookId).subscribe(
      () => {
        // Reload the reading list after successful removal
        alert("Book is removed from list")
        this.loadUserReadingList();
        console.log('Book removed from reading list successfully');
      },
      (error) => {
        console.error('Error removing book from reading list:', error);
      }
    );
  }

}
