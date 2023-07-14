import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import notFoundState from '../stores/notFoundState';

const Page404 = () => {
  const navigate = useNavigate();
  useSnapshot(notFoundState);

  useEffect(() => {
    notFoundState.is404 = true;
    const redirectTimeout = setTimeout(() => {
      navigate('/');
    }, 3500);

    return () => {
      clearTimeout(redirectTimeout);
      notFoundState.is404 = false;
    };
  }, []);

  return (
    <div className='notfound-wrapper'>
      <h1>404</h1>

      <p>Oops..., you are in the wrong place</p>
      <Link to={'/'}>Go back to home</Link>
    </div>
  );
};

export default Page404;
