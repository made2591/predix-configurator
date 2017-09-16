import {
    Component, OnInit, ElementRef, ViewChild,
    AfterViewInit, AfterViewChecked
}                                            from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl }   from '@angular/forms';
import { MachineGroup }                                                 from "../data/predixConfigurationData.model";
import { PredixConfigurationDataService }                               from '../data/predixConfigurationData.service';

@Component ({
    selector:    'mt-wizard-personal',
    templateUrl: 'groupsMachines.component.html',
})

export class GroupsMachinesComponent implements OnInit {
    
    title = 'Step 6 - Groups & Machines';
    description = 'The final step is to define machines and add them to groups.';
    form: any;
    machines: {};
    machinesFormsWrapper: FormGroup;
    
    constructor(private predixConfigurationDataService: PredixConfigurationDataService, private formBuilder: FormBuilder) {
    }
    
    ngOnInit() {
        this.machinesFormsWrapper = this.formBuilder.group({
            machinesForms: this.formBuilder.array([
                this.initMachineForm(),
            ])
        });
        console.log('SitesGroupsComponent feature loaded!');
    }
    
    initMachineForm(mp? : string) {
        
        let mpr = [''];
        if(mp) { mpr = [mp]; }

        return this.formBuilder.group({
            machinePlate: mpr,
            machinePcu: [''],
            machineIp: [''],
            machineNat: [''],
            machineInfo: [''],
            machineProtocol: [''],
            machineLocalTagMappingSchema: [''],
            machineLocalEnableSetup: new FormControl(true),
            machineSite: [''],
            machineGroup: [''],
        });
    }
    
    addMachineForm() {
        const control = <FormArray>this.machinesFormsWrapper.controls['machinesForms'];
        control.push(this.initMachineForm());
    }
    
    removeMachineForm(i: number) {
        const control = <FormArray>this.machinesFormsWrapper.controls['machinesForms'];
//        let siteName = (<FormArray>
//            (<FormGroup>this.machinesFormsWrapper.controls['sitesGroupsForms']).controls[i]).get('machinePlate').value;
        console.log(this.machines);
        control.removeAt(i);
    }
    
    save(form: any) {
        
        //this.predixConfigurationDataService.setSitesGroups(this.sitesGroups);
        
    }
    
}
