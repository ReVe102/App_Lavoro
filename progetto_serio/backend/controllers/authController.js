const PrivatoModel = require('../models/PrivatoModel');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
const AziendaModel = require('../models/AziendaModel');
const PostAziende=require('../models/PostAziende')
const PostPrivati=require('../models/PostPrivati')
const mongoose=require('mongoose');

exports.register=async (req, res)=>{
    
    const{name,email,password,image, datanascita, luogo, biografia, impiego, ultimolavoro, lavoriprecedenti,indirizzosuperiore,corsodilaurea,posizionelavorativaricercata,luogonascita,luogoresidenza,cellulare }=req.body;
    const status="privato"

    const salt= await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try{
        const existingUser = await PrivatoModel.findOne({ email });

        if (!email || !password) { //se manca uno dei 2 invia errore
        return res.json("mancaqualcosa");
        }else{
            if(existingUser) {  //se mail gia usata
            return res.json('esistegia');
            }else{
                // salva i dati in users
                const newuser = new PrivatoModel({ name:name, email:email, image:image, password:hashedPassword, luogo:luogo, status:status,
                                                datanascita:datanascita,biografia:biografia,impiego: impiego, ultimolavoro: ultimolavoro, 
                                                lavoriprecedenti: lavoriprecedenti, indirizzosuperiore: indirizzosuperiore, corsodilaurea: corsodilaurea, posizionelavorativaricercata: posizionelavorativaricercata, 
                                                luogonascita: luogonascita, luogoresidenza: luogoresidenza, cellulare: cellulare});

                await newuser.save()
                res.send({status:"ok"})

            }
    

        }
    }catch(error){
        res.send({status:"error"})
    }
    
    
}

exports.registerAzienda=async (req, res)=>{
    
    const{name, email, password, image, descrizione, datanascita, cienteladiriferimento, numerodipendenti, fatturatoannuale, mercati, settore, fondatori, ceo, strutturasocietaria, certificazioni, premi, luogonascita, sedelegale, sedioperative, telefono, sitoweb}=req.body;
    const status="azienda"
    const salt= await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try{
        const existingUser = await AziendaModel.findOne({ email });

        if (!email || !password) { //se manca uno dei 2 invia errore
        return res.json("mancaqualcosa");
        }else{
            if(existingUser) {  //se mail gia usata
            return res.json('esistegia');
            }else{
                // salva i dati in users
                const newuser = new AziendaModel({ name:name, email:email, image:image, password:hashedPassword, descrizione:descrizione, status:status, datanascita:datanascita, cienteladiriferimento:cienteladiriferimento, numerodipendenti:numerodipendenti, fatturatoannuale:fatturatoannuale, mercati:mercati, settore:settore, fondatori:fondatori, ceo:ceo, strutturasocietaria:strutturasocietaria, certificazioni:certificazioni, premi:premi, luogonascita:luogonascita, sedelegale:sedelegale, sedioperative:sedioperative, telefono:telefono, sitoweb:sitoweb});

                await newuser.save()
                res.send({status:"ok"})

            }
    

        }
    }catch(error){
        res.send({status:"error"})
    }
    
    
}

exports.login = async (req, res) => {
    const { email, password, status } = req.body;

    try {
        let utentepresente;

        if (status === 'privato') {
            utentepresente = await PrivatoModel.findOne({ email });
        } else {
            utentepresente = await AziendaModel.findOne({ email });
        }

        if (!utentepresente) {
            return res.json({ status: 'Email non risulta registrata' });
        }

        const confronto = await bcrypt.compare(password, utentepresente.password);
        if (!confronto) {
            return res.json({ status: 'credenziali errate' });
        }

        const token = jwt.sign({
            _id: utentepresente._id.toString(),
            email: utentepresente.email,
            status: utentepresente.status
        }, process.env.JWT_SECRET, {
            expiresIn: 86400, // 24 hours
        });

        // Log dell'ID dell'utente loggato
        console.log('User ID during login:', utentepresente._id);

        return res.status(201).json({ status: 'ok', data: token });
    } catch (error) {
        console.error('Errore nel login:', error);
        return res.status(500).json({ status: 'error', message: 'Errore interno del server' });
    }
};

