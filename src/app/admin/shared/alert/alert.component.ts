import {Component, Input, OnInit} from '@angular/core';
import {AlertService} from "../../services/AlertService";
import {DestroySub} from "../DestroySub";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent extends DestroySub implements OnInit {

  @Input() delay = 5000;
  text: string;
  type = "success";

  constructor(private alertService: AlertService) {
    super();
  }

  ngOnInit(): void {
    this.alertService.alert$
      .pipe(takeUntil(this.destroy))
      .subscribe((alert) => {
        const {type, text} = alert;
        this.type = type;
        this.text = text;
        const timeout =  setTimeout(() => {
          clearTimeout(timeout);
          this.text = ""
        }, this.delay)
      })
  }

}
