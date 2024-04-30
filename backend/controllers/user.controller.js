import UserModel from '../models/user.model.js';
const userModel = new UserModel();

const createUserTable = async (req, res) => {
    try {
        await userModel.createTable();
        res.status(200).json({ msg: 'User table created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

const dropUserTable = async (req, res) => {
    try {
        await userModel.dropTable();
        res.status(200).json({ msg: 'User table dropped successfully' });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await userModel.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};
  
const createUser = async (req, res) => {
    try {
        const userId = await userModel.create(req.body);  
        res.status(200).json(userId);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};
  
const login = async(req,res)=>{
    if (!req.body.email || !req.body.password ) {
        return res.status(400).json({ error: 'Bad request. Please provide username and password' });
    }
    try{
        const user = await userModel.login(req.body);
        
        if(user){
            res.status(200).json(user);
        }else{
            res.status(404).json({ error: 'User not found' });
        }
    }catch(error){
        res.status(500).json({ error: error.toString() });
    }
}

const getUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await userModel.findById(userId);

        if (!user)
            res.status(404).json({ error: 'User not found' });
        else
            res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};
  
const updateUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const allowedFields = ['name', 'email', 'password'];
        const isValidRequest = Object.keys(req.body).every(field => allowedFields.includes(field));
        if (!isValidRequest)
            return res.status(400).json({ error: 'Bad request. Invalid fields in request body' });
        
        const updatedRows = await userModel.update(userId, req.body);
        
        if (updatedRows === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            const updatedUser = await userModel.findById(userId);
            res.status(200).json(updatedUser);
        }
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
};
  
const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedRows = await userModel.delete(userId);

        if (deletedRows === 0)
            res.status(404).json({ error: 'User not found' });
        else 
            res.status(200).json({msg : `${userId} deleted successfully`});
            
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

export{
    createUserTable,
    dropUserTable,
    getUsers,
    createUser,
    login,
    getUser,
    updateUser,
    deleteUser
}
