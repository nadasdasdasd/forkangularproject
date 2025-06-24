// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { APP_BASE_HREF } from '@angular/common';
bootstrapApplication(AppComponent, {
    providers: [
        { provide: APP_BASE_HREF, useValue: '/weather' },
        // other providers
    ]
}).catch(err => console.error(err));
//# sourceMappingURL=main.js.map