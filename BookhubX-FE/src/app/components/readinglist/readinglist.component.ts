import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-readinglist',
  templateUrl: './readinglist.component.html',
  styleUrls: ['./readinglist.component.css']
})
export class ReadinglistComponent implements OnInit{

  orderListBooks: any[] = [];

  constructor(private ordersService: OrdersService) {}


  ngOnInit(): void {
    this.loadOrderedBookList();
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


}
