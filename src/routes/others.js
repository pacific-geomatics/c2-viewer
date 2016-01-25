// CNL Config
var configCNL = {
    imagery: 'pacgeo.neiemcnb',
    token: token,
    locations: [
        { name: 'World', href: ''},
        { name: 'CNL', href: 'CNL'},
        { name: '⚫ Chalk River', href: 'CNL/Chalk-River'},
        { name: '⚫ Petawawa', href: 'CNL/Petawawa'},
        { name: '⚫ Deep River', href: 'CNL/Deep-River'},
    ]
};

// CNL Location - CNL
app.get('/CNL', stormpath.groupsRequired(['cnl', 'pacgeo'], false), function(req, res) {
    configCNL.center = [46.052, -77.365];
    configCNL.zoom = 15;
    configCNL.user = req.user;
    res.render('map.html', configCNL );
});

// CNL Location - Chalk River
app.get('/CNL/Chalk-River', stormpath.groupsRequired(['cnl', 'pacgeo'], false), function(req, res) {
    configCNL.center = [46.0174, -77.4495];
    configCNL.zoom = 14;
    configCNL.user = req.user;
    res.render('map.html', configCNL );
});

// CNL Location - Deep River
app.get('/CNL/Deep-River', stormpath.groupsRequired(['cnl', 'pacgeo'], false), function(req, res) {
    configCNL.center = [46.100351, -77.488929];
    configCNL.zoom = 14;
    configCNL.user = req.user;
    res.render('map.html', configCNL );
});

// CNL Location - Petawawa
app.get('/CNL/Petawawa', stormpath.groupsRequired(['cnl', 'pacgeo'], false), function(req, res) {
    configCNL.center = [45.8948, -77.2681];
    configCNL.zoom = 14;
    configCNL.user = req.user;
    res.render('map.html', configCNL );
});

// Panama
app.get('/Panama/Yaviza', function(req, res) {
    res.render('map.html', {
        center: [8.1564, -77.6917],
        zoom: 16,
        imagery: 'pacgeo.o79jddlo',
        token: token,
        user: req.user,
        locations: locations
    });
});

// Sierra Leone
app.get('/Sierra-Leone/Daru', function(req, res) {
    res.render('map.html', {
        center: [7.9878, -10.8424],
        zoom: 15,
        imagery: 'pacgeo.onak54hl',
        token: token,
        locations: locations
    });
});
