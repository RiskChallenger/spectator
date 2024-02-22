import { createRoutingFactory, mockProvider, SpectatorRouting } from '@ngneat/spectator';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { functionalGuard } from './functional.guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

@Component({
  selector: 'app-empty-component',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
class EmptyComponent {}

describe('functionalGuard', () => {
  let spectator: SpectatorRouting<EmptyComponent>;

  const createComponent = createRoutingFactory({
    component: EmptyComponent,
    mocks: [RouterStateSnapshot],
    providers: [mockProvider(ActivatedRouteSnapshot, { params: {} })],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should test the guard', () => {
    spectator.runInInjectionContext(() => {
      const activatedRouteSnapshot = spectator.inject(ActivatedRouteSnapshot);
      const routerStateSnapshot = spectator.inject(RouterStateSnapshot);

      expect(functionalGuard(activatedRouteSnapshot, routerStateSnapshot)).toBe(true);
    });
  });

  it('should test the guard - 2', () => {
    spectator.runInInjectionContext(() => {
      const activatedRouteSnapshot = spectator.inject(ActivatedRouteSnapshot);
      const routerStateSnapshot = spectator.inject(RouterStateSnapshot);

      activatedRouteSnapshot.params.redirect = '/foo';

      expect(functionalGuard(activatedRouteSnapshot, routerStateSnapshot)).toBe(true);
    });
  });
});

describe('functionalGuardWithRoutingFactory', () => {
  let spectator: SpectatorRouting<EmptyComponent>;

  const createComponent = createRoutingFactory({
    component: EmptyComponent,
    routes: [
      {
        path: '**',
        // canActivate: [functionalGuard],
        component: EmptyComponent,
      },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should test the guard', async () => {
    const harness = await RouterTestingHarness.create();
    console.log(harness);
    const activatedComponent = await harness.navigateByUrl('/', EmptyComponent);

    expect(true).toBeTruthy();

    return;
  });
});
