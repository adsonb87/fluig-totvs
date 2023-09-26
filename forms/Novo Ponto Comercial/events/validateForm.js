/**
 *
 *
 * @param {FormController} form
 */
function validateForm(form) {

    var msg = "";

    /*Requisitante*/
    if(form.getValue("nome") == ""){
        msg += "Campo nome não preenchido !";
    }
    if(form.getValue("email") == ""){
        msg += "Campo email não preenchido !";
    }
    if(form.getValue("telefone") == ""){
        msg += "Campo telefone não preenchido !";
    }
    if(form.getValue("cep") == ""){
        msg += "Campo cep não preenchido !";
    }
    if(form.getValue("dataNascimento") == ""){
        msg += "Campo data de nascimento não preenchido !";
    }
    if(form.getValue("documentoIdentidade") == ""){
        msg += "Campo documento de identidade não preenchido !";
    }
    /**Ponto Comercial */
    if(form.getValue("logradouro") == ""){
        msg += "Campo logradouro não preenchido !";
    }
    if(form.getValue("bairro") == ""){
        msg += "Campo bairro não preenchido !";
    }
    if(form.getValue("cidade") == ""){
        msg += "Campo cidade não preenchido !";
    }
    if(form.getValue("estado") == ""){
        msg += "Campo estado não preenchido !";
    }
    if(form.getValue("informacoes") == ""){
        msg += "Campo informações não preenchido !";
    }

    /**Financeiro */
    if(form.getValue("valor") == ""){
        msg += "Campo valor não preenchido !";
    }

    if(msg != ""){
        throw msg;
    }
}
