#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json, os, pickle
from lxml import etree

JSON_CONFIG_FILE = "predixConfigGenerator.json"
JSON_CONFIG_DATA = json.loads(open(JSON_CONFIG_FILE).read())

def prepareProxyPredixMachineConfigurationFile(content, config = JSON_CONFIG_DATA):
	content = content.replace("PROXY_HOST",		   config['PREDIX_CLOUD_CONFIG']['PROXY_HOST'])
	exceptions = ""
	for exception in config['PREDIX_CLOUD_CONFIG']['PROXY_EXCEPTIONS']:
		exceptions += "\""+exception+"\", \ \n"
	content = content.replace("PROXY_EXCEPTIONS", exceptions)
	return content

def prepareWebSocketRiverPredixMachineConfigurationFile(content, config = JSON_CONFIG_DATA):
	content = content.replace("TIMESERIES_ZONE_ID", 	   config['PREDIX_CLOUD_CONFIG']['TIMESERIES_ZONE_ID'])
	return content

def preparePredixCloudIdentityConfigurationFile(content, config = JSON_CONFIG_DATA):
	content = content.replace("URL_OAUTH_TOKEN",   config['PREDIX_CLOUD_CONFIG']['URL_OAUTH_TOKEN'])
	content = content.replace("APP_CLIENT_ID",     config['PREDIX_CLOUD_CONFIG']['APP_CLIENT_ID'])
	content = content.replace("APP_CLIENT_SECRET", config['PREDIX_CLOUD_CONFIG']['APP_CLIENT_SECRET'])
	return content

def prepareHooverSpillwayPredixMachineConfigurationFile(content, config = JSON_CONFIG_DATA):
	content = content.replace("DATA_SUBSCRIPTIONS_NAME", "\""+config['PREDIX_MACHINE_CONFIG']['DATA_SUBSCRIPTIONS_NAME']+"\", \ \n")
	return content

def prepareOpcuaPredixMachineConfigurationFile(content, config = JSON_CONFIG_DATA):
	content = content.replace("OPCUA_DATANODES", 
		config['PREDIX_GLOBAL_CONFIG']['OPCUA_DATANODES']+config['PREDIX_GLOBAL_CONFIG']['DATATYPE_CONFIG_SUFFIX']
	)
	return content

def prepareOpcuaPredixMachineConfigurationFileStruct(content, config = JSON_CONFIG_DATA):
	content = content.replace("SERVER_URI", config['IGS_CONFIG']['SERVER_URI'])
	content = content.replace("APP_URI", config['IGS_CONFIG']['APP_URI'])
	content = content.replace("PRODUCT_URI", config['IGS_CONFIG']['PRODUCT_URI'])
	return content

def prepareOpcuaPredixMachineConfigurationFileDatanodesConfig(content, groupInfo, config = JSON_CONFIG_DATA):

	DATA_NODES_CONFIG = ""
	DATA_SUBSCRIPTIONS_CONFIG = ""

	# for each machine in groupInfo
	for machinePlate, machineInfo in groupInfo['MACHINES'].iteritems():

		# if machine setup is enabled
		if machineInfo['LOCAL_ENABLE_SETUP']:

			# define tagMapping schema
			tagMappingSchema = groupInfo['GLOBAL_TAG_MAPPING_SCHEMA']

			# if specific mapping schema is defined use it
			if "LOCAL_TAG_MAPPING_SCHEMA" in machineInfo.keys():
				
				tagMappingSchema = machineInfo['LOCAL_TAG_MAPPING_SCHEMA']

			DATA_NODES_CONFIG += "\n\n    <!-- "+config['TAG_MAPPING_SCHEMA'][tagMappingSchema]['CHANNEL_PREFIX']+" "+groupInfo['GLOBAL_PREFIX']+machinePlate+" -->\n"
			DATA_SUBSCRIPTIONS_CONFIG += "\n\n    <!-- "+config['TAG_MAPPING_SCHEMA'][tagMappingSchema]['CHANNEL_PREFIX']+" "+groupInfo['GLOBAL_PREFIX']+machinePlate+" -->\n"

			# for each tag defined
			for predixTag, IGS_CONFIGTag in config['TAG_MAPPING_SCHEMA'][tagMappingSchema]['MAPPING'].iteritems():

				DATA_NODES_CONFIG += """    <DataNode>
      <Name>"""+groupInfo['GLOBAL_PREFIX']+machinePlate+"."+predixTag+"""</Name>
      <StringId>"""+config['IGS_CONFIG']['NAMESPACE_INDEX']+":"+ \
