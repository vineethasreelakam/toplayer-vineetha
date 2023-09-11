import { Directive, Attribute, OnInit,Input,AfterViewInit, ElementRef, OnChanges,HostListener, Output, EventEmitter  } from '@angular/core';  
import { Validator,  NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[ageLimit]',
//   providers: [{provide: NG_VALIDATORS, useExisting: ageLimit, multi: true}]  
})
// export class ageLimit implements Validator {

// }
export class AgeLimitDirective implements OnChanges {
    @Input()
    ageLimit!: string;
    @Output()
    clickHandler: EventEmitter<any> = new EventEmitter();
    constructor(private elRef: ElementRef) { 
        console.log('ageLimit',this.ageLimit)
    }
    @HostListener('click', ['$event'])
    // onClickHandler(event: MouseEvent) {
    //     this.clickHandler.emit(this);
    //   }
    ngOnChanges(changes: any){
        this.checkDate();
       
        // lblError.innerHTML = "";
        // if(changes.input){
        //   console.log('input changed');
        // }
      }
    // ngAfterViewInit(): void {
    //     // throw new Error('Method not implemented.');
       
    // }
//   constructor(
//     // private element: ElementRef,
//   ) { }
//   ngOnInit() {
    
//   }
    checkDate(){
        console.log('ageLimit',this.ageLimit)
        var parts = this.ageLimit.split("/");
        var dtDOB = new Date(parts[1] + "/" + parts[0] + "/" + parts[2]);
        var dtCurrent = new Date();
        // lblError.innerHTML = "Eligibility 18 years ONLY."
        if (dtCurrent.getFullYear() - dtDOB.getFullYear() < 18) {
            this.clickHandler.emit(false);
            // return false;
           
        }

        if (dtCurrent.getFullYear() - dtDOB.getFullYear() == 18) {

            //CD: 11/06/2018 and DB: 15/07/2000. Will turned 18 on 15/07/2018.
            if (dtCurrent.getMonth() < dtDOB.getMonth()) {
                // return false;
                this.clickHandler.emit(false);
            }
            if (dtCurrent.getMonth() == dtDOB.getMonth()) {
                //CD: 11/06/2018 and DB: 15/06/2000. Will turned 18 on 15/06/2018.
                if (dtCurrent.getDate() < dtDOB.getDate()) {
                    // return false;
                    this.clickHandler.emit(false);
                }
            }
        }
        if (dtCurrent.getFullYear() - dtDOB.getFullYear() > 18) {
            this.clickHandler.emit(true);
        }
    }
}
