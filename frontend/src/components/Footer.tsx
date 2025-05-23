const Footer = () => {
  return (
    <div className="bg-blue-800 py-10">
      <div className="px-[4%] lg:px-[8%] flex justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          Holidays.com
        </span>
        <span className=" text-white font-bold tracking-tight flex gap-4">
          <p className="cursor-pointer">Privacy policy</p>
          <p className="cursor-pointer">Terms of use</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
