export default function Banner() {
  return (
    <section className="max-w-[1170px] mx-auto px-4 md:px-0 mt-37">
      <div className="banner bg-[url('/images/banner-mobile.png')] md:bg-[url('/images/banner.png')]">
        {/* Right content */}
        <div className="max-w-md z-10 ml-auto text-left mt-20 md:mt-0">
          <h2 className="text-[28px] md:text-4xl font-bold leading-snug mb-8 block font-sans">
            Build designs that are visually clean and practically effective.
          </h2>

          <button className="bg-[#242424] text-white w-[138px] h-[46px] md:w-[186px] md:h-[62px] text-[18px] md:text-[18px] flex justify-center items-center rounded-full cursor-pointer hover:bg-gray-800 transition-colors font-semibold mx-auto md:mx-0">
            View My Work
          </button>
        </div>
      </div>
    </section>
  );
}
