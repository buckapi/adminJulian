import { TestBed } from '@angular/core/testing';

import { AuthRESTService } from './auth-rest.service';

describe('AuthRESTService', () => {
  let service: AuthRESTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthRESTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
