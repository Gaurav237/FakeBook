// module.exports.actionName = function(req, res){}

module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);  // to set cookie value

    const data = {
        title: "Home"
    };

    return res.render('home', data);
}
