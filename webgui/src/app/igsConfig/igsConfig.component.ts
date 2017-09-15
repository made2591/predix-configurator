import { Component, OnInit }   from '@angular/core';

import { IgsConfig }                          from '../data/predixConfigurationData.model';
import { PredixConfigurationDataService }     from '../data/predixConfigurationData.service';

@Component ({
    selector:     'mt-wizard-personal',
    templateUrl: 'igsConfig.component.html'
})

export class IgsConfigComponent implements OnInit {

    title = 'Step 1: IGS Global Configuration';
    description = 'We use IGS from GE to gather information from machines in all plants. In this part it is possible to specify connection parameter needed to connect your Predix Machine(s) to your IGS instance. Note: you can modify any of the information provided by this tools laters.';
    igsConfig: IgsConfig;
    form: any;
    
    constructor(private predixConfigurationDataService: PredixConfigurationDataService) {
        
    }

    ngOnInit() {
        this.igsConfig = this.predixConfigurationDataService.getIgsConfig();
        console.log('IgsConfig feature loaded!');
    }

    save(form: any) {
        if (!form.valid)
            return;
        this.predixConfigurationDataService.setIgsConfig(this.igsConfig);
    }

}
