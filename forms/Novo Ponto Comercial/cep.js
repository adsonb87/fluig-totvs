$("#cep").blur(function() {
    $.get("//viacep.com.br/ws/"+ $("#cep").val() +"/json/", function (dados) {
         $("#logradouro").val(dados.logradouro);
         $("#cep").val(dados.cep);
         $("#bairro").val(dados.bairro);
         $("#cidade").val(dados.localidade);
         $("#estado").val(dados.uf);
     });
 });