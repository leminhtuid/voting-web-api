const mongoose = require('mongoose')
const Member = mongoose.model('Members')

UpdateMember = (req, res) => {
    Member.find({$or: [{_id: req.body.f_id}, {_id: req.body.m_id}]})
        .exec().then(members => {
            console.log(members)
            members.forEach(member => {
                Member.update({_id: member._id},
                    {$inc:{num_of_votes: 1}, $push:{"votes_people": req.body.code}}).exec()
            })
        }).catch(err => res.send(err))
    res.status(200).json({message: "Vote successfully"})
}

exports.LoadAllMembers = (req, res) => {
    Member.find().exec()
        .then(members => res.status(200).json(members))
        .catch(err => res.send(err))
}

exports.VoteMember = (req, res) => {
    Member.findOneAndUpdate({code: req.body.code}, {$set: {voted: true}})
        .exec().then((member) => {
            if(member) {
                member.voted == false ? UpdateMember(req, res) : res.status(304).json({message: "You have made a vote"})
            } else {
                res.status(204).json({message: "Your CODE doesn't exist"})
            }
        }).catch(err => res.send(err))
}