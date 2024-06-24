import "./post.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const PF = import.meta.env.VITE_PUBLIC_FOLDER; // public folder
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const res = await axios.post("http://localhost:3000/userData", {
                    token: window.localStorage.getItem("token")
                });
                setCurrentUser(res.data.data);
                if (res.data.data === "token expired") {
                    alert("Token scaduto. Fai login.");
                    window.localStorage.clear();
                    window.location.href = "./Login";
                }
            } catch (err) {
                console.error("Errore nel recuperare i dati dell'utente", err);
            }
        };

        fetchCurrentUser();
    }, []);

    useEffect(() => {
        if (currentUser) {
            setIsLiked(post.likes.includes(currentUser._id));
        }
    }, [currentUser, post.likes]);

    const likeHandler = async () => {
        try {
            await axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
        } catch (err) {
            console.error(err);
        }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    };

    if (!currentUser) {
        return <div>Loading...</div>;
    }

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${currentUser.username || currentUser.name}`}>
                            <img
                                className="postProfileImg"
                                src={currentUser.image || `${PF}/defaultpfp.jpg`}
                                alt=""
                            />
                        </Link>
                        <span className="postUsername">
                            {currentUser.username || currentUser.name || 'Unknown'}
                        </span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    {post.img && <img className="postImg" src={post.img} alt="" />}
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <ThumbUpIcon className="likeIcon" onClick={likeHandler} />
                        <span className="postLikeCounter">{like}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
