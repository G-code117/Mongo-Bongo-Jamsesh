const router = require('express').Router();
const {User, Thought} = require('../../models')
// const {
//   getCourses,
//   getSingleCourse,
//   createCourse,
//   updateCourse,
//   deleteCourse,
// } = require('../../controllers/courseController.js');

// /api/courses
router.get('/', async(req, res) =>{
  try{
  const dbThoughtData = await Thought.find().sort({createdAt: -1})
  res.status(200).json(dbThoughtData)
  } catch(err){
    res.status(404).json(err)
  }
});

router.post('/', async(req, res) =>{
  try{
    const dbThoughtData = await Thought.create(req.body)
    const dbUserData = await User.findOneAndUpdate({
      _id: req.body.userId,
    },
    {$push: {thoughts: dbThoughtData._id}},
    {new: true}
  )
  if(!dbUserData){
    return res.status(404).json({message: "thoughts without a User"})
  }
  res.status(200).json({...dbThoughtData, message: "now you're thinking!"})
    } catch(err){
      res.status(404).json(err)
    }
});

// /api/courses/:courseId
// router
//   .route('/:courseId')
//   .get(getSingleCourse)
//   .put(updateCourse)
//   .delete(deleteCourse);

module.exports = router;
