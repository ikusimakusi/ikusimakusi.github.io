var inv = setInterval(function() {
    if(i < errekaduak)
        document.getElementById("myTargetElement").innerHTML = ++i;
    else
        clearInterval(inv);
}, 2000 / errekaduak);
