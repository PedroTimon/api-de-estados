const estadosUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
const cidadesUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios';

const estadosSelect = document.getElementById('estados');
const cidadesSelect = document.getElementById('cidades');

function carregarEstados() {
    fetch(estadosUrl)
        .then(response => response.json())
        .then(estados => {
            estados.forEach(estado => {
                const option = document.createElement('option');
                option.value = estado.id;
                option.textContent = estado.nome;
                estadosSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao carregar estados:', error));
}

function carregarCidades(idEstado) {
    fetch(cidadesUrl.replace('{UF}', idEstado))
        .then(response => response.json())
        .then(cidades => {
            cidadesSelect.innerHTML = '<option value="">Selecione uma cidade</option>';
            cidades.forEach(cidade => {
                const option = document.createElement('option');
                option.value = cidade.id;
                option.textContent = cidade.nome;
                cidadesSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao carregar cidades:', error));
}

estadosSelect.addEventListener('change', function() {
    const idEstado = this.value;
    if (idEstado) {
        carregarCidades(idEstado);
    } else {
        cidadesSelect.innerHTML = '<option value="">Selecione uma cidade</option>';
    }
});

window.onload = carregarEstados;