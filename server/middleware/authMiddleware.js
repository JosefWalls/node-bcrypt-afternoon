module.exports = {
    usersOnly: (req, res, next) => {
        if(!req.session.user){
            res.status(401).send("Plz log in")
        }
        next();
    },
    adminsOnly: (req, res, next) => {
        if(!req.session.user.isAdmin){
            res.status(403).send("YOU NO ADMIN")
        }
        next();
    }
}