import { useEffect, useState } from "react";
import Share from "../share/Share";
import "./feed.css";
import Post from "../post/Post";
import axios from "axios";

export default function Feed({ username, showShare, showLatest }) {
    const [posts, setPosts] = useState([]);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.post("http://localhost:3000/userData", {
                    token: window.localStorage.getItem("token")
                });
                setUserData(res.data.data);
                if (res.data.data === "token expired") {
                    alert("Token scaduto. Fai login.");
                    window.localStorage.clear();
                    window.location.href = "./Login";
                }
            } catch (err) {
                console.error("Errore nel recuperare i dati dell'utente", err);
            }
        };

        const fetchPosts = async () => {
            try {
                const res = username
                    ? await axios.get(`/posts/profile/${username}`)
                    : await axios.get(`/posts/timeline/${userData._id}`);
                let allPosts = res.data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                });

                // Se showLatest è true, filtra per ottenere solo l'ultimo post di ogni utente/azienda
                if (showLatest) {
                    const latestPostsMap = new Map();
                    for (const post of allPosts) {
                        // Usa userId o aziendaId come chiave
                        const ownerId = post.userId || post.aziendaId;
                        if (!latestPostsMap.has(ownerId)) {
                            latestPostsMap.set(ownerId, post);
                        }
                    }
                    allPosts = Array.from(latestPostsMap.values());
                }

                // Ottieni le informazioni del profilo per ogni post
                const postsWithProfileData = await Promise.all(allPosts.map(async (post) => {
                    const profileRes = await axios.get(`/users/${post.userId || post.aziendaId}`);
                    return { ...post, profile: profileRes.data };
                }));

                setPosts(postsWithProfileData);
            } catch (err) {
                console.error(err);
            }
        };

        if (userData) {
            fetchPosts();
        } else {
            fetchUserData();
        }
    }, [username, userData, showLatest]);

    return (
        <div className="feed">
            <div className="feedWrapper">
                {showShare && (!username || username === userData?.name) && <Share />}
                {posts.map((p) => (
                    <Post key={p._id} post={p} />
                ))}
            </div>
        </div>
    );
}
