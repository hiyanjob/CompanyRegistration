import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Service } from './service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'EMP';

  constructor(private FB: FormBuilder, private Service: Service) { }

  EmployeeForm: FormGroup;
  public imagePath: any;
  imgURL: string | ArrayBuffer = "https://bulma.io/images/placeholders/480x480.png";
  public message: string;
  file: File
  fileName: string;
  multiImage: Array<Object> = []

  ngOnInit() {
    this.EmployeeForm = this.FB.group({
      company_name: '',
      country: '',
      employee_details: this.FB.array([this.FB.group({
        emp_name: '',
        emp_id: '',
        salary: 0,
        pic: '',
        image: this.imgURL
      })])
    });
    this.multiImage = [{ uri: this.imgURL }]
  }

  get EmpDetailsAccessor() {
    return this.EmployeeForm.get('employee_details') as FormArray
  }

  addEmp() {
    this.EmpDetailsAccessor.push(this.FB.group({
      emp_name: '',
      emp_id: '',
      salary: 0,
      pic: '',
      image: this.imgURL
    }));
    this.multiImage = [...this.multiImage, { uri: this.imgURL }]
  }

  deleteEmp(index: number) {
    this.EmpDetailsAccessor.removeAt(index);
    this.multiImage = this.multiImage.filter((m, i) => index !== i);
  }

  preview(files: any, index: number) {
    if (files) {
      this.fileName = files.name;
      this.file = files;
      const reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = event => {
        const dataBase64 = reader.result;
        this.multiImage[index] = { uri: dataBase64 }
        this.multiImage = this.multiImage;
        console.log('the multi image ==> ', this.multiImage);
      };
    }

  }

  submitData() {
    console.log('the total data ==> ', this.EmployeeForm.value)
    this.Service.uploadDatas(this.EmployeeForm.value)
  }

}
