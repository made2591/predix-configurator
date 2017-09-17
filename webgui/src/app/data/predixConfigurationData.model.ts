export class PredixConfigurationData {
    
    GLOBAL_CONFIG: GlobalConfig                 = new GlobalConfig();
    IGS_CONFIG: IgsConfig                       = new IgsConfig();
    PREDIX_GLOBAL_CONFIG: PredixGlobalConfig    = new PredixGlobalConfig();
    PREDIX_CLOUD_CONFIG: PredixCloudConfig      = new PredixCloudConfig();
    PREDIX_MACHINE_CONFIG: PredixMachineConfig  = new PredixMachineConfig();
    TAG_MAPPING_SCHEMA:
        { [TAG_MAPPING_SCHEMA_NAME: string] :
            MappingSchema; }                    = {};
    SITES: { [SITE_NAME: string] :
        MachineGroup; }                         = {};
    
    setDefault() {

        this.GLOBAL_CONFIG          = new GlobalConfig();
        this.IGS_CONFIG             = new IgsConfig();
        this.PREDIX_GLOBAL_CONFIG   = new PredixGlobalConfig();
        this.PREDIX_CLOUD_CONFIG    = new PredixCloudConfig();
        this.PREDIX_MACHINE_CONFIG  = new PredixMachineConfig();
    
        this.GLOBAL_CONFIG.setDefault();
        this.IGS_CONFIG.setDefault();
        this.PREDIX_GLOBAL_CONFIG.setDefault();
        this.PREDIX_CLOUD_CONFIG.setDefault();
        this.PREDIX_MACHINE_CONFIG.setDefault();
        this.SITES = {};
        this.TAG_MAPPING_SCHEMA = {};

    }
    
    clear() {
        this.GLOBAL_CONFIG          = new GlobalConfig();
        this.IGS_CONFIG             = new IgsConfig();
        this.PREDIX_GLOBAL_CONFIG   = new PredixGlobalConfig();
        this.PREDIX_CLOUD_CONFIG    = new PredixCloudConfig();
        this.PREDIX_MACHINE_CONFIG  = new PredixMachineConfig();
        this.SITES                  = {};
        this.TAG_MAPPING_SCHEMA     = {};
    }
    
}

export class GlobalConfig {
    
    OUTPUT_DIR: string = '';
    
    setDefault() {
        this.OUTPUT_DIR = './config/';
    }
        
    clear() {
        this.OUTPUT_DIR = '';
    }
    
}

export class IgsConfig {
    SERVER_URI: string          = '';
    APP_URI : string            = '';
    PRODUCT_URI: string         = '';
    NAMESPACE_INDEX: string     = '';
    
    setDefault() {
        this.SERVER_URI         = '1';
        this.APP_URI            = '2';
        this.PRODUCT_URI        = '3';
        this.NAMESPACE_INDEX    = '4';
    }
    
    clear() {
        this.SERVER_URI         = '';
        this.APP_URI            = '';
        this.PRODUCT_URI        = '';
        this.NAMESPACE_INDEX    = '';
    }

}

export class PredixGlobalConfig {
    GLOBAL_CONFIG_SUFFIX: string    = '';
    DATATYPE_CONFIG_SUFFIX: string  = '';
    OPCUA_DATANODES: string         = '';
    HOOVER_SPILLWAY: string         = '';
    PREDIX_CLOUD_IDENTITY: string   = '';
    PREDIX_WEBSOCKER_RIVER: string  = '';
    PROXY_CONFIGURATION: string     = '';
    
    setDefault() {
        this.GLOBAL_CONFIG_SUFFIX   = '.config';
        this.DATATYPE_CONFIG_SUFFIX = '.xml';
        this.OPCUA_DATANODES        = 'com.ge.dspmicro.machineadapter.opcua-0';
        this.HOOVER_SPILLWAY        = 'com.ge.dspmicro.hoover.spillway-0';
        this.PREDIX_CLOUD_IDENTITY  = 'com.ge.dspmicro.predixcloud.identity';
        this.PREDIX_WEBSOCKER_RIVER = 'com.ge.dspmicro.websocketriver.send-0';
        this.PROXY_CONFIGURATION    = 'org.apache.http.proxyconfigurator-0';
    }
    
