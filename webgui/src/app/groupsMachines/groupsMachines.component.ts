import {
    Component, OnInit, ElementRef, ViewChild,
    AfterViewInit, AfterViewChecked
}                                            from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl }   from '@angular/forms';
import {
    MachineGroup,
    Machine
}                                                 from "../data/predixConfigurationData.model";
import { PredixConfigurationDataService }                               from '../data/predixConfigurationData.service';
import {MapType} from "@angular/compiler/src/output/output_ast";

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
    firstGroup: string;
    machinesFormsWrapper: FormGroup;
    
    constructor(private predixConfigurationDataService: PredixConfigurationDataService, private formBuilder: FormBuilder) {
    }
    
    ngOnInit() {
        this.machines = this.predixConfigurationDataService.getMachines();
        
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
        this.firstGroup = "";
        // for each site
        for (let siteName in sitesFromModel) {

            // add site to site array
            this.sites.push(siteName);
            
            // add site group to dict
            this.sitesGroups[siteName] = [];

            for (let groupName in sitesFromModel[siteName]) {
                this.sitesGroups[siteName].push(groupName);
                if(this.firstGroup.length == 0) {
                    this.firstGroup = groupName;
                }
            }

        }

        this.machinesFormsWrapper = this.formBuilder.group({
            machinesForms: this.formBuilder.array([
                this.initMachineForm(),
            ])
        });

        if(Object.keys(this.machines).length > 0) {
            this.load();
        }

        console.log('GroupsMachinesComponent feature loaded!');

    }
    
    initMachineForm(mp? : string, mpcu?: string, mip?: string, mnat?: string, mi?: string, mprot?: string, mles?: string, mltms?: string, msg?: string) {
        
        let mpr = [''];
        let mpcur = [''];
        let mipr = [''];
        let mnatr = [''];
        let mir = [''];
        let mprotr = [''];
        let mlesr = [''];
        let mltmsr = [this.tagMappingSchemas[0]];
        let msgr = [this.sites[0]+";"+this.firstGroup];
        if(mp) { mpr = [mp]; }
        if(mpcu) { mpcur = [mpcu]; }
        if(mip) { mipr = [mip]; }
        if(mnat) { mnatr = [mnat]; }
        if(mi) { mir = [mi]; }
        if(mprot) { mprotr = [mprot]; }
        if(mles) { mlesr = [mles]; }
        if(mltms) { mltmsr = [mltms]; }
        if(msg) { msgr = [msg]; }

        return this.formBuilder.group({
            machinePlate: mpr,
            machinePcu: mpcur,
            machineIp: mipr,
            machineNat: mnatr,
            machineInfo: mir,
            machineProtocol: mprotr,
            machineLocalEnableSetup: new FormControl(mlesr),
            machineLocalTagMappingSchema: mltmsr,
            machineSiteGroup: msgr,
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
    
    load() {
        
        // create new forms array
        let machinesForms = this.formBuilder.array([]);
        
        // for each schema in tagMappingSchema
        for(let machinePlate in this.machines) {
            
            console.log(machinePlate+
                this.machines[machinePlate].PCU+
                this.machines[machinePlate].IP+
                this.machines[machinePlate].NAT+
                this.machines[machinePlate].INFO+
                this.machines[machinePlate].PROTOCOL+
                this.machines[machinePlate].LOCAL_ENABLE_SETUP+
                this.machines[machinePlate].LOCAL_TAG_MAPPING_SCHEMA+
                this.machines[machinePlate].SITE_GROUP
            );
            
            // create a new schema form
            let machineForm = this.initMachineForm(
                machinePlate,
                this.machines[machinePlate].PCU,
                this.machines[machinePlate].IP,
                this.machines[machinePlate].NAT,
                this.machines[machinePlate].INFO,
                this.machines[machinePlate].PROTOCOL,
                this.machines[machinePlate].LOCAL_ENABLE_SETUP,
                this.machines[machinePlate].LOCAL_TAG_MAPPING_SCHEMA,
                this.machines[machinePlate].SITE_GROUP,
            );
            
            // add entire wrapper to forms
            machinesForms.push(machineForm);

        }
    
        // setup up external wrapper
        this.machinesFormsWrapper.controls['machinesForms'] = machinesForms;
        
    }
    
    save(form: any) {
        
        //this.predixConfigurationDataService.setSitesGroups(this.sitesGroups);
    
        this.machines = {};
    
        const machinesForms = <FormArray>this.machinesFormsWrapper.controls['machinesForms'];
    
        // for each tagMappingSchemaForm
        for(let i = 0; i < machinesForms.length; i++) {
        
            // get mappgingSchemaName
            let machinePlate =
                (<FormArray>
                    (<FormGroup>this.machinesFormsWrapper.controls['machinesForms'])
					    .controls[i]).get('machinePlate').value;
        
            // if the machinePlate is not null in any sense
            if (machinePlate !== null && machinePlate.length > 0) {
                // handle double names to
                if (machinePlate in this.machines) {
                    machinePlate = machinePlate+"_"+(i.toString());
                }
            }
            // create automatic name
            else {
                machinePlate = "MACHINE_PLATE_"+(i.toString());
            }
        
            // create MappingSchema Object
            this.machines[machinePlate] = new Machine();
    
            // create Key in TAG_MAPPING_SCHEMA var
            this.machines[machinePlate].PCU =
                (<FormGroup>
                    (<FormArray>
                        (<FormGroup>this.machinesFormsWrapper.controls['machinesForms'])
                            .controls[i]).get('machinePcu')).value;
    
            // create Key in TAG_MAPPING_SCHEMA var
            this.machines[machinePlate].IP =
                (<FormGroup>
                    (<FormArray>
                        (<FormGroup>this.machinesFormsWrapper.controls['machinesForms'])
                            .controls[i]).get('machineIp')).value;
    
            // create Key in TAG_MAPPING_SCHEMA var
            this.machines[machinePlate].NAT =
                (<FormGroup>
                    (<FormArray>
                        (<FormGroup>this.machinesFormsWrapper.controls['machinesForms'])
                            .controls[i]).get('machineNat')).value;
    
            // create Key in TAG_MAPPING_SCHEMA var
            this.machines[machinePlate].INFO =
                (<FormGroup>
                    (<FormArray>
                        (<FormGroup>this.machinesFormsWrapper.controls['machinesForms'])
                            .controls[i]).get('machineInfo')).value;
    
            // create Key in TAG_MAPPING_SCHEMA var
            this.machines[machinePlate].PROTOCOL =
                (<FormGroup>
                    (<FormArray>
                        (<FormGroup>this.machinesFormsWrapper.controls['machinesForms'])
                            .controls[i]).get('machineProtocol')).value;
    
            // create Key in TAG_MAPPING_SCHEMA var
            this.machines[machinePlate].LOCAL_ENABLE_SETUP =
                (<FormGroup>
                    (<FormArray>
                        (<FormGroup>this.machinesFormsWrapper.controls['machinesForms'])
                            .controls[i]).get('machineLocalEnableSetup')).value;
    
            // create Key in TAG_MAPPING_SCHEMA var
            this.machines[machinePlate].LOCAL_TAG_MAPPING_SCHEMA =
                (<FormGroup>
                    (<FormArray>
                        (<FormGroup>this.machinesFormsWrapper.controls['machinesForms'])
                            .controls[i]).get('machineLocalTagMappingSchema')).value;
    
            // create Key in TAG_MAPPING_SCHEMA var
            let machineSiteGroupCouple =
                (<FormGroup>
                    (<FormArray>
                        (<FormGroup>this.machinesFormsWrapper.controls['machinesForms'])
                            .controls[i]).get('machineSiteGroup')).value.split(";");
            
            this.predixConfigurationDataService.setMachine(
                machinePlate,
                this.machines[machinePlate],
                machineSiteGroupCouple[0],
                machineSiteGroupCouple[1]
            );

        }
    
        let modelSites = this.predixConfigurationDataService.getSitesGroups();
        console.log(modelSites);
        
    }
    
}
