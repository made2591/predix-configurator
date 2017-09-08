import { Injectable }               from '@angular/core';

import {
    PredixConfigurationData, IgsConfig, PredixGlobalConfig, PredixCloudConfig, TagMappingSchema
} from './predixConfigurationData.model';

import { WorkflowService }          from '../workflow/workflow.service';
import { STEPS }                    from '../workflow/workflow.model';

@Injectable()
export class PredixConfigurationDataService {

    private predixConfigurationData: PredixConfigurationData = new PredixConfigurationData();
    private isIgsConfigValid:           boolean = false;
    private isPredixGlobalConfigValid:  boolean = false;
    private isPredixCloudConfigValid:   boolean = false;
    private isTagMappingSchemaValid:    boolean = false;

    constructor(private workflowService: WorkflowService) {
        
    }
    
    // Return the IgsConfig data
    getIgsConfig(): IgsConfig {

        let igsConfig = new IgsConfig();

        igsConfig.SERVER_URI        = this.predixConfigurationData.IGS_CONFIG.SERVER_URI;
        igsConfig.APP_URI           = this.predixConfigurationData.IGS_CONFIG.APP_URI;
        igsConfig.PRODUCT_URI       = this.predixConfigurationData.IGS_CONFIG.PRODUCT_URI;
        igsConfig.NAMESPACE_INDEX   = this.predixConfigurationData.IGS_CONFIG.NAMESPACE_INDEX;

        return igsConfig;

    }
    
    // Set the IgsConfig data
    setIgsConfig(data: IgsConfig) {

        // Update the IgsConfig data only when the IgsConfig Form had been validated successfully
        this.isIgsConfigValid = true;

        this.predixConfigurationData.IGS_CONFIG.SERVER_URI       = data.SERVER_URI;
        this.predixConfigurationData.IGS_CONFIG.APP_URI          = data.APP_URI;
        this.predixConfigurationData.IGS_CONFIG.PRODUCT_URI      = data.PRODUCT_URI;
        this.predixConfigurationData.IGS_CONFIG.NAMESPACE_INDEX  = data.NAMESPACE_INDEX;

        // Validate IgsConfig Step in Workflow
        this.workflowService.validateStep(STEPS.igsConfig);

    }
    
    // Return the PredixGlobalConfig data
    getPredixGlobalConfig(): PredixGlobalConfig {
    
        let predixGlobalConfig = new PredixGlobalConfig();
    
        predixGlobalConfig.GLOBAL_CONFIG_SUFFIX     = this.predixConfigurationData.PREDIX_GLOBAL_CONFIG.GLOBAL_CONFIG_SUFFIX;
        predixGlobalConfig.DATATYPE_CONFIG_SUFFIX   = this.predixConfigurationData.PREDIX_GLOBAL_CONFIG.DATATYPE_CONFIG_SUFFIX;
        predixGlobalConfig.OPCUA_DATANODES          = this.predixConfigurationData.PREDIX_GLOBAL_CONFIG.OPCUA_DATANODES;
        predixGlobalConfig.HOOVER_SPILLWAY          = this.predixConfigurationData.PREDIX_GLOBAL_CONFIG.HOOVER_SPILLWAY;
        predixGlobalConfig.PREDIX_CLOUD_IDENTITY    = this.predixConfigurationData.PREDIX_GLOBAL_CONFIG.PREDIX_CLOUD_IDENTITY;
        predixGlobalConfig.PREDIX_WEBSOCKER_RIVER   = this.predixConfigurationData.PREDIX_GLOBAL_CONFIG.PREDIX_WEBSOCKER_RIVER;
        predixGlobalConfig.PROXY_CONFIGURATION      = this.predixConfigurationData.PREDIX_GLOBAL_CONFIG.PROXY_CONFIGURATION
    
        return predixGlobalConfig;
    
    }
    
    // Set the PredixGlobalConfig data
    setPredixGlobalConfig(data: PredixGlobalConfig) {
        
        // Update the PredixGlobalConfig data only when the PredixGlobalConfig Form had been validated successfully
        this.isPredixGlobalConfigValid = true;
    
        this.predixConfigurationData.PREDIX_GLOBAL_CONFIG.GLOBAL_CONFIG_SUFFIX      = data.GLOBAL_CONFIG_SUFFIX;
        this.predixConfigurationData.PREDIX_GLOBAL_CONFIG.DATATYPE_CONFIG_SUFFIX    = data.DATATYPE_CONFIG_SUFFIX;
        this.predixConfigurationData.PREDIX_GLOBAL_CONFIG.OPCUA_DATANODES           = data.OPCUA_DATANODES;
        this.predixConfigurationData.PREDIX_GLOBAL_CONFIG.HOOVER_SPILLWAY           = data.HOOVER_SPILLWAY;
        this.predixConfigurationData.PREDIX_GLOBAL_CONFIG.PREDIX_CLOUD_IDENTITY     = data.PREDIX_CLOUD_IDENTITY;
        this.predixConfigurationData.PREDIX_GLOBAL_CONFIG.PREDIX_WEBSOCKER_RIVER    = data.PREDIX_WEBSOCKER_RIVER;
        this.predixConfigurationData.PREDIX_GLOBAL_CONFIG.PROXY_CONFIGURATION       = data.PROXY_CONFIGURATION;
        
        // Validate PredixGlobalConfig Step in Workflow
        this.workflowService.validateStep(STEPS.predixGlobalConfig);
        
    }
    
