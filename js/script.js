(function readyJS(win, doc){
    if(doc.querySelectorAll('.delete')){
        for(let i = 0; i < doc.querySelectorAll('.delete').length; i++){
            doc.querySelectorAll('.delete')[i].addEventListener('click', (event) => {
                if(confirm('Deseja mesmo deletar esse usuario?')){
                    return true;
                } else {
                    return event.preventDefault();
                }
            })
        }
    }
})(window, document);