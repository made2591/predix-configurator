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
    tagMappingSchemas: Array<String>;
    sites: Array<String>;
    sitesGroups: {};
    machinesFormsWrapper: FormGroup;
    
    constructor(private predixConfigurationDataService: PredixConfigurationDataService, private formBuilder: FormBuilder) {
    }
    
    ngOnInit() {
        // create tag mapping schema
        this.tagMappingSchemas = [];
        for (let key in this.predixConfigurationDataService.getTagMappingSchema()) {
            this.tagMappingSchemas.push(key);
        }
    
        let sitesFromModel = this.predixConfigurationDataService.getSitesGroups();
        
        // create site array
        this.sites = [];
        // create site group dict
        this.sitesGroups = {};

        // for each site
        for (let siteName in sitesFromModel) {

            // add site to site array
            this.sites.push(siteName);
            
            // add site group to dict
            this.sitesGroups[siteName] = [];

            for (let groupName in sitesFromModel[siteName]) {
                this.sitesGroups[siteName].push(groupName);
            }

        }
    
        console.log(this.sitesGroups);
    
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
            machineLocalEnableSetup: new FormControl(true),
            machineLocalTagMappingSchema: [''],
            machineSiteGroup: [''],
        });
    }
    
    addMachineForm() {
        const control = <FormArray>this.machinesFormsWrapper.controls['machinesForms'];
        control.push(this.initMachineForm());
    }
    
    removeMachineForm(i: number) {
        const control = <FormArray>this.machinesFormsWrapper.controls['machinesForms'];
        console.log(this.machines);
        control.removeAt(i);
    }
    
    save(form: any) {
        
        //this.predixConfigurationDataService.setSitesGroups(this.sitesGroups);
        
    }
    
}