exports.profilo = async (req, res) => {
    const { token } = req.body;

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return "token expired";
            }
            return decoded;
        });

        if (user === "token expired") {
            return res.status(401).send({ status: "error", data: "token expired" });
        }

        const useremail = user.email;
        const userstatus = user.status;

        if (userstatus === "privato") {
            PrivatoModel.findOne({ email: useremail })
                .then((data) => {
                    if (!data) {
                        return res.status(404).send({ status: "error", data: "User not found" });
                    }
                    res.send({ status: "ok", data: data });
                })
                .catch((error) => {
                    console.error('Error fetching private user:', error);
                    res.status(500).send({ status: "error", data: "Internal server error" });
                });
        } else {
            AziendaModel.findOne({ email: useremail })
                .then((data) => {
                    if (!data) {
                        return res.status(404).send({ status: "error", data: "User not found" });
                    }
                    res.send({ status: "ok", data: data });
                })
                .catch((error) => {
                    console.error('Error fetching company user:', error);
                    res.status(500).send({ status: "error", data: "Internal server error" });
                });
        }
    } catch (error) {
        console.error('Error in profilo function:', error);
        res.status(500).send({ status: "error", data: "Internal server error" });
    }
};

exports.updateUser=async (req, res)=>{
    const{name,email, luogo, profilo, biografia, image, impiego, ultimolavoro, lavoriprecedenti,indirizzosuperiore,corsodilaurea,posizionelavorativaricercata,luogonascita,luogoresidenza,cellulare}=req.body;
    const{ status,descrizione, datanascita, cienteladiriferimento, numerodipendenti, fatturatoannuale, mercati, settore, fondatori, ceo, strutturasocietaria, certificazioni, premi, sedelegale, sedioperative, telefono, sitoweb}=req.body;

    try{
        if(status==="azienda"){
            await AziendaModel.updateOne({email:email},{
                $set:{
                    name: name,
                    image: image,
                    descrizione: descrizione,
                    status: status,
                    datanascita: datanascita,
                    cienteladiriferimento: cienteladiriferimento,
                    numerodipendenti: numerodipendenti,
                    fatturatoannuale: fatturatoannuale,
                    mercati: mercati,
                    settore: settore,
                    fondatori: fondatori,
                    ceo: ceo,
                    strutturasocietaria: strutturasocietaria,
                    certificazioni: certificazioni,
                    premi: premi,
                    luogonascita: luogonascita,
                    sedelegale: sedelegale,
                    sedioperative: sedioperative,
                    telefono: telefono,
                    sitoweb: sitoweb
                }})
            }else{
                await PrivatoModel.updateOne({email:email},{
                    $set:{
                        name:name,
                        luogo: luogo,
                        profilo: profilo,
                        biografia: biografia,
                        impiego: impiego,
                        ultimolavoro: ultimolavoro,
                        lavoriprecedenti: lavoriprecedenti,
                        indirizzosuperiore: indirizzosuperiore,
                        corsodilaurea: corsodilaurea,
                        posizionelavorativaricercata: posizionelavorativaricercata,
                        luogonascita: luogonascita,
                        luogoresidenza: luogoresidenza,
                        cellulare: cellulare,
                        image:image,
                        status:status
                    }

            })
        }

        




    return res.json({status:"ok", data:"updated"})

    }catch(error){
        return res.json({status:"error", data:"error"})

    }
}


exports.uploadImmage=async(req,res)=>{
    const {image}=req.body;
    try{
        Images.create({image:image});

        res.send({Status:"ok"})

    }catch(error){
        res.send({Status:"error", data:error})

    }
}

exports.getImmage=async(req,res)=>{
    try{
        await Images.find({}).then(data=>{
            res.send({status:"ok", data:data})

        })
    }catch(error){
    }
}

