type Msg = {
  msg: string;
};

const Loader = ({ msg }: Msg) => {
  return (
    <div className='loader-wrapper'>
      <div className='lds-ripple'>
        <div></div>
        <div></div>
      </div>
      {msg}
    </div>
  );
};

export default Loader;
