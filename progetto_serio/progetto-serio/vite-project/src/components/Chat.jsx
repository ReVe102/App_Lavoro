import axios from 'axios';

function Chat({ message }) {

    /*  
        const { stanzeID } = useParams();
        const [NomeStanza, setNomeStanza] = useState("");
        const [input, setInput] = useState("");
        const navigate = useNavigate();
     */
    /*  const fetchUserData = async () => {
         const token = window.localStorage.getItem('token');
         if (!token) {
             throw new Error('Token non trovato');
         }
 
         const userDataResponse = await axios.get('http://localhost:3000/userData', {
             headers: {
                 Authorization: token
             }
         });
 
     }; */
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const res = await axios.post("http://localhost:3000/userData", {
                    token: window.localStorage.getItem("token")
                });
                setCurrentUser(res.data.data);
            } catch (err) {
                console.error("Errore nel recuperare i dati dell'utente", err);
            }
        };

        fetchCurrentUser();
    }, []);
    const [messageContent, setMessage] = useState({
        message: '',
        name: '',
        timestamp: '',
        received: '',
    });
    /* useEffect(() => {
        if (stanzeID) {
            axios.get(`/api/v1/stanze/${stanzeID}`).then((response) => {
                let stanza = response.data.stanze
                setNomeStanza(stanza && stanza.name)
            })
                .catch((error) => {
                    navigate("/");
                })
        }
    }, [stanzeID]) */

    const sendMessage = async (e) => {
        e.preventDefault();
        const body = {
            message: input,
            name: "anananan",
            timestamp: new Date(),
            received: true
        }

        await axios.post("/api/v1/messages", body).then().catch();
        setInput("")
    }
    return (
        <div className='chat'>
            <div className='chat_testa'>
                <div className='chat_name'>
                    <h3>n</h3>

                </div>
            </div>

            <div className='chat_body'>

                {/* {message.map((message) => {
                    return <div>
                        <p className={`chat_messaggiInterni ${!message.ricevuti && "chat_messRicevuti"}`}>
                            <span className='chat_nomeInterno'>{message.name}</span>
                            {message.message}
                            <span className='chat_timestamp'>{new Date(message.timestamp).toLocaleString()}</span>
                        </p>
                    </div>
                })} */}

                {/* <p className='chat_messRicevuti'>
                <span className='chat_nomeInterno'>jack</span>
                Message
             <span className='chat_timestamp'>{new Date().toUTCString()}</span>
            </p>*/}

            </div>


            <div className='chat_casellaTesto'>
                <form>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='scrivi un messaggio...' type='text'></input>
                    <button
                        onClick={sendMessage}
                        type='submit'>invia  </button>
                </form>
            </div>
        </div>
    )
}

export default Chat