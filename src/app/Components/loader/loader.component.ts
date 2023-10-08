import { Component, OnDestroy } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/Services/loading.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnDestroy {
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router, 
    public loaderService: LoadingService
    ) {
    const routerSubscription = router.events.subscribe((event) => {
      this.navigationInterceptor(event as RouterEvent);
    });
    this.subscriptions.push(routerSubscription);
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loaderService.start();
    }
    if (event instanceof NavigationEnd) {
      this.loaderService.stop();
    }
    if (event instanceof NavigationCancel) {
      this.loaderService.stop();
    }
    if (event instanceof NavigationError) {
      this.loaderService.stop();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
