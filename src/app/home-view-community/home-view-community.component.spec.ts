import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeViewCommunityComponent } from './home-view-community.component';

describe('HomeViewCommunityComponent', () => {
  let component: HomeViewCommunityComponent;
  let fixture: ComponentFixture<HomeViewCommunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeViewCommunityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeViewCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