    clear() {
        this.GLOBAL_CONFIG_SUFFIX   = '';
        this.DATATYPE_CONFIG_SUFFIX = '';
        this.OPCUA_DATANODES        = '';
        this.HOOVER_SPILLWAY        = '';
        this.PREDIX_CLOUD_IDENTITY  = '';
        this.PREDIX_WEBSOCKER_RIVER = '';
        this.PROXY_CONFIGURATION    = '';
    }
    
}

export class PredixCloudConfig {
    
    TIMESERIES_ZONE_ID: string          = '';
    URL_OAUTH_TOKEN: string             = '';
    APP_CLIENT_ID: string               = '';
    APP_CLIENT_SECRET: string           = '';
    PROXY_HOST: string                  = '';
    PROXY_EXCEPTIONS : Array<string>    = [];

    setDefault() {
        this.TIMESERIES_ZONE_ID = '5';
        this.URL_OAUTH_TOKEN    = '6';
        this.APP_CLIENT_ID      = '7';
        this.APP_CLIENT_SECRET  = '8';
        this.PROXY_HOST         = '9';
        this.PROXY_EXCEPTIONS	= [];
    }
    
    clear() {
        this.TIMESERIES_ZONE_ID = '';
        this.URL_OAUTH_TOKEN    = '';
        this.APP_CLIENT_ID      = '';
        this.APP_CLIENT_SECRET  = '';
        this.PROXY_HOST         = '';
        this.PROXY_EXCEPTIONS   = [];
    }
    
}

interface FILE {
    CONTENT:    string;
    CONFIG:     string;
}

export class PredixMachineConfig {
    
    DATA_SUBSCRIPTIONS_NAME: string         = 'OPCUA_Subscription_1';
    FILES: { [FILE_NAME: string] : FILE; }  = {};
    
