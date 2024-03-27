var bcrypt = require('bcryptjs');
const Account = require('../models/Account')

// Register an account
export const register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Please provide username and password.');
    }

    try {
        const existingAccount = await Account.findOne({ username });

        if (existingAccount) {
        return res.status(409).send('Account already exists in the database.');
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        
        const newAccount = new Account({ username, hash});

        await newAccount.save();
        res.status(201).send({ message: "Account created successfully" });;
    } catch (error) {
        res.status(400).send({ error: "Registration failed", details: error.message }); 
    }
}

// Login an account
export const login = async (req, res) => {
    try {
        const user = await Account.findOne({username: req.body.username})
        if (!user) return next(createError(400, "Incorrect username or password"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) return next(createError(400, "Incorrect username or password"))

    } catch (error) {
        res.status(400).send({ error: "Login failed", details: error.message});
    }
}


// Get all accounts
export const getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.find().lean().exec();

        const accountDetails = accounts.map(account => ({
            username: account.username,
            password: account.password
        }));

        res.render('accounts', { accounts: accountDetails });
    } catch (e) {
        res.status(500).send({error: "Fetch Accounts failed", details: e.message});
    }
}



// Delete an account
export const deleteAccount = async (req, res) => {
    const status = await Account.deleteOne({name: req.body.username})
    if (!status) {
        res.status(400).send("Error occurred during deleting");
    } else {
        res.status(200).send("Account Deleted");
    }
}