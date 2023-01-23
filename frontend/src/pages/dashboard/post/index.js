import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function Index() {
    const [post, setPost] = useState([]);
    const [updatePostId, setUpdatePostId] = useState('');
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "react",
        slug: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(updatePostId === ""){
            const result = await axios.post('http://localhost:8080/api/v1/post/add', formData);
            if (result.status === 200) {
                toast.success("Post Added Successfully")
            }
        } else {
            const result = await axios.patch('http://localhost:8080/api/v1/post/update/'+updatePostId, formData);
            if (result.status === 200) {
                fetchData();
                setFormData({
                    title: "",
                    description: "",
                    category: "react",
                    slug: ""
                })
                setUpdatePostId("");
       
                toast.success("Post Updated Successfully")
            }
        }
     
    }

    const handleEdit = (index) => {
        setFormData(post[index]);
        setUpdatePostId(post[index]._id);
    }

    const cancelUpdate = () => {
        setUpdatePostId("");
        setFormData({
            title: "",
            description: "",
            category: "react",
            slug: ""
        })
    }

    const handleDelete = async (index) => {
        const result = await axios.delete('http://localhost:8080/api/v1/post/delete/'+post[index]._id);
            if (result.status === 200) {
                fetchData();
                toast.success("Post Delete Successfully")
            }
      }

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/post/all');
            const result = response.data;
            setPost(result?.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit} className="container">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select className="form-control" id="category" name="category" value={formData.category} onChange={handleChange}>
                        <option value="react">React</option>
                        <option value="angular">Angular</option>
                        <option value="vue">Vue</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="slug">Slug</label>
                    <input type="text" className="form-control" id="slug" name="slug" value={formData.slug} onChange={handleChange} />
                </div>
                {updatePostId === "" ? <button type="submit" className="btn btn-primary">Submit</button> :
                    <div className='d-flex'>
                        <button type="submit" className="btn btn-primary">Update</button>
                        <button type="button" className="btn btn-secondary ml-3" onClick={() => cancelUpdate()}>Cancel</button>
                    </div>
                }

            </form>
            <div>
                <table className="table container mt-5 mb-5 pb-5 table-borderless">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Slug</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {post.length > 0 && post?.map((p, i) => (
                            <tr key={p.id}>
                                <td>{i + 1}</td>
                                <td>{p.title}</td>
                                <td>{p.category}</td>
                                <td>{p.slug}</td>
                                <td className="pl-4 cursor-pointer" onClick={() => handleEdit(i)}> <i className="fa fa-edit" aria-hidden="true"></i></td>
                                <td className="pl-4 cursor-pointer" onClick={() => handleDelete(i)}> <i className="fa fa-trash" aria-hidden="true"></i></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Index;