import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();

  const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
      const fetchPost = async () => {
        try {
          const res = await fetch(`/api/post/getposts?postId=${postId}`);
          const data = await res.json();
          if (res.ok) {
            setFormData(data.posts[0]); // Ensure _id is included in the fetched post data
          } else {
            setPublishError(data.message);
          }
        } catch (error) {
          console.log(error.message);
        }
      };
    
      fetchPost();
    }, [postId]);
    

  const handleUploadImage = async () => {
    if (!file) {
      setImageUploadError('Please select an image');
      return;
    }

    try {
      setImageUploadError(null);
      const response = await fetch('/api/cloudinary/signature', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName: file.name }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch Cloudinary signature');
      }

      const { signature, timestamp, apiKey, cloudName } = await response.json();

      const uploadData = new FormData();
      uploadData.append('file', file);
      uploadData.append('timestamp', timestamp);
      uploadData.append('api_key', apiKey);
      uploadData.append('signature', signature);
      uploadData.append('folder', 'user_profiles');

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: uploadData,
        }
      );

      if (!uploadResponse.ok) {
        throw new Error('Image upload failed');
      }

      const uploadResult = await uploadResponse.json();
      setFormData({ ...formData, image: uploadResult.secure_url });
      setImageUploadError(null);
      setImageUploadProgress(null);
    } catch (error) {
      setImageUploadError(error.message || 'Image upload failed');
      setImageUploadProgress(null);
    }
  };

// const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.videoUrl && !isValidYouTubeUrl(formData.videoUrl)) {
      setPublishError('Invalid YouTube URL');
      return;
    }

    try {
      const token = currentUser?.token; // Assuming the token is stored here
      const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include token if required
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Update post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category}
          >
            <option value=''>Select a category</option>
            <option value='motivation'>Motivation</option>
            <option value='education-tips'>Education Tips</option>
            <option value='study-hacks'>Study Hacks</option>
            <option value='career-guidance'>Career Guidance</option>
            <option value='teachers-corner'>Teacher’s Corner</option>
            <option value='mental-health-counseling'>Mental Health & Counseling</option>
            <option value='life-skills'>Life Skills</option>
            <option value='success-stories'>Success Stories</option>
            <option value='updates-announcements'>Updates & Announcements</option>
            <option value='inspirational-quotes'>Inspirational Quotes</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type='button'
            outline
            className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white border-orange-600 
                          hover:from-orange-600 hover:to-yellow-500 hover:text-white"
            size='sm'
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )}

        {/* Video URL Input */} 
        <TextInput
          type="text"
          placeholder="YouTube Video URL (Optional)"
          id="videoUrl"
          onChange={(e) =>
            setFormData({ ...formData, videoUrl: e.target.value })
          }
          value={formData.videoUrl || ''}
        />

        <ReactQuill
          theme='snow'
          value={formData.content}
          placeholder='Write something...'
          className='h-72 mb-12'
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button type='submit' gradientDuoTone='orangeToYellow' className='bg-gradient-to-r from-orange-600 to-orange-500 text-white'>
          Update post
        </Button>
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
