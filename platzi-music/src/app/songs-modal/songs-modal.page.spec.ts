import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SongsModalPage } from './songs-modal.page';

describe('SongsModalPage', () => {
  let component: SongsModalPage;
  let fixture: ComponentFixture<SongsModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongsModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SongsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
