import { Component, OnInit }                  from '@angular/core';

import { PredixGlobalConfig }                  from '../data/predixConfigurationData.model';
import { PredixConfigurationDataService }     from '../data/predixConfigurationData.service';

@Component ({
    selector:     'mt-wizard-personal',
    templateUrl: 'predixGlobalConfig.component.html'
})

export class PredixGlobalConfigComponent implements OnInit {
    title = 'Step 2 - Predix Global Configuration';
    description = 'Predix is under deployment so we create our configuration tool to provide flexible support for futures version of configuration files: here you can setup configuration file name, or go on with default values. Note: you can modify any of the information provided by this tools laters.';
    predixGlobalConfig: PredixGlobalConfig;
    form: any;
    
    constructor(private predixConfigurationDataService: PredixConfigurationDataService) {
        
    }
    
    ngOnInit() {
        this.predixGlobalConfig = this.predixConfigurationDataService.getPredixGlobalConfig();
        console.log('PredixGlobalConfig feature loaded!');
    }
    
    save(form: any) {
        if (!form.valid)
            return;
        this.predixConfigurationDataService.setPredixGlobalConfig(this.predixGlobalConfig);
    }

}
