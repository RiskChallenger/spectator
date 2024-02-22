import { TestBed } from '@angular/core/testing';

import { SpyObject } from '../mock';
import { Token } from '../token';
import { Injector, runInInjectionContext } from '@angular/core';

/**
 * @internal
 */
export abstract class BaseSpectator {
  public inject<T>(token: Token<T>): SpyObject<T> {
    return TestBed.inject ? TestBed.inject(token) : TestBed.get(token);
  }

  /**
   * Execute any pending effects.
   */
  public flushEffects(): void {
    TestBed.flushEffects();
  }

  public runInInjectionContext<T>(cb: () => T): T {
    return TestBed.runInInjectionContext(cb);
  }
}