    // Return the PredixGlobalConfig data
    getPredixCloudConfig(): PredixCloudConfig {
        
        let predixCloudConfig = new PredixCloudConfig();
    
        predixCloudConfig.TIMESERIES_ZONE_ID   = this.predixConfigurationData.PREDIX_CLOUD_CONFIG.TIMESERIES_ZONE_ID;
        predixCloudConfig.URL_OAUTH_TOKEN      = this.predixConfigurationData.PREDIX_CLOUD_CONFIG.URL_OAUTH_TOKEN;
        predixCloudConfig.APP_CLIENT_ID        = this.predixConfigurationData.PREDIX_CLOUD_CONFIG.APP_CLIENT_ID;
        predixCloudConfig.APP_CLIENT_SECRET    = this.predixConfigurationData.PREDIX_CLOUD_CONFIG.APP_CLIENT_SECRET;
        predixCloudConfig.PROXY_HOST           = this.predixConfigurationData.PREDIX_CLOUD_CONFIG.PROXY_HOST;
        predixCloudConfig.PROXY_EXCEPTIONS     = this.predixConfigurationData.PREDIX_CLOUD_CONFIG.PROXY_EXCEPTIONS;
        
        return predixCloudConfig;
        
    }
    
    // Set the PredixGlobalConfig data
    setPredixCloudConfig(data: PredixCloudConfig) {
        
        // Update the PredixGlobalConfig data only when the PredixGlobalConfig Form had been validated successfully
        this.isPredixCloudConfigValid = true;
        
        this.predixConfigurationData.PREDIX_CLOUD_CONFIG.TIMESERIES_ZONE_ID = data.TIMESERIES_ZONE_ID;
        this.predixConfigurationData.PREDIX_CLOUD_CONFIG.URL_OAUTH_TOKEN    = data.URL_OAUTH_TOKEN;
        this.predixConfigurationData.PREDIX_CLOUD_CONFIG.APP_CLIENT_ID      = data.APP_CLIENT_ID;
        this.predixConfigurationData.PREDIX_CLOUD_CONFIG.APP_CLIENT_SECRET  = data.APP_CLIENT_SECRET;
        this.predixConfigurationData.PREDIX_CLOUD_CONFIG.PROXY_HOST         = data.PROXY_HOST;
        this.predixConfigurationData.PREDIX_CLOUD_CONFIG.PROXY_EXCEPTIONS   = data.PROXY_EXCEPTIONS;
        
        // Validate PredixGlobalConfig Step in Workflow
        this.workflowService.validateStep(STEPS.predixCloudConfig);
        
    }
    
    // Return the TagMappingSchema data
    getTagMappingSchema(): TagMappingSchema {
        
        return this.predixConfigurationData.TAG_MAPPING_SCHEMA;
        
    }
    
    // Set the TagMappingSchema data
    setTagMappingSchema(data: TagMappingSchema) {
        
        // Update the PredixGlobalConfig data only when the PredixGlobalConfig Form had been validated successfully
        this.isTagMappingSchemaValid = true;
        
        this.predixConfigurationData.TAG_MAPPING_SCHEMA = data;
        
        // Validate PredixGlobalConfig Step in Workflow
        this.workflowService.validateStep(STEPS.tagMappingSchema);
        
    }
    
    getPredixConfigurationData() {
        return this.predixConfigurationData;
    }
    
    resetPredixConfigurationData(): PredixConfigurationData {

        // Reset the workflow
        this.workflowService.resetSteps();

        // Return the form data after all this.* members had been reset
        this.predixConfigurationData.clear();
        this.isIgsConfigValid = this.isPredixGlobalConfigValid = this.isTagMappingSchemaValid = false;

        return this.predixConfigurationData;
    }
    
    isPredixConfigurationDataValid() {

        // Return true if all forms had been validated successfully; otherwise, return false
        return this.isIgsConfigValid && this.isPredixGlobalConfigValid && this.isTagMappingSchemaValid;

    }

}