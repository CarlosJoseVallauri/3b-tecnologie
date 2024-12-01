function bootAnim(){
    setTimeout(function(){
        document.getElementById('monitor').src = "./home/home.html"
    }
        , 7000);
}

bootAnim();

function menu(){
    const fullSrc = document.getElementById('monitor').src;
    const lastSlashIndex = fullSrc.lastIndexOf('/');
    const splitSrc = fullSrc.substring(fullSrc.lastIndexOf('/', lastSlashIndex - 1));

    if(splitSrc != "/home/home.html")
        document.getElementById('monitor').src = "./home/home.html"
}

function intro(){
    const fullSrc = document.getElementById('monitor').src;
    const lastSlashIndex = fullSrc.lastIndexOf('/');
    const splitSrc = fullSrc.substring(fullSrc.lastIndexOf('/', lastSlashIndex - 1));

    if(splitSrc != "/intro/intro.html")
        document.getElementById('monitor').src = "./intro/intro.html"
}

function lang(){
    const fullSrc = document.getElementById('monitor').src;
    const lastSlashIndex = fullSrc.lastIndexOf('/');
    const splitSrc = fullSrc.substring(fullSrc.lastIndexOf('/', lastSlashIndex - 1));

    if(splitSrc != "/langframe/lang.html")
        document.getElementById('monitor').src = "./langframe/lang.html"
}

function hobby(){
    const fullSrc = document.getElementById('monitor').src;
    const lastSlashIndex = fullSrc.lastIndexOf('/');
    const splitSrc = fullSrc.substring(fullSrc.lastIndexOf('/', lastSlashIndex - 1));

    if(splitSrc != "/hobby/hobby.html")
        document.getElementById('monitor').src = "./hobby/hobby.html"
}