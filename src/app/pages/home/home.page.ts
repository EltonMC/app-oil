import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HomePage implements OnInit {
  // public area = [
  //   {name: 'Carmopólis Area 1', poco: ['CP-0100', 'CP-0200', 'CP-1000']},
  //   {name: 'Carmopólis Area 2', poco: ['CP-1500', 'CP-2000', 'CP-3600']},
  //   {name: 'Carmopólis Area 3', poco: ['CP-2000', 'CP-3000', 'CP-4200']},
  //   {name: 'Pilar', poco: ['CP-0500', 'CP-0200', 'CP-0010']},
  //   {name: 'Anambé', poco: ['CP-0400', 'CP-0500', 'CP-0001']},
  // ];
  public area = [
    {name: 'Carmopólis Area 1', poco: ['WL-0001']}
  ];
  public pocoName: string;
  public pocoSelect: string;
  public showGraphFlag = false;
  public showSubFlag = false;
  public showSobFlag = false;
  public lineChartDataDefault: Array<any> = [
    {data: [], label: 'Tensão', flag: 'tensao'},
    {data: [], label: 'Corrente', flag: 'corrente'},
    {data: [], label: 'Pressão de Cabeça', flag: 'pressao_cabeca'},
    {data: [], label: 'Pressão no Intake', flag: 'pressao_intake'},
    {data: [], label: 'Temperatura do Motor', flag: 'temperatura_motor'},
    {data: [], label: 'Resistência a Isolação', flag: 'resistencia_isolacao'},
    {data: [], label: 'Resistência a Continuidade', flag: 'resistencia_continuidade'},
    {data: [], label: 'Frequencia', flag: 'freq'},
    {data: [], label: 'Carga', flag: 'carga'}
  ];
  public lineChartLabelsDefault: Array<any> = [];
  public lineChartData: Array<any>;
  public lineChartLabels: Array<any>;
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(51,51,230,0)',
      borderColor: 'rgba(51,51,230,1)',
      pointBackgroundColor: 'rgba(51,51,230,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(51,51,230,0.8)'
    },
    {
      backgroundColor: 'rgba(255,77,77,0)',
      borderColor: 'rgba(255,77,77,1)',
      pointBackgroundColor: 'rgba(255,77,77,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,77,77,1)'
    },
    {
      backgroundColor: 'rgba(234,128,255,0)',
      borderColor: 'rgba(234,128,255,1)',
      pointBackgroundColor: 'rgba(234,128,255,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(234,128,255,1)'
    },
    {
      backgroundColor: 'rgba(128,255,234,0)',
      borderColor: 'rgba(128,255,234,1)',
      pointBackgroundColor: 'rgba(128,255,234,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(128,255,234,1)'
    },
    {
      backgroundColor: 'rgba(255,255,25,0)',
      borderColor: 'rgba(255,255,25,1)',
      pointBackgroundColor: 'rgba(255,255,25,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,255,25,1)'
    },
    {
      backgroundColor: 'rgba(148,159,177,0)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      backgroundColor: 'rgba(238,118,0,0)',
      borderColor: 'rgba(238,118,0,1)',
      pointBackgroundColor: 'rgba(238,118,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(238,118,0,0.8)'
    },
    {
      backgroundColor: 'rgba(255,52,179,0)',
      borderColor: 'rgba(255,52,179,1)',
      pointBackgroundColor: 'rgba(255,52,179,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,52,179,0.8)'
    },
    {
      backgroundColor: 'rgba(0,255,0,0)',
      borderColor: 'rgba(0,255,0,1)',
      pointBackgroundColor: 'rgba(0,255,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0,255,0,0.8)'
    },
    
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  constructor(public storage: Storage) { }

  ngOnInit() {}

  ionViewWillEnter() {
   this.pocoName = '';
   this.pocoSelect = '';
   this.showGraphFlag = this.showSobFlag = this.showSubFlag = false;
  }

  showGraph() {
    this.resetData();
    this.storage.get(this.pocoSelect).then(res => {
      if (!res) {
        const log = {
          'data': this.lineChartDataDefault,
          'label': this.lineChartLabelsDefault
        };
        this.storage.set(this.pocoSelect, log);
      } else if (res && res.data[0].data.length > 0) {
        this.lineChartData = res.data;
        this.lineChartLabels = res.label;
        this.showGraphFlag = true;
        let beforeValue = this.lineChartData[1].data[0];
        this.lineChartData[1].data.forEach(element => {
          if (element >= (beforeValue * 1.2) ) {
            this.showSobFlag = true;
            this.showSubFlag = false;
          } else if (element <= (beforeValue * 0.85)){
            this.showSubFlag = true;
            this.showSobFlag = false;
          }
          beforeValue = element;
        });
      }
    });
  }

  resetData() {
    this.lineChartData = this.lineChartDataDefault;
    this.lineChartLabels = this.lineChartLabelsDefault;
    this.showGraphFlag = this.showSobFlag = this.showSubFlag = false;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public clearGraph() {
    this.storage.get(this.pocoSelect).then(res => {
      res.data = this.lineChartDataDefault;
      res.label = this.lineChartLabelsDefault;
      this.storage.set(this.pocoSelect, res);
      this.showGraphFlag = this.showSobFlag = this.showSubFlag = false;
    });
  }
}
