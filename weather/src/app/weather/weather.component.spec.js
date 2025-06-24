var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TestBed } from '@angular/core/testing';
import { WeatherComponent } from './weather.component';
import { TableDataService } from '../table-data.service';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
describe('WeatherComponent', () => {
    let component;
    let fixture;
    let tableDataService;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const spy = jasmine.createSpyObj('TableDataService', ['getData']);
        yield TestBed.configureTestingModule({
            declarations: [WeatherComponent],
            imports: [MatTableModule],
            providers: [
                { provide: TableDataService, useValue: spy }
            ]
        }).compileComponents();
        tableDataService = TestBed.inject(TableDataService);
        tableDataService.getData.and.returnValue(of([
            { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' }
        ]));
        fixture = TestBed.createComponent(WeatherComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should have dataSource with data', () => {
        expect(component.dataSource.length).toBe(1);
    });
});
//# sourceMappingURL=weather.component.spec.js.map