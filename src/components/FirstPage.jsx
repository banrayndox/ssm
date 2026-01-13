import logo from '../assets/logo.png'
const FirstPage = () => {
  return (
 <div className="global-loader flex flex-col">
   <img src={logo} alt="" className='w-24 h-24 animate-spin-slow' />
   <p className='text-xs text-gray-500 pt-10'>Developed By Rakib Biswash</p>
  </div>
  );
};

export default FirstPage
