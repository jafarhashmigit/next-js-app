import axios from 'axios';
import { match } from 'path-to-regexp'

function Post({data}) {
  console.log("data", data)
  return (
    <div className='container'>
      <h1>{data?.title}</h1>
      <h6>Category: {data?.category}</h6>

      <div>
        Description: {data?.description}
      </div>
    </div>
  )
}
export async function getServerSideProps(context) {
    const matchFn = match('/post/:slug')
    const {params} = matchFn(context.resolvedUrl)
    const response = await axios.get('http://localhost:8080/api/v1/post/view/'+params?.slug);
    console.log("router1",response?.data?.data[0] )
    return {
      props: {data:response?.data?.data[0]}, // will be passed to the page component as props
    }
  }
  
export default Post
