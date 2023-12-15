import { useSelector } from 'react-redux';
import { 
  useRef, 
  useState, 
  useEffect 
} from 'react';
import { 
  getDownloadURL, 
  getStorage, 
  ref, 
  uploadBytesResumable 
} from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  /* HANDLE FILE UPLOAD */
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => 
          setFormData({...formData, avatar: downloadURL})
        );
      }
    );
  };

  /* FIREBASE STORAGE (GOOGLE FIREBASE CONSOLE) */
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        
        {/* FILE UPLOAD */}
        <input 
          type="file"
          ref={fileRef}
          hidden 
          accept='image/*'
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img 
          src={formData.avatar || currentUser.avatar} 
          alt='profile' 
          className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
          onClick={() => fileRef.current.click()}
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading: ${filePerc} %`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
        
        {/* FORM INPUTS */}
        <input 
          type="text" 
          placeholder='username' 
          id='username' 
          className='border p-3 rounded-lg'  
        />
        <input 
          type="email" 
          placeholder='email' 
          id='email' 
          className='border p-3 rounded-lg'  
        />
        <input 
          type="text" 
          placeholder='password' 
          id='password' 
          className='border p-3 rounded-lg'  
        />
        <button 
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
            update
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  );
}
