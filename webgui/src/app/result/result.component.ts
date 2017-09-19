import { Component, OnInit, Input }         from '@angular/core';
import { PredixConfigurationDataService }   from '../data/predixConfigurationData.service';

@Component ({
    selector:     'mt-wizard-result'
    ,templateUrl: 'result.component.html'
})

export class ResultComponent implements OnInit {
    title = 'Thanks for Predix Configurator Tool';
    description = 'Thanks for Predix Configurator Tool';
    @Input() predixConfigurationData;
    isPredixConfigurationDataValid: boolean = false;
    
    constructor(private predixConfigurationDataService: PredixConfigurationDataService) {
    }
    
    ngOnInit() {
        this.predixConfigurationData = this.predixConfigurationDataService.getPredixConfigurationData();
        this.isPredixConfigurationDataValid = this.predixConfigurationDataService.isPredixConfigurationDataValid();
        console.log('Result feature loaded!');
    }
    
    submit() {
        alert('Excellent Job!');
        this.predixConfigurationData = this.predixConfigurationDataService.setPredixConfigurationData(this.predixConfigurationDataService.resetPredixConfigurationData());
        this.isPredixConfigurationDataValid = false;
    }
    
    reset() {
        
        this.predixConfigurationDataService.setPredixConfigurationData(this.predixConfigurationDataService.resetPredixConfigurationData());
        
    }
    
}
