function defineStructure() {
	addColumn("RESULTADO");
}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields){
	var dataset = DatasetBuilder.newDataset();
	var resultato = [];
	dataset.addColumn("RESULTADO");
	
	
	try {
		
		var constacts = consultaContacts();
			
		for (var i = 0; i < constacts.rowsCount; i++) {
			var retorno = insertConstacts(constacts,i);
			var data = JSON.parse(retorno);
			resultato.push(constacts.getValue(i,"COLIGADA"));
			log.info("******************************************************** linha: " + i);
		}
		
	} catch (e) {
		log.info("erro "+ e);
		dataset.addRow(["erro "+ e]);
		return dataset;
	}

	//dataset.addRow(resultato);
	return dataset;
}

function onMobileSync(user) {}

function insertConstacts(constacts,i){
	
	 try {
		 
		 var api = fluigAPI.getAuthorizeClientService();
	        var  data = {"companyId" : "1",
	                	"serviceCode" : "metaList",
	                	"endpoint" : "saveNewRecord",
	                	"method" : "post",
                		 "params" : {
                			 "dataRecord": [
                		        {
                		            "columnNameId": "COLIGADA",
                		            "value": Number(constacts.getValue(i,"COLIGADA")),
                		            "type": 2 // tipo texto 1 / tipo inteiro 2
                		        },
                		        {
                		            "columnNameId": "FILIAL",
                		            "value": Number(constacts.getValue(i,"FILIAL")),
                		            "type": 2 // tipo int
                		        },
                		        {
                		        	"columnNameId": "MOVIMENTO",
                		        	"value": constacts.getValue(i,"MOVIMENTO"),
                		        	"type": 1 // tipo txt
                		        },
                		        {
                		        	"columnNameId": "DEPARTAMENTO",
                		        	"value": Number(constacts.getValue(i,"DEPARTAMENTO")),
                		        	"type": 2 // tipo int
                		        },
                		        {
                		        	"columnNameId": "VALORMINIMO",
                		        	"value": Number(constacts.getValue(i,"VALORMINIMO")),
                		        	"type": 2 // tipo int
                		        },
                		        {
                		        	"columnNameId": "VALORMAXIMO",
                		        	"value": Number(constacts.getValue(i,"VALORMAXIMO")),
                		        	"type": 2 // tipo int
                		        },
                		        {
                		        	"columnNameId": "APROVADORES",
                		        	"value": constacts.getValue(i,"APROVADORES"),
                		        	"type": 1 // tipo txt
                		        },
                		    ],
                		    "listId": "26" // ID da Lista
                         },
                       "options" : {
                          "encoding" : 'UTF-8',
                          "mediaType": 'application/json',
                          "useSSL" : true
                       },
                      "headers": {
                          "Content-Type": 'application/json;charset=UTF-8'
                      }
	        }
	           
	        var retornoApi = api.invoke(JSONUtil.toJSON(data));
	        
	        log.info("** Retorno getResult data:!! " +data);
	        if(retornoApi.getResult()== null || retornoApi.getResult().isEmpty()){
	            return "";
	        }else{
	        	log.info("**************** retorno area"+retornoApi.getResult());
	            var resultado  = retornoApi.getResult();
	   		 return resultado;
	        }

	    } catch (e) {
	    	log.info('***** Erro ao consultar coligada'+e);
	        return "Erro ao consultar coligada " + e;
	    }
}



function consultaContacts(){
	truncateTable();
	var constraints = [];
	var dataset = DatasetFactory.getDataset("ds_get_contatos", null, null ,null);
	return dataset;
}

function truncateTable(){
	
	var constraints = []
		constraints.push(DatasetFactory.createConstraint("BASE","AppDS" , "AppDS", ConstraintType.MUST));
	
	 try {
		 /****** Script for SelectTopNRows command from SSMS  ******/
		 var query = "TRUNCATE TABLE ML001026";
 
		 var dataset = DatasetFactory.getDataset("ds_fluig_executeSql", [query], constraints, null);
		 
		 return dataset;

	    } catch (e) {
	    	log.info('***** Erro ao TRUNCAR ML001026'+e);
	        return "Erro ao TRUNCAR ML001026 " + e;
	    }
}