    constructor() {
        this.FILES["com.ge.dspmicro.machineadapter.opcua-0"]    =
            {
                CONTENT: "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><OPCUAMachineAdapterConfig>\n  <OPCUAClientConfig>\n    <AppName>PredixMachine_OPCUAAdapter</AppName>\n    <ServerUri>SERVER_URI</ServerUri>\n    <AppUri>APP_URI</AppUri>\n    <ProductUri>PRODUCT_URI</ProductUri>\n  </OPCUAClientConfig>\n\n  <DataNodeConfigs>DATA_NODES_CONFIG\n</DataNodeConfigs>\n\n<DataSubscriptionConfigs>\n  <DataSubscriptionConfig pattern=\"Pull\">\n  <Name>DATA_SUBSCRIPTIONS_NAME</Name>\n  <TimestampOrigin>Source</TimestampOrigin>\n  <PublishingInterval>1000</PublishingInterval>DATA_SUBSCRIPTIONS_CONFIG    </DataSubscriptionConfig>\n  </DataSubscriptionConfigs>\n</OPCUAMachineAdapterConfig>",
                CONFIG: "#\n# \n# Copyright (c) 2012-2016 General Electric Company. All rights reserved.\n#\n# The copyright to the computer software herein is the property of\n# General Electric Company. The software may be used and/or copied only\n# with the written permission of General Electric Company or in accordance\n# with the terms and conditions stipulated in the agreement/contract\n# under which the software has been supplied.\n#\n\n\n#\n# Predix Machine - 16.4.1\n#\n# Configuration properties for the Predix Machine OPC-UA Machine Adapter\n#\n# Service_PID = com.ge.dspmicro.machineadapter.opcua\n#\n\n\n# Usage: \n# \n#       Properties set in this file may use the full property\n#       name. For example:\n#                  \n#             <service_pid>.<property_key>=<property_value>\n\n\n\n# Note: \n#\n#       Properties in configuration files are subject to a delay\n#       as they rely on the config-admin and fileinstall bundles.\n#\n# Format: \n#       type character followed by a quoted string representation of value. \n#          e.g a boolean -  property=B\"true\"\n#       Lowercase type character implies primitives. Type can be omitted for String.\n#       Types:\n#           T = String            I = Integer            L = Long\n#           F = Float             D = Double             X = Byte\n#           S = Short             C = Character          B = Boolean\n#\n#       Array format is property=<type>[\"<value1>\",\"<value2>\"]. \n#           e.g. array of int - property=i[\"1\", \"2\", \"3\"]\n#       A backslash may be used to break up the line for clarity.\n\n#\n# Adapter Config File\n# Set the configuration file to start this adapter: configuration/machine/com.ge.dspmicro.machineadapter.opcua-0.xml\ncom.ge.dspmicro.machineadapter.opcua.configFile=\"OPCUA_DATANODES\"\n\n# Human readable name of the adapter\ncom.ge.dspmicro.machineadapter.opcua.name=\"PredixMachine_OPCUAAdapter\"\n\n# Human readable description of the adapter\ncom.ge.dspmicro.machineadapter.opcua.description=\"Supports basic read/write capability from OPC-UA nodes. Supports subscription to a group of OPC-UA nodes.\"\n\n# Security Mode for connecting to the OPC UA Server. Possible values are: \n#   NONE\n#   BASIC128RSA15_SIGN\n#   BASIC128RSA15_SIGN_ENCRYPT\n#   BASIC256_SIGN\n#   BASIC256_SIGN_ENCRYPT\n#   BASIC256SHA256_SIGN\n#   BASIC256SHA256_SIGN_ENCRYPT\ncom.ge.dspmicro.machineadapter.opcua.security.mode=\"NONE\"\n\n######################################################################################################\n# The following 4 settings relate to the keystore containing OPC-UA keypair used for TLS. \n# The trust store is used when the security mode is not set to NONE.\n\n# Keystore path (relative to Predix Machine root)\ncom.ge.dspmicro.machineadapter.opcua.keystore.path=\"security/opcua_keystore.jks\"\n\n# Keystore type\ncom.ge.dspmicro.machineadapter.opcua.keystore.type=\"JKS\"\n\n# Password for the keystore. Value is automatically encrypted on the first ever run of the adapter and cleared.\ncom.ge.dspmicro.machineadapter.opcua.keystore.password=\"\"\n\n# The encrypted keystore password. This value must be left blank for the container to populate with the encrypted password. \ncom.ge.dspmicro.machineadapter.opcua.keystore.password.encrypted=\"bimBIN6fiq7AtoC0/llq4p6SK82AfJm18e7m7cIbIyc\\=\"\n\n######################################################################################################\n# The following three setting relate to the alias referencing entry in keystore to use for TLS\n\n# The alias for the keystore entry\ncom.ge.dspmicro.machineadapter.opcua.key.alias=\"dspmicro\"\n\n# Password for the alias. Value is automatically encrypted on the first ever run of the adapter and cleared.\ncom.ge.dspmicro.machineadapter.opcua.key.password=\"\"\n\n# The encrypted password for the alias. This value must be left blank for the container to populate with the encrypted password. \ncom.ge.dspmicro.machineadapter.opcua.key.password.encrypted=\"sPkZFqH6k/V2jXAoBDdZQQdNQTP/hQ+6YjT8rv8gCB4\\=\"\n\n######################################################################################################\n# The following four settings relate to the trust store where certificates of trusted OPCUA Servers that \n# this adapter may connect to are stored. The trust store is used when the security mode is not set to NONE.\n\n# Truststore path (relative to Predix Machine root)\ncom.ge.dspmicro.machineadapter.opcua.truststore.path=\"security/machinegateway_truststore.jks\"\n\n# Truststore type \ncom.ge.dspmicro.machineadapter.opcua.truststore.type=\"JKS\"\n\n# Password for truststore access. Value is automatically encrypted on the first ever run of the adapter and cleared.\ncom.ge.dspmicro.machineadapter.opcua.truststore.password=\"\"\n\n# The encrypted truststore password. This value must be left blank for the container to populate with the encrypted password. \ncom.ge.dspmicro.machineadapter.opcua.truststore.password.encrypted=\"HdftuQRyYZgGs4k951j4qweZiaXwBFE9RfUb1vcAZ2c\\=\"\n\n######################################################################################################\n# The following three settings relate to OPCUA server user authentication.\n\n# The user name for server authentication\ncom.ge.dspmicro.machineadapter.opcua.server.username=\"testuser\"\n\n# The password for the user. Value is automatically encrypted on the first ever run of the adapter and cleared.\ncom.ge.dspmicro.machineadapter.opcua.server.password=\"\"\n\n# The encrypted server password. This value must be left blank for the container to populate with the encrypted password. \ncom.ge.dspmicro.machineadapter.opcua.server.password.encrypted=\"gUmnbR4be6TCOeNLHVSYrE5wgyUUhXj30w/sXJwErB0\\=\"\n\n######################################################################################################\n\n# The adapter will continuously check and if necessary attempt to restore the connection to the OPCUA server based \n# on the interval setting. (SECONDS)\ncom.ge.dspmicro.machineadapter.opcua.connection.check.interval=I\"5\"\n\n# Upon detecting a loss of connection to the OPCUA server during the regular check as defiend by the interval above,\n# the adapter will invalidate all the nodes in subscriptions by setting the data quality to BAD. This setting controls\n# when that should happen. A value of -1 (default) disables invalidation. Otherwise, it is the number of times the connection\n# check may fail before the data is invalidated. \ncom.ge.dspmicro.machineadapter.opcua.invalidation.retries=I\"-1\"\n\n# The session name that this adapter will use when connecting to the OPCUA server. This ensures that multiple \n# uses of the same adapter will not cause the server to create different session names - which is a resource that \n# is limited by some systems. The adapter will populate the value on initial run with the adapter name and a unique number.\ncom.ge.dspmicro.machineadapter.opcua.server.session.name=\"OPC-UA Machine Adapter-189228865392433\"\n"
            };
        this.FILES["com.ge.dspmicro.hoover.spillway-0"]         =
            {
                CONTENT: "#\n# \n# Copyright (c) 2012-2016 General Electric Company. All rights reserved.\n#\n# The copyright to the computer software herein is the property of\n# General Electric Company. The software may be used and/or copied only\n# with the written permission of General Electric Company or in accordance\n# with the terms and conditions stipulated in the agreement/contract\n# under which the software has been supplied.\n#\n\n\n#\n# Predix Machine - 16.4.0\n#\n# Configuration properties for the Predix Machine Spillway service\n#\n# Service_PID = com.ge.dspmicro.hoover.spillway\n#\n\n\n# Usage: \n# \n#       Properties set in this file may use the full property\n#       name. For example:\n#                  \n#             <service_pid>.<property_key>=<property_value>\n\n\n\n# Note: \n#\n#       Properties in configuration files are subject to a delay\n#       as they rely on the config-admin and fileinstall bundles.\n#\n# Format: \n#       type character followed by a quoted string representation of value. \n#          e.g a boolean -  property=B\"true\"\n#       Lowercase type character implies primitives. Type can be omitted for String.\n#       Types:\n#           T = String            I = Integer            L = Long\n#           F = Float             D = Double             X = Byte\n#           S = Short             C = Character          B = Boolean\n#\n#       Array format is property=<type>[\"<value1>\",\"<value2>\"]. \n#           e.g. array of int - property=i[\"1\", \"2\", \"3\"]\n#       A backslash may be used to break up the line for clarity.\n\n#\n# Add properties here\n#\n\n# [Required] A friendly and unique name of the spillway.\ncom.ge.dspmicro.hoover.spillway.name=\"DefaultSpillway\"\n\n# [Optional] A brief description of the spillway.\ncom.ge.dspmicro.hoover.spillway.description=\"Simple modbus and opcua spillway\"\n\n# [Required] An array of data subscriptions where the data will come from  \ncom.ge.dspmicro.hoover.spillway.dataSubscriptions=[ \\ \n  DATA_SUBSCRIPTIONS_NAME  ]\n  \n# [Optional] An array of data subscriptions where the data will come from  \n com.ge.dspmicro.hoover.spillway.edgeDataSubscriptions=[ \\n  \"sampleEdgeTopic\", \\n ] \n\n# [Required] Destination Data River name to where the data will be sent.\n# Change to the Data River by replacing the value with: Sender Service\ncom.ge.dspmicro.hoover.spillway.destination=\"Http Sender Service\"\n\n# [Optional] Type name of data processing logic defined in Processor.\ncom.ge.dspmicro.hoover.spillway.processType=\"\"\n\n# [Optional] Type name of StoreForward associated with this spillway.\ncom.ge.dspmicro.hoover.spillway.storeforward=\"DefaultStoreForward\"\n\n\n",
                CONFIG: ""
            };
        this.FILES["com.ge.dspmicro.predixcloud.identity"]      =
            {
                CONTENT: "#\n# \n# Copyright (c) 2012-2016 General Electric Company. All rights reserved.\n#\n# The copyright to the computer software herein is the property of\n# General Electric Company. The software may be used and/or copied only\n# with the written permission of General Electric Company or in accordance\n# with the terms and conditions stipulated in the agreement/contract\n# under which the software has been supplied.\n#\n\n\n#\n# Predix Machine - 16.4.1\n#\n# Configuration properties for the Predix Machine http client service\n#\n# Service_PID = com.ge.dspmicro.predixcloud.identity\n#\n\n\n# Usage: \n# \n#       Properties set in this file may use the full property\n#       name. For example:\n#                  \n#             <service_pid>.<property_key>=<property_value>\n\n\n\n# Note: \n#\n#       Properties in configuration files are subject to a delay\n#       as they rely on the config-admin and fileinstall bundles.\n#\n# Format: \n#       type character followed by a quoted string representation of value. \n#          e.g a boolean -  property=B\"true\"\n#       Lowercase type character implies primitives. Type can be omitted for String.\n#       Types:\n#           T = String            I = Integer            L = Long\n#           F = Float             D = Double             X = Byte\n#           S = Short             C = Character          B = Boolean\n#\n#       Array format is property=<type>[\"<value1>\",\"<value2>\"]. \n#           e.g. array of int - property=i[\"1\", \"2\", \"3\"]\n#       A backslash may be used to break up the line for clarity.\n\n#\n# [Required] Required if using Predix Cloud Http Client\n# Options:\n#   CLIENT_CREDENTIALS - use client credentials grant type to authenticate. Requires clientid and clientsecret\n#   JWT - use JWT authorization grant. Requires clientid and a device certificate obtained through certificate enrollment\n#\ncom.ge.dspmicro.predixcloud.identity.oauth.authmode=\"CLIENT_CREDENTIALS\"\n\n#\n# [Required] The Predix cloud URL of an OAuth2 authorization endpoint. This is the UAA URL for \n# the technician to log into the cloud.\n#\ncom.ge.dspmicro.predixcloud.identity.oauth.authorize.url=\"\"\n\n#\n# [Required] Predix Cloud enrollment endpoint url\n#\ncom.ge.dspmicro.predixcloud.identity.uaa.enroll.url=\"\"\n\n#\n# [Required] Predix Cloud UAA token endpoint\n#\ncom.ge.dspmicro.predixcloud.identity.uaa.token.url=\"URL_OAUTH_TOKEN\"\n\n#\n# Predix Cloud UAA client credentials\n#\ncom.ge.dspmicro.predixcloud.identity.uaa.clientid=\"APP_CLIENT_ID\"\ncom.ge.dspmicro.predixcloud.identity.uaa.clientsecret=\"APP_CLIENT_SECRET\"\ncom.ge.dspmicro.predixcloud.identity.uaa.clientsecret.encrypted=\"\"\n\n#\n# Predix device identity.\n# deviceid must contain only lower case letters (a-z), numbers (0-9), and : - _. Must begin with a letter or number.\n#\ncom.ge.dspmicro.predixcloud.identity.deviceid=\"\"\n# [Required if using JWT AuthMode] Predix cloud internal device id\ncom.ge.dspmicro.predixcloud.identity.asdid=\"\"\ncom.ge.dspmicro.predixcloud.identity.tenantid=\"\"\n\n#\n# [Required if using JWT AuthMode] Predix device MAC address used to pin certificate to device. \n# Acceptable formats are 6 bytes of case insensitive hex with each byte separated by ':','-' or none\n#   example: xx:xx:xx:xx:xx:xx or xx-xx-xx-xx-xx-xx or XxXxXxXxXxXx   \n#\ncom.ge.dspmicro.predixcloud.identity.mac=\"f0-d5-bf-4e-fa-6b\"\n\n#\n# [Optional] Predix cloud upload URL - This is used for uploading configuration command from the device.\n# The device id will be appended automatically to the end of the URL if not set.\n# When the device is enrolled this value will be set automatically. \n#\ncom.ge.dspmicro.predixcloud.identity.cloud.upload.url=\"\"\n\n#\n# [Optional] Predix cloud Yeti signature URL - The cloud service for validating install packages.\n# When the device is enrolled this value will be set automatically. \n#\ncom.ge.dspmicro.predixcloud.identity.yeti.signature.url=\"\"\n\n# \n# [Required if using JWT AuthMode] Shared secret required for certificate based enrollment.\n#\ncom.ge.dspmicro.predixcloud.identity.enroll.sharedSecret=\"\"\ncom.ge.dspmicro.predixcloud.identity.enroll.sharedSecret.encrypted=\"\"\n",
                CONFIG: ""
            };
        this.FILES["com.ge.dspmicro.websocketriver.send-0"]     =
            {
                CONTENT: "#\n# \n# Copyright (c) 2012-2016 General Electric Company. All rights reserved.\n#\n# The copyright to the computer software herein is the property of\n# General Electric Company. The software may be used and/or copied only\n# with the written permission of General Electric Company or in accordance\n# with the terms and conditions stipulated in the agreement/contract\n# under which the software has been supplied.\n#\n\n\n#\n# Predix Machine - 16.4.1\n#\n# Configuration properties for the Predix Machine WebSocket River Send service\n#\n# Service_PID = com.ge.dspmicro.websocketriver.send\n#\n\n\n# Usage: \n# \n#       Properties set in this file may use the full property\n#       name. For example:\n#                  \n#             <service_pid>.<property_key>=<property_value>\n\n\n\n# Note: \n#\n#       Properties in configuration files are subject to a delay\n#       as they rely on the config-admin and fileinstall bundles.\n#\n# Format: \n#       type character followed by a quoted string representation of value. \n#          e.g a boolean -  property=B\"true\"\n#       Lowercase type character implies primitives. Type can be omitted for String.\n#       Types:\n#           T = String            I = Integer            L = Long\n#           F = Float             D = Double             X = Byte\n#           S = Short             C = Character          B = Boolean\n#\n#       Array format is property=<type>[\"<value1>\",\"<value2>\"]. \n#           e.g. array of int - property=i[\"1\", \"2\", \"3\"]\n#       A backslash may be used to break up the line for clarity.\n\n\n# [Required] A friendly and unique name of the WebSocket River.\ncom.ge.dspmicro.websocketriver.send.river.name=\"WS Sender Service\"\n\n# [Required] The URL of the WebSocket server to send to. Must begin with ws:// or wss://\ncom.ge.dspmicro.websocketriver.send.destination.url=\"wss://gateway-predix-data-services.run.aws-usw02-pr.ice.predix.io/v1/stream/messages\"\n\n# [Required] The name of the header where the zone ID will be inserted\ncom.ge.dspmicro.websocketriver.send.header.zone.name=\"Predix-Zone-Id\"\n\n# [Required] The zone ID for the TimeSeries service instance\ncom.ge.dspmicro.websocketriver.send.header.zone.value=\"TIMESERIES_ZONE_ID\"\n\n# [Required] The timeout in milliseconds to wait for a response before assuming a transfer has failed \ncom.ge.dspmicro.websocketriver.send.timeout=I\"10000\"\n\n# [Optional] Whether to use Gzip compression for data sent to Predix Timeseries\ncom.ge.dspmicro.websocketriver.send.compressed=B\"true\"\n\n# [Optional] Memory limit (in bytes) for send buffers \n# The maximum memory to allocate for send buffers for this river. Set to 0 for no limit. \n# Messages that would exceed the memory limit will be discarded.\ncom.ge.dspmicro.websocketriver.send.memory.limit=L\"0\"\n",
                CONFIG: ""
            };
        this.FILES["org.apache.http.proxyconfigurator-0"]       =
            {
                CONTENT: "# The network name of the proxy host.\nproxy.host=\"PROXY_HOST\"\n\n# The port on the proxy server where the proxy service is available\nproxy.port=I\"80\"\n\n# Whether the proxy settings are enabled. This is only a hint to the using\n# services set by admin. It has no bearing on the actual server's availability \nproxy.enabled=\"true\"\n\n# A list of server names, ip addresses or domains, for which a proxy is NOT needed for access.\n# Domain names in the exception list start with the dot. e.g. .server.company.com\nproxy.exceptions=[ \\ \nPROXY_EXCEPTIONS\n]\n\n# The user name for authenticating into the proxy server if required\n#proxy.user=\"\"\n\n# The password for the proxy server\n#proxy.password=\"\"",
                CONFIG: ""
            };
    }
    