config['TAG_MAPPING_SCHEMA'][tagMappingSchema]['CHANNEL_PREFIX']+ \
machinePlate+"."+machineInfo['PCU']+"."+IGS_CONFIGTag+"""</StringId>
    </DataNode>\n"""

				DATA_SUBSCRIPTIONS_CONFIG += """    <DataNode>
      <Name>"""+groupInfo['GLOBAL_PREFIX']+machinePlate+"."+predixTag+"""</Name>
    </DataNode>\n"""

	return DATA_NODES_CONFIG, DATA_SUBSCRIPTIONS_CONFIG

def prepareOpcuaPredixMachineFinalConfigurationFileDatanodesConfig(content, nodes, descs, config = JSON_CONFIG_DATA):

	# replace configuration for each MACHINES
	content = content.replace("DATA_NODES_CONFIG", nodes+"\n")
	content = content.replace("DATA_SUBSCRIPTIONS_NAME", config['PREDIX_MACHINE_CONFIG']['DATA_SUBSCRIPTIONS_NAME'])
	content = content.replace("DATA_SUBSCRIPTIONS_CONFIG", descs+"\n")
	root = etree.fromstring(content.encode('utf-8'))

	return etree.tostring(root, pretty_print=True)


def createFile(filename, content):
	f = open(filename, 'wb')
	f.write(content)
	f.close()

GLOBAL_DATA_NODES_CONFIG = ""
GLOBAL_DATA_SUBSCRIPTIONS_CONFIG = ""
dummy = ""

# for each SITES defined in configuration file
for siteName, sitesGroups in JSON_CONFIG_DATA['SITES'].iteritems():
	
	# for each group of MACHINES defined in specific SITES
	for groupName, groupInfo in sitesGroups.iteritems():

		# if global group setup is true
		if groupInfo['GLOBAL_ENABLE_SETUP']:

			#####################################################################################################################
			#####################################################################################################################

			# OPCUA_DATANODES (XML)
			#####################################################################################################################

			# STEP 2: create configuration file content - prepare header of file
			DATA_NODES_CONFIG, DATA_SUBSCRIPTIONS_CONFIG = \
				prepareOpcuaPredixMachineConfigurationFileDatanodesConfig(dummy, groupInfo)

			GLOBAL_DATA_NODES_CONFIG += DATA_NODES_CONFIG
			GLOBAL_DATA_SUBSCRIPTIONS_CONFIG += DATA_SUBSCRIPTIONS_CONFIG

# OPCUA_DATANODES (XML)
#####################################################################################################################

# STEP 1: create configuration file content - prepare header of file
dummy = \
	prepareOpcuaPredixMachineConfigurationFileStruct(
		JSON_CONFIG_DATA['PREDIX_MACHINE_CONFIG'][JSON_CONFIG_DATA['PREDIX_GLOBAL_CONFIG']['OPCUA_DATANODES']]['CONTENT']
	)

# STEP 2: create configuration file content - prepare header of file
dummy = \
	prepareOpcuaPredixMachineFinalConfigurationFileDatanodesConfig(dummy, GLOBAL_DATA_NODES_CONFIG, GLOBAL_DATA_SUBSCRIPTIONS_CONFIG)

# STEP 3: save file
createFile(JSON_CONFIG_DATA['GLOBAL_CONFIG']['OUTPUT_DIR']+JSON_CONFIG_DATA['PREDIX_GLOBAL_CONFIG']['OPCUA_DATANODES']+
							 JSON_CONFIG_DATA['PREDIX_GLOBAL_CONFIG']['DATATYPE_CONFIG_SUFFIX'], 
							 dummy)

# OPCUA_DATANODES (CONFIG)
#####################################################################################################################

