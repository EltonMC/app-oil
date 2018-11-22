import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-form-err',
  templateUrl: './form-err.page.html',
  styleUrls: ['./form-err.page.scss'],
})
export class FormErrPage implements OnInit {
  public form: FormGroup;
  public options = [
    {area: 'Alimentação 13,8 kV', conduta: 'Contactar equipe de elétrica de Alta para normalizar o problema'},
    {area: 'Programação do Painel ou inversor de frequência', conduta: 'Reconfigurar Parâmetros de corrente e tensão elétrica'},
    {area: 'Equipamento de Superfície (Painel/inversor, Transformador, Cabo)', conduta: 'Reparar ou substituir o equipamento com avaria'},
    {area: 'Equipamento de fundo (Bomba, Motor)', conduta: 'Necessário Avaliação de falha'}

  ];
  constructor(public storage: Storage,
    private navCtrl: NavController) {
    this.form = new FormGroup({
      err: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      dateStart: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      dateEnd: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      area: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      causa: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      conduta: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
  }

  ngOnInit() {
  }


  onSubmit(data) {
    this.storage.get('log').then(res => {
      console.log(res);
      res.data.forEach(element => {
        element.data.push(data[element.flag]);
      });
      console.log(data.date);
      res.label.push(data.date);
      this.storage.set('log', res).then(() => {
        this.navCtrl.navigateRoot(['/home']);
      });
    });
  }
}
