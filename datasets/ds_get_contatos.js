function createDataset(fields, constraints, sortFields){
	var dataset = DatasetBuilder.newDataset();
	
	 dataset.addColumn("COLIGADA");
     dataset.addColumn("FILIAL");
     dataset.addColumn("MOVIMENTO");
     dataset.addColumn("DEPARTAMENTO");
     dataset.addColumn("VALORMINIMO");
     dataset.addColumn("VALORMAXIMO");
     dataset.addColumn("APROVADORES");
	
	try {
		var retorno = consultar();
	} catch (e) {
		// TODO: handle exception
	}

	
	for (var i = 0; i < retorno.rowsCount; i++) {
		dataset.addRow([retorno.getValue(i,"COLIGADA"),
					    retorno.getValue(i,"FILIAL"),
					    retorno.getValue(i,"MOVIMENTO"),
					    retorno.getValue(i,"DEPARTAMENTO"),
					    retorno.getValue(i,"VALORMINIMO"),
					    retorno.getValue(i,"VALORMAXIMO"),
					    retorno.getValue(i,"APROVADORES")]);
	}
	
	return dataset;
}

function consultar(){
	
	var constraints = []
		constraints.push(DatasetFactory.createConstraint("BASE","AppDS" , "AppDS", ConstraintType.MUST));
	
	 try {
		 
		 
		 /****** Script for SelectTopNRows command from SSMS  ******/
		 var query = /*"SELECT "+
						 "NOME, "+
						 "CNPJ, "+
						 "ISNULL(ENDERECO,'') AS ENDERECO, "+
						 "ISNULL(UF,'') AS UF, "+
						 "ISNULL(RESPONSAVEL,'') AS RESPONSAVEL, "+
						 "'' AS CONTATO, "+
						 "ISNULL(EMAILCOMERCIAL,'') AS EMAILCOMERCIAL, "+
						 "ISNULL(EMAILINFOTECNICAS,'') AS EMAILINFOTECNICAS, "+
						 "ISNULL(GRUPO,'') AS GRUPO "+
						 "FROM "+
						 "[CONTATOSFLUIG] "*/
						 "SELECT "+ 
						 "coligada, "+
						 "filial, "+
						 "movimento, "+
						 "departamento, "+
						 "valorminimo, "+
						 "valormaximo, "+
						 "aprovadores "+
						 "FROM staging_ml001026"
		 

 
		 var dataset = DatasetFactory.getDataset("ds_fluig_executeSelectSql", [query], constraints, null);
		 
		 return dataset	

	    } catch (e) {
	    	log.info('***** Erro ao consultar help'+e)
	        return "Erro ao consultar help " + e;
	    }
}


function filtro(constraints, campo){
	if(constraints != null){
		for (var i = 0; i < constraints.length; i++) {
			if (constraints[i].fieldName == campo) {
				return constraints[i].initialValue;
			}
		}
	}
	return null;
}