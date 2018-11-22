import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  public form: FormGroup;
  public poco: string;

  constructor(public storage: Storage,
    private navCtrl: NavController,
    private route: ActivatedRoute) {
    this.poco = this.route.snapshot.paramMap.get('id');


    this.form = new FormGroup({
      corrente: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      date: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      tensao: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      freq: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      carga: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      pressao_cabeca: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      pressao_intake: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      temperatura_motor: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      resistencia_isolacao: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      resistencia_continuidade: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
  }

  ngOnInit() {
  }

  onSubmit(data) {
    this.storage.get(this.poco).then(res => {
      res.data.forEach(element => {
        element.data.push(data[element.flag]);
      });
      res.label.push(data.date);
      this.storage.set(this.poco, res).then(() => {
        this.navCtrl.navigateRoot(['/home']);
      });
    });
  }
}
