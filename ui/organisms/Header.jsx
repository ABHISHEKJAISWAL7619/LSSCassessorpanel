import Image from "next/image";
import Link from "next/link";

const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-white px-5 py-3 shadow-sm md:px-8">
      <div className="flex items-center gap-4 sm:gap-0">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="outline-none md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <div className="bg-background hidden lg:flex px-4 border border-[#D5D5D5] items-center gap-3 rounded-full ">
          <i className="ri-search-line text-[#D5D5D5]"></i>
          <input
            className=" text-secondary outline-0 w-80 text-sm py-2"
            type="search"
            placeholder="Search"
          />
        </div>
      </div>

      <div className="flex w-2/3 flex-row items-center justify-end gap-4">
        <Link href={'/notification'}><i className="ri-notification-3-fill ri-lg text-primary"></i></Link> 
        <Image className="w-10 rounded-sm h-6" src={'/img/india.png'} alt="flag" width={200} height={100} />
        <select className="text-[#565656] text-sm outline-0 w-18" name="" id="">
            <option value="">English</option>
            <option value="">Hindi</option>
            <option value="">Odia</option>
        </select>
       <Link href={'/profile'}> <Image
          className="w-10 shrink-0 h-10 rounded-full object-cover"
          src="/img/profile.jpg"
          alt="profile"
          width="100"
          height="100"
        /></Link> 
        <div className="flex shrink-0 flex-col justify-end">
          <p className="text-sm font-semibold text-secondary">Moni Roy</p>
          <p className="text-xs text-[#565656] ">Assessor</p>
        </div>
        <i className="ri-arrow-down-s-line hidden lg:flex text-secondary border border-[#565656] rounded-full  justify-center items-center w-4 h-4 "></i>
      </div>
    </header>
  );
};

export default Header;
