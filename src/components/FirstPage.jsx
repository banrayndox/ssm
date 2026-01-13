import logo from '../assets/logo.png'
const FirstPage = () => {
    
  return (
    <>
 <div className="global-loader flex flex-col">
   <img src={logo} alt="" className='w-24 h-24 animate-spin-slow' />

<div class="pt-6 flex justify-center items-center gap-3 cursor-pointer animate-bounce-dots">
  <span class="w-2 h-2 bg-gray-700 rounded-full"></span>
  <span class="w-2 h-2 bg-gray-700 rounded-full"></span>
  <span class="w-2 h-2 bg-gray-700 rounded-full"></span>
</div>
   <p className='text-xs text-gray-500 pt-5'>Developed By Rakib Biswash</p>

  </div>
</>
  
  );
};

export default FirstPage
