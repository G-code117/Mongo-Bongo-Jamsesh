const router = require('express').Router();
const {User} = require('../../models');
const {
  getStudents,
  getSingleStudent,
  createStudent,
  deleteStudent,
  addAssignment,
  removeAssignment,
} = require('../../controllers/studentController');

// /api/userRoutes
// router.route('/').get(getUsers).post(createUser);
router.get('/', async (req,res) => {
  try{
 const dbUserData = await User.find().select('-__v')
  res.status(200).json(dbUserData)
  }catch(err){
    res.status(500).json(err)
  }
})
// /api/userRoutes/:userId
// router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/userRoutes/:userId/thoughts
// router.route('/:userId/thoughts').post(addThought);
router.post('/', async (req,res) => {
  try{
    const dbUserData = await User.create(req.body);
    res.status(200).json(dbUserData)
  } catch(err){
    res.status(500).json(err)
  }
})
// /api/userRoutes/:userId/thoughts/:thoughtId
// router.route('/:userId/thoughts/:thoughtId').delete(removeThought);
router.get('/:userId', async(req, res) => {
  try{
    console.log(req.params.userId)
    const dbUserData = await User.findOne({_id: req.params.userId}).select('-__v');
    console.log(dbUserData)
    if(!dbUserData){
      return res.status(404).json({message: 'no user id'})
    }
    res.status(200).json(dbUserData)
  } catch(err){
    res.status(500).json(err)
  }
})

router.put('/:userId', async(req,res) => {
  try{
    const dbUserData = await User.findOneAndUpdate(
      {
      _id: req.params.userId,
      },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      },
  );
  if (!dbUserData) {
    return res.status(404).json({message:"no user found"})
  }
  res.status(200).json(dbUserData)
  }catch(err){
    res.status(500).json(err)
  }
})

router.delete('/:userId', async(req,res) => {
  try{
    const dbUserData = await User.findOneAndDelete({
      _id: req.params.userId
      })
      if (!dbUserData) {
      return res.status(404).json({message:"no user found"})
      }
      await Thought.deleteMany({ _id: {$in: dbUserData.thoughts}});
      res.status(200).json({message: "User and thoughts deleted"})
  }catch(err){
    console.log(err) 
    res.status(500).json(err)
  }
});


router.post("/:userId/friends/:friendId", async (req, res) =>{
  try{
    const dbUserData = await User.findOneAndUpdate({
      _id: req.params.userId}, {$addToSet:{friends: req.params.friendId}},{
        new: true
      })
      if (!dbUserData) {
      return res.status(404).json({message:"no user found"})
      }
     res.status(200).json(dbUserData)
  }catch(err){
    console.log(err) 
    res.status(500).json(err)
  }
})

router.delete("/:userId/friends/:friendId", async (req, res) =>{
  try{
    const dbUserData = await User.findOneAndDelete({
      _id: req.params.userId}, {$pull: {friends: req.params.friendId}}, {
        new: true
      }
    )
      if (!dbUserData) {
      return res.status(404).json({message:"no user found"})
      }
      res.status(200).json(dbUserData)
  }catch(err){
    console.log(err) 
    res.status(500).json(err)
  }
})

module.exports = router;
