import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Service } from './service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'EMP';

  constructor(
    private FB: FormBuilder,
    private Service: Service
  ) { }

  EmployeeForm: FormGroup;
  public imagePath: any;
  imgURL: string | ArrayBuffer = "https://bulma.io/images/placeholders/480x480.png";
  public message: string;
  files: Array<File> = []
  fileName: string;
  multiImage: Array<Object> = [];
  progress: boolean = false
  progressMessage: string = 'Upload in progress...'

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.EmployeeForm = this.FB.group({
      company_name: ['', Validators.required],
      country: ['', Validators.required],
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
    this.files = this.files.filter((f, i) => index !== i);
  }

  preview(files: any, index: number) {
    if (files) {
      this.fileName = files.name;
      this.files[index] = files
      this.files = this.files;
      const reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = event => {
        const dataBase64 = reader.result;
        this.multiImage[index] = { uri: dataBase64 }
        this.multiImage = this.multiImage;
      };
    }

  }

  submitData() {
    const FD = new FormData();
    FD.append('companyname', this.EmployeeForm.value.company_name)
    FD.append('country', this.EmployeeForm.value.country)
    FD.append('emp_details', JSON.stringify(this.EmployeeForm.value.employee_details))
    this.files.forEach(m => {
      FD.append('emp_images', m, m.name)
    })

    this.progress = true;

    this.Service.uploadImages(FD).subscribe(
      (success) => {
        console.log('the result is ', success);
        if (success.status) {
          this.progressMessage = 'Insert Successfull.';
          this.EmployeeForm.reset();
          this.initForm();
          this.sessionOut()
        }
        else {
          this.progressMessage = 'Something Error.Please try again once.';
          this.sessionOut()
        }
      },
      (error) => {
        this.progressMessage = error
        this.sessionOut();
      }
    )
  }

  sessionOut = () => {
    setTimeout(() => {
      this.progress = false;
      this.progressMessage = 'Upload in progress...'
    }, 2000)
  }

}
