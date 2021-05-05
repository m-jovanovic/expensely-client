import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector
} from '@angular/core';
import { interval, timer } from 'rxjs';
import { first, take } from 'rxjs/operators';

import { NotificationDialogComponent } from '../components';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationDialogComponentRef: ComponentRef<NotificationDialogComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector
  ) {}

  notify(message: string, timeout?: number): void {
    const componentRef = this.createNotificationDialogComponent(message);

    this.appendNotificationDialogToView(componentRef);

    this.removeNotificationDialogFromViewOnClose(componentRef, timeout);

    this.notificationDialogComponentRef = componentRef;
  }

  private createNotificationDialogComponent(message: string): ComponentRef<NotificationDialogComponent> {
    const componentFactory: ComponentFactory<NotificationDialogComponent> = this.componentFactoryResolver.resolveComponentFactory(
      NotificationDialogComponent
    );

    const componentRef = componentFactory.create(this.injector);

    componentRef.instance.message = message;

    return componentRef;
  }

  private appendNotificationDialogToView(componentRef: ComponentRef<NotificationDialogComponent>) {
    this.applicationRef.attachView(componentRef.hostView);

    const domElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    // Try to find the 'main' tag which is in the DOM in the main layout, otherwise fallback to looking for a 'div'.
    const tagsToSearchFor: string[] = ['main', 'div'];

    for (let i = 0; i < tagsToSearchFor.length; i++) {
      const elementsByTagName = document.getElementsByTagName(tagsToSearchFor[i]);

      if (elementsByTagName.length > 0) {
        elementsByTagName.item(0).appendChild(domElement);

        break;
      }
    }
  }

  private removeNotificationDialogFromViewOnClose(componentRef: ComponentRef<NotificationDialogComponent>, timeout?: number): void {
    if (timeout) {
      const timer$ = timer(timeout).pipe(first());

      timer$.subscribe(() => componentRef?.instance?.closed?.emit());
    }

    const subscription = componentRef.instance.closed.subscribe(() => {
      this.applicationRef.detachView(this.notificationDialogComponentRef.hostView);

      this.notificationDialogComponentRef.destroy();

      subscription.unsubscribe();
    });
  }
}
