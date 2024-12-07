function bootAnim(){
    setTimeout(function(){
        document.getElementById('monitor').src = "./home/home.html"
    }
        , 7000);
}

bootAnim();

function srcChange(src){
    const fullSrc = document.getElementById('monitor').src;
    const lastSlashIndex = fullSrc.lastIndexOf('/');
    const splitSrc = fullSrc.substring(fullSrc.lastIndexOf('/', lastSlashIndex - 1));

    if(splitSrc != src.slice(1))
        document.getElementById('monitor').src = src;
}