    setDefault() {}
    
    clear() {
        this.DATA_SUBSCRIPTIONS_NAME = '';
        this.FILES = {};
    }
    
}

export class Machine {
    PCU: string;
    IP: string;
    NAT: string;
    INFO: string;
    PROTOCOL: string;
    LOCAL_ENABLE_SETUP: string;
    LOCAL_TAG_MAPPING_SCHEMA: string;
}

export class MachineGroup {
    
    GLOBAL_TAG_MAPPING_SCHEMA: string;
    GLOBAL_ENABLE_SETUP: boolean;
    GLOBAL_PREFIX: string;
    MACHINES: { [MACHINE_PLATE: string] : Machine; } = {};
    
    setDefault() {}
    
    clear() {
        this.GLOBAL_TAG_MAPPING_SCHEMA = "";
        this.GLOBAL_ENABLE_SETUP = false;
        this.GLOBAL_PREFIX = "";
        this.MACHINES = {};
    }
    
}

export class MappingSchema {
    
    CHANNEL_PREFIX: string;
    MAPPING: { [TAG_FROM: string] : string; }  = {};
    
    setDefault() {
        this.CHANNEL_PREFIX = '';
        this.MAPPING = {};
    }
    
    getElementWithKey(key) {
        return null || this.MAPPING[key];
    }
    
    clear() {
        this.CHANNEL_PREFIX = '';
        this.MAPPING = {};
    }
    
}