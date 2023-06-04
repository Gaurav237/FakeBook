// module.exports.actionName = function(req, res){}

module.exports.home = function(req, res){
    const data = {
        title: "Home"
    };

    return res.render('home', data);
}
