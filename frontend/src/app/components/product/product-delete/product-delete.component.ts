import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product = {
    id: 1,
    name: '',
    price: 0
  }

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    const idString = JSON.parse(id || '')
    this.productService.readById(idString).subscribe(product=>{
      this.product = product
    })
  }

  deleteProduct(): void{
  const prod = this.product.id || 0
  this.productService.delete(prod).subscribe(()=>{
    this.productService.showMessage('Produto excluído com sucesso')
    this.router.navigate(['/products'])    
    })
  }

  cancel(): void{
    this.router.navigate(['/products'])
  }

}
