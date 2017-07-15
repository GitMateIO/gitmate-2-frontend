import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictSettingComponent } from './dict-setting.component';

describe('DictSettingComponent', () => {
  let component: DictSettingComponent;
  let fixture: ComponentFixture<DictSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
