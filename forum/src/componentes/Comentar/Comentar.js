import { useEffect, useState } from "react";
import { createComment } from "../../services/requests";
import { AutorComentario, BotaoCondicional, ComentarioContainer, ComentarioDoAutor, ContainerCurtir, ContainerItem, InputComentar } from "./style";
import Curtir from "../Curtir/Curtir";


const Comentar = ({postId, comments, autorId}) => {

   const [novoComentario, setNovoComentario] = useState("")
   const [comentarios, setNovoComentarios] = useState("")
   const [mostrarComentarios, setMostrarComentarios] = useState(false)

   const adicionarComentario = ()=>{
    if(novoComentario.trim() !== ""){
        createComment(postId, novoComentario)
        setNovoComentarios(...comments, novoComentario)
        setNovoComentario("")
    }
   }

   useEffect(() =>{
    adicionarComentario()
   },[])

   const novosComentarios = comments.map((comentario)=>{
    return(
        <ComentarioContainer key={comentario.comments_id}>
            <AutorComentario>{comentario.creator.name}</AutorComentario>
            <ComentarioDoAutor>{comentario.comments}</ComentarioDoAutor>
        </ComentarioContainer>
    )
   })

    return (

        <>
            <ContainerItem>
                <BotaoCondicional onClick={()=> setMostrarComentarios(
                    !mostrarComentarios
                )}>{mostrarComentarios ?("Fechar"):("Comentar")}
                    {mostrarComentarios && (
                        <ContainerCurtir>
                            <div>
                                <InputComentar placeholder="comentario" value={novoComentario} onChange={(e)=> setNovoComentario(e.target.value)}/>
                            </div>
                            {novosComentarios}
                        </ContainerCurtir>
                    )}
                    <Curtir autorId={autorId}/>
                </BotaoCondicional>
            </ContainerItem>
    
        </>
    )
}

export default Comentar