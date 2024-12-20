import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard'; 

export default function PostPage() {
  const { postSlug } = useParams(); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  // Function to generate embed code for YouTube URLs
  const generateEmbedCode = (content) => {
    const urlRegex = /(https?:\/\/www\.youtube\.com\/watch\?v=[^\s]+)/g;
    return content.replace(urlRegex, (url) => {
      const videoId = new URL(url).searchParams.get('v');
      return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
    });
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          // Process the post content to include embed codes
          const processedContent = generateEmbedCode(data.posts[0].content);
          setPost({ ...data.posts[0], content: processedContent });
          setLoading(false);
          setError(false);
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className='self-center mt-5'
      >
        <Button color='gray' pill size='xs'>
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className='mt-10 p-3 max-h-[600px] w-full object-cover'
      />
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className='p-3 max-w-2xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>

      {post && post.videoUrl && (
        <div className="mt-10 p-3 text-center">
          <h2 className="text-xl font-semibold mb-3">Watch Related Video</h2>
          <div className="video-box">
            {(() => {
              let embedUrl = post.videoUrl.trim(); // Ensure no leading/trailing spaces

              // Handle 'youtu.be' URLs
              if (embedUrl.includes("youtu.be")) {
                const videoId = embedUrl.split("youtu.be/")[1].split(/[?&]/)[0]; // Extract video ID
                embedUrl = `https://www.youtube.com/embed/${videoId}`;
              }

              // Handle 'watch?v=' URLs
              else if (embedUrl.includes("watch?v=")) {
                embedUrl = embedUrl.replace("watch?v=", "embed/").split("&")[0]; // Remove extra query params
              }

              // Handle other invalid formats (optional logging)
              if (!embedUrl.includes("youtube.com/embed/")) {
                console.error("Invalid video URL:", post.videoUrl);
                return <p className="text-red-500">Invalid video URL provided.</p>;
              }

              console.log("Processed Embed URL:", embedUrl); // Debugging

              return (
                <iframe
                  className="w-full"
                  height="315"
                  src={embedUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              );
            })()}
          </div>
        </div>
      )}



      <div className='max-w-4xl mx-auto w-full'>
        <CallToAction />
      </div>
      <CommentSection postId={post._id} />

      <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>Recent articles</h1>
        <div className='flex flex-wrap gap-5 mt-5 justify-center'>
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
}
