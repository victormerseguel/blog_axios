import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import blogFetch from "../axios/config";

const EditFile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [edit, setEdit] = useState();

  const getPosts = async () => {
    try {
      const response = await blogFetch.get(`/posts/${id}`);
      const data = response.data;

      setTitle(data.title);
      setBody(data.body);
    } catch (error) {
      console.log(error);
    }
  };

  const editPost = async (e) => {
    e.preventDefault();

    const post = { title, body, userId: 1 };

    await blogFetch.put(`/posts/${id}`, { body: post });

    setEdit(true);
    setTimeout(() => {
      setEdit(false);
      navigate("/admin");
    }, 1500);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="new-post">
      {edit ? (
        <p>Edição concluida...</p>
      ) : (
        <div>
          <h2>Editando: {title}</h2>
          <form onSubmit={(e) => editPost(e)}>
            <div className="form-control">
              <label htmlFor="title">Título:</label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Digite o título"
                onChange={(e) => setTitle(e.target.value)}
                value={title || ""}
              />
            </div>
            <div className="form-control">
              <label htmlFor="body">Conteúdo:</label>
              <textarea
                name="body"
                id="body"
                placeholder="Digite o conteúdo"
                onChange={(e) => setBody(e.target.value)}
                value={body || ""}
              ></textarea>
            </div>
            <input className="btn" type="submit" value="Editar post" />
          </form>
        </div>
      )}
    </div>
  );
};

export default EditFile;
