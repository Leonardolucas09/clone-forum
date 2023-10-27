import axios from "axios";
import { BASE_URL } from "../constants/url";

const token = localStorage.getItem("token")

export const getPostAll =(salvarPosts)=>{
    axios.get(`${BASE_URL}/post/all`)
    .then((response)=>{
        salvarPosts(repsonse.data)
    })
    .catch((err) =>{console.log(err)})
}

export const createPost = (title, content, image, hashtag) =>{
    return new Promise((resolve, reject)=>{
        let body = {
            "title": title,
            "content": content,
            "image": image,
            "hashtag": hashtag
        }

        axios.post(`${BASE_URL}/post/create`, body, {header: {Authorization:token}})
        .then((response)=>{
            getPostAll()
            resolve(response.data)
            console.log("body", body)
        })
        .catch((err) =>{
            reject(err)
        })
    })
}