import axios from 'axios';
import Link from 'next/link';

function Post(props) {
    
    return (
        <div className='container'>
            <h1>All Posts</h1>
            <div className='row dark mt-4'>
                {props?.data?.map((x, i) => <div className=" col-md-4 col-sm-12  mt-4" >
                    <div className='card'>
                        <div className="card-body">
                            <h5 className="card-title">{x.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{x.category}</h6>
                            <p className="card-text">{x.description.substring(0,140)}</p>
                            <Link href={"/post/" + x.slug} className="card-link">Card link</Link>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>
    );
}
export async function getServerSideProps(context) {
    const response = await axios.get('http://localhost:8080/api/v1/post/all');
    const result = response.data;
    // console.log("result", result)
    return {
        props: { data: result.data }, // will be passed to the page component as props
    }
}
export default Post;