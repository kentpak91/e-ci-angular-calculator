import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'My Angular Calculator';
  output = '0';
  newOutput = true;

  pendingValue = null;
  runningTotal = null;
  pendingOperation = null;

  public updateOutput(value){
     if (this.newOutput){
       this.output = value;
       this.newOutput = false;
     }else{     
       if (this.output == '0' && value == '0'){
          this.output = value;
       }else{
	if (this.output.search(/\./) < 0 || value != '.'){
	  this.output += value;
        }
       } 
     }
     this.pendingValue = parseFloat(this.output);
  }

  public clearOutput(){
     this.newOutput = true;
     this.runningTotal = null;
     this.pendingValue = null;
     this.pendingOperation = null; 
     this.output = '0';
  }

  public operation(operatorTemp){     
     if (this.runningTotal == null){
	this.runningTotal = this.pendingValue;
     }else{
	this.calculateTotal();
     }

     if (operatorTemp == 'sqrt'){
        this.pendingOperation = '√';
     }else{
        this.pendingOperation = operatorTemp;
     }

     this.newOutput = true;     
  }

  public calculateTotal(){
     if (this.pendingOperation == '+'){
	this.runningTotal += this.pendingValue;
     }
     if (this.pendingOperation == '-'){
        this.runningTotal -= this.pendingValue;
     }
     if (this.pendingOperation == '*'){
        this.runningTotal *= this.pendingValue;
     }
     if (this.pendingOperation == '/'){
        this.runningTotal /= this.pendingValue;
     }
     if (this.pendingOperation == '^'){
        this.runningTotal = Math.pow(this.runningTotal,this.pendingValue);
     }
     if (this.pendingOperation == '√'){
        this.runningTotal = Math.sqrt(parseInt(this.pendingValue));;
     }
     if(this.runningTotal == null){
         this.runningTotal = this.pendingValue;
     }
     this.output = this.runningTotal;
     this.newOutput = true;
  }

}

