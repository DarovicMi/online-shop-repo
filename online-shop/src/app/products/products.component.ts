import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { Product } from '../entity/product';
import { AuthenticationService } from '../services/authentication.service';
import { CartService } from '../services/cart.service';
import { CartItem } from '../entity/cart-item';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productService: ProductServiceService, public authenticationService: AuthenticationService, private cartService: CartService) { }

  products: Product[];

  ngOnInit(): void {
    this.getAllProducts();
  }
 

  getAllProducts() {
    return this.productService.getAllProducts().subscribe(data => {
      this.products = data;
    });
  }

  addProductToCart(product: Product) {
      const theCartItem = new CartItem(product);
      this.cartService.addToCart(theCartItem);
  }

}
