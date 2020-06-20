import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: object[];
  checkoutForm;
  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {
    this.checkoutForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(60)])],
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.maxLength(60)])]
    });
  }
  ngOnInit() {
    this.items = this.cartService.getItems();
  }
  onSubmit(customerData) {
    const formValue = this.checkoutForm.value;
    const itemSummary = this.items.map(item => `${item['name']}: \$${item['price'].toFixed(2)}`).join('\n');
    const priceTotal = `\$${this.items.reduce((total, item) => total += item['price'], 0).toFixed(2)}`;
    window.confirm(
      'Please confirm or cancel this order:\n'
      + formValue.name
      + ' (' + formValue.email + ')'
      + ' is purchasing:\n'
      + itemSummary + '\n'
      + 'Total: ' + priceTotal
    );
    this.items = this.cartService.clearCart();
    this.checkoutForm.reset();
  }
}
