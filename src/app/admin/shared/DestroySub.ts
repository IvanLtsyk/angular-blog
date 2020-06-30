import {OnDestroy} from "@angular/core";
import {Observable, Subscription, ReplaySubject} from "rxjs";

export class DestroySub implements OnDestroy {
  protected destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }
}