# STEP 1: create configuration file content - prepare file
dummy = \
	prepareOpcuaPredixMachineConfigurationFile(
		JSON_CONFIG_DATA['PREDIX_MACHINE_CONFIG'][JSON_CONFIG_DATA['PREDIX_GLOBAL_CONFIG']['OPCUA_DATANODES']]['CONFIG']
	)

# STEP 2 save file
createFile(JSON_CONFIG_DATA['GLOBAL_CONFIG']['OUTPUT_DIR']+JSON_CONFIG_DATA['PREDIX_GLOBAL_CONFIG']['OPCUA_DATANODES']+
							 JSON_CONFIG_DATA['PREDIX_GLOBAL_CONFIG']['GLOBAL_CONFIG_SUFFIX'], 
							 dummy)

# HOOVER_SPILLWAY
#####################################################################################################################

# STEP 1: create configuration file content - prepare file
dummy = \
	prepareHooverSpillwayPredixMachineConfigurationFile(
		JSON_CONFIG_DATA['PREDIX_MACHINE_CONFIG'][JSON_CONFIG_DATA['PREDIX_GLOBAL_CONFIG']['HOOVER_SPILLWAY']]['CONTENT']
	)

# STEP 2 save file
createFile(JSON_CONFIG_DATA['GLOBAL_CONFIG']['OUTPUT_DIR']+JSON_CONFIG_DATA['PREDIX_GLOBAL_CONFIG']['HOOVER_SPILLWAY']+
							 JSON_CONFIG_DATA['PREDIX_GLOBAL_CONFIG']['GLOBAL_CONFIG_SUFFIX'], 
							 dummy)

# PREDIX_CLOUD_IDENTITY
#####################################################################################################################

# STEP 1: create configuration file content - prepare file
dummy = \
	preparePredixCloudIdentityConfigurationFile(
		JSON_CONFIG_DATA['PREDIX_MACHINE_CONFIG'][JSON_CONFIG_DATA['PREDIX_GLOBAL_CONFIG']['PREDIX_CLOUD_IDENTITY']]['CONTENT']
	)

# STEP 2 save file
createFile(JSON_CONFIG_DATA['GLOBAL_CONFIG']['OUTPUT_DIR']+JSON_CONFIG_DATA['PREDIX_GLOBAL_CONFIG']['PREDIX_CLOUD_IDENTITY']+
							 JSON_CONFIG_DATA['PREDIX_GLOBAL_CONFIG']['GLOBAL_CONFIG_SUFFIX'], 
							 dummy)

# PREDIX_WEBSOCKER_RIVER
#####################################################################################################################

# STEP 1: create configuration file content - prepare file
dummy = \
	prepareWebSocketRiverPredixMachineConfigurationFile(
		JSON_CONFIG_DATA['PREDIX_MACHINE_CONFIG'][JSON_CONFIG_DATA['PREDIX_GLOBAL_CONFIG']['PREDIX_WEBSOCKER_RIVER']]['CONTENT']
	)

# STEP 2 save file
createFile(JSON_CONFIG_DATA['GLOBAL_CONFIG']['OUTPUT_DIR']+JSON_CONFIG_DATA['PREDIX_GLOBAL_CONFIG']['PREDIX_WEBSOCKER_RIVER']+
							 JSON_CONFIG_DATA['PREDIX_GLOBAL_CONFIG']['GLOBAL_CONFIG_SUFFIX'], 
							 dummy)

# PROXY_CONFIGURATION
#####################################################################################################################

# STEP 1: create configuration file content - prepare file
dummy = \
	prepareProxyPredixMachineConfigurationFile(
		JSON_CONFIG_DATA['PREDIX_MACHINE_CONFIG'][JSON_CONFIG_DATA['PREDIX_GLOBAL_CONFIG']['PROXY_CONFIGURATION']]['CONTENT']
	)

# STEP 2 save file
createFile(JSON_CONFIG_DATA['GLOBAL_CONFIG']['OUTPUT_DIR']+JSON_CONFIG_DATA['PREDIX_GLOBAL_CONFIG']['PROXY_CONFIGURATION']+
							 JSON_CONFIG_DATA['PREDIX_GLOBAL_CONFIG']['GLOBAL_CONFIG_SUFFIX'], 
							 dummy)

#####################################################################################################################
#####################################################################################################################