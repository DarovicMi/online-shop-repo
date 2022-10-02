import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../entity/cart-item';
import { Product } from '../entity/product';
import { AuthenticationService } from '../services/authentication.service';
import { CartService } from '../services/cart.service';
import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService, private route: ActivatedRoute, private productService: ProductServiceService, private cartService: CartService) { 
    this.product = new Product();
  }

  product: Product;
  productId;

  ngOnInit(): void {

    this.route.params.subscribe(data => {
      this.productId = data['id'];
      this.productService.findProductById(this.productId).subscribe(data => {
        this.product = data;
        console.log(this.product);
      });
    });

  }

  addProductToCart(){
    console.log(`Adding product to cart: ${this.product.name}, ${this.product.price}`);
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }

}
