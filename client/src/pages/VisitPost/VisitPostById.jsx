import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { visitPostByIdApi } from '../../apicall/postApi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoader } from '../../redux/loaderSlice';
import { getCurrentUser } from '../../apicall/userApi';
import { setUser } from '../../redux/userSlice';
import { Row, Col } from 'antd';
import { getAllPost } from '../../apicall/postApi';
import { followUser } from '../../apicall/userApi';
import Likes from '../Interaction/Likes/Likes';
import DisLikes from '../Interaction/DisLikes/DisLikes';
import Comment from '../Interaction/Comments/index';
import { Space, Tag } from 'antd';
import FilterByTopics from '../Filter/FilterByTopics';

const VisitPostById = () => {
  const param = useParams();
  const postId = param.id;
  // console.log(postId)

  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getCurrentUsersFun = async () => {
    try {
      dispatch(setLoader(true));
      const currentUser = await getCurrentUser();
      dispatch(setUser(currentUser.data));
      dispatch(setLoader(false));
    } catch (error) {
      // console.log(error.message);

    }
  }
  const getAllPostFunction = async () => {
    try {
      dispatch(setLoader(true));
      const postById = await visitPostByIdApi({ "postId": postId });
      // console.log(postById);

      let data = await getAllPost();
      data = data.data
      // console.log(data);
      // console.log(data[0]);
      data.splice(0, 1, postById)
      // console.log(data)
      dispatch(setLoader(false));
      setPosts(data);
    } catch (error) {
      // console.log(error.message);
    }
  }

  const currentUser = useSelector((state) => state.users.user);
  // console.log(currentUser);
  const followUserFun = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await followUser({ userIdToFollow: values });
      // console.log(response);
      dispatch(setLoader(false));
      // console.log(response.data);
      dispatch(setUser(response.data));
    } catch (error) {
      // console.log(error);
    }
  }

  const showFollowButton = (id) => {
    let flag = false;
    //ye toh khud ka post id check karne ke liye hai
    if (currentUser._id === id) {
      flag = true;
    }
    //ye yah check karne ke liye hai agar currentUser already follow karta hai kya
    for (let i = 0; i < currentUser.following.length; i++) {
      if (currentUser.following[i] === id) {
        flag = true;
      }
    }
    if (flag) {
      return false;
    } else {
      return true;
    }
  }

  const handleVisitProfile = (id) => {
    localStorage.setItem('otherUserId', id);
    const currentUserId = localStorage.getItem('currentUserId');
    if (currentUserId === id) {
      navigate('/profile');
    } else {
      navigate('/OthersProfile');
    }
  }


  useEffect(() => {
    getCurrentUsersFun();
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      await getAllPostFunction();
    };
    fetchData();
  }, []);

  return (
    <div className=''>
      <Row className=''>
        {/* this is for showing post of currentUser */}
        <Col xs={0} sm={0} md={6} lg={6} xl={6} className='w-full bg-slate-50'>
          <div className='bg-slate-200 m-3'>
            <FilterByTopics setPosts={setPosts}></FilterByTopics>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <div className='h-screen '>
            <div className='w-full bg-slate-50 overflow-y-scroll h-full mb-2'>
              {
                posts &&
                posts.map((post) => (
                  <div className=' border-spacing-2 border-black flex items-center justify-center flex-col mb-5' key={post._id}>
                    <div className='w-full h-14 border-2 border-black bg-slate-200 flex flex-row  '>
                      <div className='flex flex-col'>
                        <div className='flex flex-row'>
                          <p className='font-mono text-2xl ml-1 font-bold cursor-pointer ' onClick={() => handleVisitProfile(post.user._id)}>{post.user?.username}</p>
                          {
                            showFollowButton(post.user?._id) ? <p className='cursor-pointer ml-2 text- flex items-center'
                              onClick={() => followUserFun(post.user._id)}
                            >follow</p> : null
                          }

                        </div>
                      </div>
                      <p className='ml-5 text-2xl flex items-center'>{post.title ? post.title : null}</p>
                    </div>
                    <img className='w-full h-[600px] sm:min-h[400px]' src={post.content} alt="" />
                    <div className='w-full h-20 border-2 border-black bg-slate-200 flex flex-row justify-between items-center'>
                      <Likes userId={currentUser._id} postId={post._id} initialLike={post.likes} getAllPostFunction={getAllPostFunction}></Likes>
                      <DisLikes userId={currentUser._id} postId={post._id} initialDisLike={post.dislikes} getAllPostFunction={getAllPostFunction}></DisLikes>
                      <Comment userId={currentUser._id} postId={post._id} comment={post.comment} ></Comment>
                      <i className=" mr-7 text-5xl ri-share-fill"></i>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </Col>
        {/* this is for showing post comments */}
        <Col xs={0} sm={0} md={6} lg={6} xl={6} className='w-full bg-slate-50'>

        </Col>

      </Row>
    </div>
  )
}

export default VisitPostById;