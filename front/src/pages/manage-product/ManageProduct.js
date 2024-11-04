import React , {useState , useEffect } from "react";
import Table from 'react-bootstrap/Table';
import { Link  } from "react-router-dom";
// import ProductCard from "../../components/ProductCard";
import Form from 'react-bootstrap/Form';
import "../../css/ManageProduct.css";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import  Alert  from "react-bootstrap/Alert";


const ManageProduct =()=>{

    const [product , setProduct] = useState({
        loading : true , 
        resultes : [] ,
        err : null ,
        reload : 0 , 
    }); 


    

    
    useEffect(()=>{
        setProduct({...product , loading : true})
        axios.get("http://localhost:4000/prodect" , {
            params : {
                
            }
        })
        .then(resp=>{
            setProduct({...product , resultes : resp.data , loading : false , err : null})
        })
        .catch(err=>{
            setProduct({...product , loading : false , err : "something went wrong with the DB ' restart Db ' !"})
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [product.reload] 
    ) ;


    const deleteProduct =(id)=>{
        axios.delete("http://localhost:4000/prodect/" + id , {
            headers:{
                token : "" , 
            }
        } )
        .then(resp=>{
            setProduct({...product , reload : product.reload + 1 })
        })
        .catch(err=>{
        })
    }
    

    return(
        // serarch 
        
        <div className=" p-3 px-5" >
            {/* loader */}
            {
                product.loading === true && (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                )
            }
            <h2 className="text-center ">Manage-Product</h2>
            
            <div >
        

       
       
        {product.err&& (
        <Alert variant="danger" className="p-2">{product.err}</Alert>)}
        

        {product.successMsg&& (
            <Alert variant="success" className="p-2">{product.successMsg}</Alert>
        )}

        <div className="header d-flex justify-content-between mb-4  " >
            <Link to={"/Addproduct"} className="btn btn-success" >Add Product</Link></div>

        <Table striped bordered hover >
            
    <thead>
        <tr>
        <th>id</th>
        <th>Product image</th>
        <th>Product Name</th>
        <th>Product Description</th>
        <th>Product Stock</th>
        <th>Manage</th>
        </tr>
    </thead>
    <tbody>
        {product.resultes.map((product)=>(
            <tr key={product.id} >
            <td>{product.id}</td>
            <td>
                <img src={product.image_url} alt="" className="image-avatar"></img>
            </td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.stock}</td>
            <td>
            <Link
                  to={"/Update/" + product.id}
                  className="btn btn-sm btn-primary mx-2">
                  Update
                </Link>
                {/* <Link to={"/" + product.id} className="btn btn-sm btn-info mx-2">Show</Link> */}
                <Link className="btn btn-sm btn-danger mx-2 " onClick={(e)=> {deleteProduct(product.id)}} >Delete</Link>
            </td>
            </tr>
        ))}
        


       
        
    </tbody>
    </Table>
            
        </div>
        <div>
            
        </div>
        















            
           
            
        </div>
        
        
    )
}

export default ManageProduct ; 


