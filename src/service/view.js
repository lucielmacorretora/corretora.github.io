function appearTag(id){
    document.getElementById(id).classList.remove('hide');
}

function hasHide(id){
    return document.getElementById(id).classList.contains('hide');
}

function hideTag(id){
    document.getElementById(id).classList.add('hide');
}

export function openOrHide(id){
    console.log(id);
    if(hasHide(id)){
        appearTag(id);
        return;
    }
    hideTag(id);
}

export default openOrHide;