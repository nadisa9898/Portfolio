import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section id="home" className="grid md:grid-cols-2 items-center gap-12 mt-15">
      <div>
        <p className="text-[40px] mb-2">Hello,</p>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-last-shuriken">
          I'm Nadia Nisa
        </h1>

        <h2 className="text-xl md:text-2xl font-semibold mb-4 font-sofia">
          A Professional UI/UX Designer
        </h2>

        <p className="text-gray-700 max-w-md mb-8">
          shaping digital products with user-friendly interfaces and impactful
          experiences.
        </p>

        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => navigate('/my-work')}
            className="bg-[#242424] text-white w-[138px] h-[46px] md:w-[186px] md:h-[62px] text-[18px] md:text-base flex justify-center items-center rounded-full cursor-pointer hover:bg-[#88887c] transition-colors">
            View My Work
          </button>

          <button className="border border-black w-[138px] h-[46px] md:w-[186px] md:h-[62px] text-[18px] md:text-base flex justify-center items-center rounded-full hover:bg-gray-50 transition-colors">
            Download Resume
          </button>
        </div>
      </div>

      <div className="hidden md:flex justify-center md:justify-self-end">
        <img
          src="/images/heroImage.png"
          className="max-h-[420px] object-contain"
          alt="Hero"
        />
      </div>
    </section>
  );
}
