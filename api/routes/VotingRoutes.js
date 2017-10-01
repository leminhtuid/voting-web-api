module.exports = (app) => {
    const VotingController = require("../controllers/VotingController")

    app.route("/")
        .get(VotingController.LoadAllMembers)
        .put(VotingController.VoteMember)
};
