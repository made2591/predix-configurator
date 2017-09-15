import { Component, OnInit, Input }   from '@angular/core';

import { PredixConfigurationDataService }            from './data/predixConfigurationData.service';

@Component ({
    selector:     'predix-configurator-app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
    title = 'Multi-Step Wizard';
    @Input() predixConfigurationData;
    
    constructor(private predixConfigurationDataService: PredixConfigurationDataService) {
    }

    ngOnInit() {
        this.predixConfigurationData = this.predixConfigurationDataService.getPredixConfigurationData();
        console.log(this.title + ' loaded!');
    }
}
