import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import axios from '../axios';
import ReactMarkdown from 'react-markdown';

export const FullPost = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  console.log('params FullPost.jsx', id);

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);

        console.log('res Fullpost.jsx', res);
      })
      .catch((err) => {
        console.error('err FullPost.jsx', err);
      });
  }, [id]);

  // if (data.imageUrl) {
  //   const defaultLink = 'http://localhost:2999';
  //   // data.imageUrl = defaultLink + data.imageUrl;
  //   console.log('data.imageUrl', data.imageUrl);
  // } else {
  //   data.imageUrl =
  //     'https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png';
  // }

  // console.log('data Fullpost.jsx', data);
  // console.log('imageUrl Fullpost.jsx', data.imageUrl);
  if (isLoading) {
    return <Post isLoading={isLoading} />;
  }

  return (
    <>
      {data && (
        <Post
          id={data._id}
          title={data.title}
          // imageUrl={`http://localhost:2999${data.imageUrl}`}
          imageUrl={data.imageUrl}
          user={{
            avatarUrl:
              'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
            fullName: data.author.fullName,
          }}
          createdAt={data.createdAt}
          viewsCount={data.viewsCount}
          isLoading={false}
          commentsCount={3}
          tags={data.tags}
          isFullPost
        >
          {/* <p>{data.text}</p> */}
          <ReactMarkdown children={data.text} />
          {/* id={1}
        title="Roast the code #1 | Rock Paper Scissors"
        imageUrl="https://res.cloudinary.scom/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
        user={{
          avatarUrl:
            'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
          fullName: 'Keff',
        }}
        createdAt={'12 июня 2022 г.'}
        viewsCount={150}
        commentsCount={3}
        tags={['react', 'fun', 'typescript']}
        isFullPost
      >
        <p>
          Hey there! 👋 I'm starting a new series called "Roast the Code", where
          I will share some code, and let YOU roast and improve it. There's not
          much more to it, just be polite and constructive, this is an exercise
          so we can all learn together. Now then, head over to the repo and
          roast as hard as you can!!
        </p>  */}
        </Post>
      )}
      <CommentsBlock
        items={[
          {
            user: {
              fullName: 'Вася Пупкин',
              avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
            },
            text: 'Это тестовый комментарий 555555',
          },
          {
            user: {
              fullName: 'Иван Иванов',
              avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
            },
            text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
