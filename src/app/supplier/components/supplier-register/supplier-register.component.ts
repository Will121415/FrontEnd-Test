import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierService } from 'src/app/core/supplier/supplier.service';
import { Supplier } from 'src/app/models/supplier_model';

@Component({
  selector: 'app-supplier-register',
  templateUrl: './supplier-register.component.html',
  styleUrls: ['./supplier-register.component.css']
})
export class SupplierRegisterComponent implements OnInit {

  supplier: Supplier;
  supplierForm: FormGroup;

  constructor(
    public supplierService: SupplierService,
    private fb: FormBuilder
  )
  {this.buldForm();}

  ngOnInit(): void {
  }

  private buldForm()
  {
    this.supplier = new Supplier();

    this.supplierForm = this.fb.group({
      nit: [this.supplier.nit, Validators.required],
      name: [this.supplier.name, Validators.required],
      phone: [this.supplier.phone, Validators.required],
    });

  }
  get controlSupplier() {
    return this.supplierForm.controls;
  }

  onSubmit() {
    this.supplier = this.supplierForm.value;
    console.log(this.supplier);
    if (this.supplierForm.invalid) {return;};
    this.supplierService.post(this.supplier).subscribe(c => {

      if(c != null )
      {
        this.supplierForm.reset();
       alert("Proveedor Guardado...!");
      }else {
        alert("Error al guardar el proveedor");
      }
    });


  }

}
