exports.home = (req, res) =>{
    res.render('home');
}

exports.about = (req, res) =>{
    res.render('about');
}

exports.contact = (req, res) =>{
    res.render('contact');
}

exports.property = (req, res) =>{
    res.render('property');
}

exports.propertydetails = (req, res) =>{
    res.render('propertydetails');
}

exports.agents = (req, res) =>{
    res.render('agents');
}
exports.adminAgent = (req, res) =>{
    res.render('adminAgent');
}

exports.service = (req, res) =>{
    res.render('service');
}

exports.login = (req, res) =>{
    res.render('login');
}

exports.menu = (req, res) =>{
    res.render('menu');
}

exports.admin_properties= (req, res) =>{
    res.render('admin-properties');
}

exports.admin_inquiries = (req, res) =>{
    res.render('admin-inquiries');
}

exports.adminCRUD = (req, res) =>{
    res.render('adminCRUD');
}

