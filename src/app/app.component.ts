import { Component, OnInit } from '@angular/core';

export interface boardfield {
  id: number;
  boardField: string;
  isTouched: boolean;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public field: number;
  public boardField: boardfield[] = [
    {
      id: 0,
      boardField: '',
      isTouched: false,
    },
    {
      id: 1,
      boardField: '',
      isTouched: false,
    },
    {
      id: 2,
      boardField: '',
      isTouched: false,
    },
    {
      id: 3,
      boardField: '',
      isTouched: false,
    },
    {
      id: 4,
      boardField: '',
      isTouched: false,
    },
    {
      id: 5,
      boardField: '',
      isTouched: false,
    },
    {
      id: 6,
      boardField: '',
      isTouched: false,
    },
    {
      id: 7,
      boardField: '',
      isTouched: false,
    },
    {
      id: 8,
      boardField: '',
      isTouched: false,
    },
  ];
  private touchedFields: number[] = [];
  public computersymbol: string;
  public playersymbol: string;
  private firstselectedsymbol: string;
  private gameStarted: boolean = false;
  public playerType: string;
  public showSymbolSelector: boolean = false;
  private touchedfieldscounter: number = 0;

  ngOnInit() {
    let starter = 0;
    console.log(starter);
    if (starter == 0 && this.gameStarted == false) {
      let random = this.getRandomNumber(2);
      console.log('selectfirstsymbol random', random);
      if (random == 0) {
        this.computersymbol = 'O';
        this.playersymbol = 'X';
      } else {
        this.computersymbol = 'X';
        this.playersymbol = 'O';
      }
      this.playerType = 'Computer';
      this.gameStarted = true;
      this.gameHelper(this.playerType);
    } else if (starter == 1 && this.gameStarted == false) {
      this.playerType = 'Human';
      this.gameStarted = true;
      if (!this.playersymbol) {
        this.showSymbolSelector = true;
      }
      if (this.gameStarted == true) {
      }
    }
  }

  gameHelper(playerType: string) {
    while (this.gameStarted == true) {
      console.log('playersymbol', this.playersymbol);
      console.log('playertype', this.playerType);
      console.log('field', this.field);
      if (playerType == 'Human' && this.field) {
        this.playermove();
      } else if (playerType == 'Computer') {
        this.computermove();
        break;
      }
      this.isgameended();
    }
  }
  isgameended() {
    let index = 0;
    for (let i = index; i < this.boardField.length; i++) {
      if (this.boardField[i].isTouched == true) {
        this.touchedfieldscounter++;
      }
      index = this.touchedFields.length;
    }
    if (this.touchedfieldscounter == 9) {
      this.gameStarted = false;
    }
  }

  setSymbol(symbol: string) {
    this.playersymbol = symbol;
    this.showSymbolSelector = false;
    if (this.playersymbol == 'X') {
      this.computersymbol = 'O';
    } else {
      this.computersymbol = 'X';
    }
    this.gameHelper(this.playerType);
  }

  playermove() {
    this.setboardField(this.playersymbol, this.field);
    this.playerType = 'Computer';
  }

  computermove() {
    let rando = this.getRandomNumber(9, this.touchedFields);
    this.field = rando;
    this.setboardField(this.computersymbol, rando);
    delete this.field;
    this.playerType = 'Human';
  }

  selectfield(field: number) {
    this.field = field;
    console.log('selected field', field);
  }

  setboardField(boardField: string, field?: number) {
    if (this.boardField[field].isTouched == false) {
      this.boardField[field].boardField = boardField;
      this.boardField[field].isTouched = true;
      if (!this.firstselectedsymbol) {
        this.firstselectedsymbol = boardField;
      }
      console.log('boardfield' + field, this.boardField[field]);
      this.markTouchedField(field);
      console.log('touched', this.touchedFields);
    } else {
      console.log('field ' + field + ' already filled');
    }
  }

  markTouchedField(field: number) {
    this.touchedFields.push(field);
  }

  getRandomNumber(max: number, touchedFields?: number[]) {
    if (!touchedFields) {
      let rando = Math.floor(Math.random() * max);
      return rando;
    } else {
      let rando = 0;
      let match = true;
      while (match) {
        match = false;
        rando = Math.floor(Math.random() * max);
        for (let i = 0; i < touchedFields.length; i++) {
          if (rando == touchedFields[i]) {
            match = true;
            break;
          }
        }
      }
      return rando;
    }
  }
}