// Like/Dislike a Post
exports.likePost = async (req, res) => {
    try {
        const { postId, postType } = req.body;
        const token = req.header('Authorization').replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }

        let userId;
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            userId = decoded._id;
        } catch (ex) {
            return res.status(400).json({ error: 'Invalid token.' });
        }

        const PostModel = postType === 'user' ? PostPrivati : PostAziende;
        const post = await PostModel.findById(postId);

        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } });
            res.status(200).json("The post has been liked");
        } else {
            await post.updateOne({ $pull: { likes: userId } });
            res.status(200).json("The post has been disliked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

// Get a Post
exports.getPost = async (req, res) => {
    try {
        const { postId, postType } = req.params;
        const PostModel = postType === 'user' ? PostPrivati : PostAziende;
        const post = await PostModel.findById(postId);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Get All Posts di aziende
exports.getAllAziendaPosts = async (req, res) => {
    try {
        const aziendaPosts = await PostAziende.aggregate([
            {
                $sort: { createdAt: -1 } // Ordina per data di creazione (decrescente)
            },
            {
                $group: {
                    _id: "$aziendaId", // Raggruppa per userId (o altro campo che identifica un'azienda)
                    latestPost: { $first: "$$ROOT" } // Prendi il primo post di ogni gruppo (che è l'ultimo grazie al sort)
                }
            },
            {
                $replaceRoot: { newRoot: "$latestPost" } // Sostituisci la radice del documento con il post più recente
            },
            {
                $sort: { createdAt: -1 } // Riordina i risultati per data di creazione (decrescente)
            }
        ]);

        res.status(200).json(aziendaPosts);
    } catch (err) {
        console.error("Errore nel recuperare i post delle aziende", err);
        res.status(500).json(err);
    }
}

/*exports.getAllAziendaPosts = async (req, res) => {
    try {
        const aziendaPosts = await PostAziende.find();
        res.status(200).json(aziendaPosts);
    } catch (err) {
        console.error("Errore nel recuperare i post delle aziende", err);
        res.status(500).json(err);
    }
}*/

// Get All Posts di privati
exports.getAllPrivatiPosts = async (req, res) => {
    try {
        // Aggregazione per ottenere l'ultimo post di ciascun utente
        const privatiPosts = await PostPrivati.aggregate([
            {
                $sort: { createdAt: -1 } // Ordina per data di creazione (decrescente)
            },
            {
                $group: {
                    _id: "$privatoId",
                    latestPost: { $first: "$$ROOT" } // Prendi il primo post di ogni gruppo (che è l'ultimo grazie al sort)
                }
            },
            {
                $replaceRoot: { newRoot: "$latestPost" } // Sostituisci la radice del documento con il post più recente
            },
            {
                $sort: { createdAt: -1 } // Riordina i risultati per data di creazione (decrescente)
            }
        ]);

        res.status(200).json(privatiPosts);
    } catch (err) {
        console.error("Errore nel recuperare i post dei privati", err);
        res.status(500).json(err);
    }
}

// Get All Posts di privati
/*exports.getAllPrivatiPosts = async (req, res) => {
    try {
        const privatiPosts = await PostPrivati.find();
        res.status(200).json(privatiPosts);
    } catch (err) {
        console.error("Errore nel recuperare i post dei privati", err);
        res.status(500).json(err);
    }
}*/

/*exports.profilo = async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET, (err, res) => {
            if (err) {
                return "token expired"
            }
            return res
        })
        if (user == "token expired") {
            return res.send({ status: "error", data: "token expired" })
        }
        const useremail = user.email;
        const userstatus = user.status;
        let userData;
        if (userstatus == "privato") {
            userData = await PrivatoModel.findOne({ email: useremail });
            const userPosts = await PostPrivati.find({ userId: userData._id });
            return res.send({ status: "ok", data: userData, posts: userPosts });
        } else {
            userData = await AziendaModel.findOne({ email: useremail });
            const aziendaPosts = await PostAziende.find({ aziendaId: userData._id });
            return res.send({ status: "ok", data: userData, posts: aziendaPosts });
        }
    } catch (error) {
        return res.send({ status: "error", data: error })
    }
}*/

// Get Posts by User
exports.getPostsByProfile = async (req, res) => {
    const token = req.headers.authorization;

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        console.log('User:', user);
        if (!user) {
            return res.status(401).json({ status: "error", data: "Invalid token" });
        }
        const userId = user._id;
        console.log('User ID:', userId);

        let posts;
        if (user.status === 'privato') {
            posts = await PostPrivati.find({ privatoId: userId});
        } else if (user.status === 'azienda') {
            posts = await PostAziende.find({ aziendaId: userId});
        }
        console.log('Posts trovati:', posts);
        res.status(200).json(posts);
    } catch (err) {
        console.error('Errore nel recuperare i post del profilo', err);
        res.status(500).json({ error: 'Errore interno del server' });
    }
};

//upload immagine per il post
exports.uploadImage = async (req, res) => {
    const { base64 } = req.body;
    try {
        const imageUrl = base64; 
        res.status(200).json({ Status: "ok", imageUrl });
    } catch (error) {
        res.status(500).json({ Status: "error", error: error.message });
    }
};

// Crea un post
exports.createPost = async (req, res) => {
    const { userId, aziendaId, desc, img, postType } = req.body;
    try {
        if (postType === 'privato') {
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json("Invalid user ID");
            }

            const user = await PrivatoModel.findById(userId);
            if (!user) {
                return res.status(404).json("User not found");
            }

            const newPost = new PostPrivati({
                privatoId: userId,
                desc,
                img: img || '',
            });

            const savedPost = await newPost.save();
            res.status(200).json(savedPost);
        } else if (postType === 'azienda') {
            if (!mongoose.Types.ObjectId.isValid(aziendaId)) {
                return res.status(400).json("Invalid company ID");
            }

            const azienda = await AziendaModel.findById(aziendaId);
            if (!azienda) {
                return res.status(404).json("Company not found");
            }

            const newPost = new PostAziende({
                aziendaId,
                desc,
                img: img || '',
            });

            const savedPost = await newPost.save();
            res.status(200).json(savedPost);
        } else {
            res.status(400).json("Invalid post type");
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

//logica per recuperare i dati di un privato dato l'ID
exports.getPrivatoById = async (req, res) => {
    try {
        const privato = await PrivatoModel.findById(req.params.privatoId);
        if (!privato) {
            return res.status(404).json({ message: 'Privato non trovato' });
        }
        console.log('Privato trovato:', privato); 
        res.json(privato);
    } catch (err) {
        res.status(500).json({ message: 'Errore del server' });
    }
};
/*exports.getPrivatoById=async (req,res)=>{
    try {
        const privatoId = req.query.privatoId;
        if (!privatoId) {
            return res.status(400).json({ error: "Missing privatoId in query parameters" });
        }

        const privato = await PrivatoModel.findById(privatoId);
        if (!privato) {
            return res.status(404).json({ error: `Privato with id ${privatoId} not found` });
        }

        res.status(200).json(privato);
    } catch (err) {
        console.error("Error in getPrivatoById:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};*/

//logica per recuperare i dati di un'azienda dato l'ID
exports.getAziendaById = async (req, res) => {
    try {
        const azienda = await AziendaModel.findById(req.params.aziendaId);
        if (!azienda) {
            return res.status(404).json({ message: 'Azienda non trovata' });
        }
        console.log('Azienda trovata:', azienda); 
        res.json(azienda);
    } catch (err) {
        res.status(500).json({ message: 'Errore del server' });
    }
};
/*exports.getAziendaById = async (req, res) => {
try {
    const aziendaId = req.query.aziendaId;
    if (!aziendaId) {
        return res.status(400).json({ error: "Missing aziendaId in query parameters" });
    }

    const azienda = await AziendaModel.findById(aziendaId);
    if (!azienda) {
        return res.status(404).json({ error: `Azienda with id ${aziendaId} not found` });
    }

    res.status(200).json(azienda);
} catch (err) {
    console.error("Error in getAziendaById:", err);
    res.status(500).json({ error: "Internal server error" });
}
};*/

//get images
exports.getImages = async (req, res) => {
    try {
        const userImages = await PostPrivati.find({ img: { $exists: true } });
        const aziendaImages = await PostAziende.find({ img: { $exists: true } });
        const allImages = userImages.concat(aziendaImages);
        res.status(200).json(allImages);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Funzione per ottenere i post di un privato dato il loro ID
exports.getPostsByPrivatoId = async (req, res) => {
    try {
        const privatoId = req.params.privatoId;
        console.log(`Fetching posts for privatoId: ${privatoId}`);
        
        if (!mongoose.Types.ObjectId.isValid(privatoId)) {
            console.log('Invalid privatoId');
            return res.status(400).json({ message: 'ID non valido' });
        }

        let posts = [];
        const fetchedPosts = await PostPrivati.find({ privatoId: privatoId });
        console.log(`Posts fetched for privatoId ${privatoId}:`, fetchedPosts);

        if (!fetchedPosts || fetchedPosts.length === 0) {
            console.log('No posts found.');
            return res.status(404).json({ message: 'Nessun post trovato' });
        }

        posts = fetchedPosts;
        res.status(200).json(posts);
    } catch (err) {
        console.error(`Errore nel recuperare i post per privatoId ${privatoId}:`, err);
        res.status(500).json({ message: 'Errore del server' });
    }
};

// Funzione per ottenere i post di un'azienda dato il loro ID
exports.getPostsByAziendaId = async (req, res) => {
    try {
        const aziendaId = req.params.aziendaId;
        console.log(`Fetching posts for aziendaId: ${aziendaId}`);
        
        if (!mongoose.Types.ObjectId.isValid(aziendaId)) {
            console.log('Invalid aziendaId');
            return res.status(400).json({ message: 'ID non valido' });
        }

        let posts = [];
        const fetchedPosts = await PostAziende.find({ aziendaId: aziendaId });
        console.log(`Posts fetched for aziendaId ${aziendaId}:`, fetchedPosts);

        if (!fetchedPosts || fetchedPosts.length === 0) {
            console.log('No posts found.');
            return res.status(404).json({ message: 'Nessun post trovato' });
        }

        posts = fetchedPosts;
        res.status(200).json(posts);
    } catch (err) {
        console.error(`Errore nel recuperare i post per aziendaId ${aziendaId}:`, err);
        res.status(500).json({ message: 'Errore del server' });
    }
};

/*exports.getPostsByPrivatoId = async (req, res) => {
    try {
        const privatoId = req.params.privatoId;
        console.log(`Fetching posts for privatoId: ${privatoId}`);

        if (!mongoose.Types.ObjectId.isValid(privatoId)) {
            return res.status(400).json({ message: 'ID non valido' });
        }

        const posts = await PostPrivati.aggregate([
            {
                $match: { privatoId: mongoose.Types.ObjectId(privatoId) }
            },
            {
                $sort: { createdAt: -1 } // Ordina per data di creazione (decrescente)
            }
        ]);

        console.log(`Posts fetched for privatoId ${privatoId}:`, posts);

        if (!posts || posts.length === 0) {
            console.log('No posts found.');
            return res.status(404).json({ message: 'Nessun post trovato' });
        }

        res.json(posts);
    } catch (err) {
        console.error(`Errore nel recuperare i post per privatoId ${privatoId}:`, err);
        res.status(500).json({ message: 'Errore del server' });
    }
};

exports.getPostsByAziendaId = async (req, res) => {
    try {
        const aziendaId = req.params.aziendaId;
        console.log(`Fetching posts for aziendaId: ${aziendaId}`);

        if (!mongoose.Types.ObjectId.isValid(aziendaId)) {
            return res.status(400).json({ message: 'ID non valido' });
        }

        const posts = await PostAziende.aggregate([
            {
                $match: { aziendaId: mongoose.Types.ObjectId(aziendaId) }
            },
            {
                $sort: { createdAt: -1 } // Ordina per data di creazione (decrescente)
            }
        ]);

        console.log(`Posts fetched for aziendaId ${aziendaId}:`, posts);

        if (!posts || posts.length === 0) {
            console.log('No posts found.');
            return res.status(404).json({ message: 'Nessun post trovato' });
        }

        res.json(posts);
    } catch (err) {
        console.error(`Errore nel recuperare i post per aziendaId ${aziendaId}:`, err);
        res.status(500).json({ message: 'Errore del server' });
    }
};*/


