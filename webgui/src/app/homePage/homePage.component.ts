import { Component, OnInit }   from '@angular/core';

@Component ({
    selector:     'mt-wizard-personal',
    templateUrl: 'homePage.component.html'
})

export class HomePageComponent implements OnInit {

    title = 'Step 1: IGS Global Configuration';
    description = 'We use IGS from GE to gather information from machines in all plants. In this part it is possible to specify connection parameter needed to connect your Predix Machine(s) to your IGS instance. Note: you can modify any of the information provided by this tools laters.';
    
    constructor() {
        
    }

    ngOnInit() {
        console.log('WelcomePage');
    }
    
}
