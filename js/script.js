(function readyJS(win, doc){
    if(doc.querySelectorAll('.delete')){
        for(let i = 0; i < doc.querySelectorAll('.delete').length; i++){
            doc.querySelectorAll('.delete')[i].addEventListener('click', (event) => {
                if(confirm('Deseja mesmo deletar?')){
                    return true;
                } else {
                    return event.preventDefault();
                }
            })
        }
    }
})(window, document);

function alterar_caracteristica(){
    if(document.forms['car_modify']['tipo'].value == 'esportivo'){
        document.getElementById('caracteristica').innerHTML = 'Velocidade';
    } else if(document.forms['car_modify']['tipo'].value == 'seda'){
        document.getElementById('caracteristica').innerHTML = 'Número de Passageiros';
    }
}