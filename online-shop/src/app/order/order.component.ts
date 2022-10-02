import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../entity/product';
import { AuthenticationService } from '../services/authentication.service';
import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService, private route: ActivatedRoute, private productService: ProductServiceService) {
    this.product = new Product();
   }

  product: Product;
  productId: number;
  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.productId = data['id'];
      this.productService.findProductById(this.productId).subscribe(data => {
        this.product = data;
      });
    });
  }

}
