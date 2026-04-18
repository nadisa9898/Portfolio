export default function SkillBar() {
  const skills = [
    'App Design',
    'Dashboard',
    'SaaS Products',
    'Business & Platform Design',
    'E-commerce Platform',
    'Website Design',
    'App Design',
    'Dashboard',
    'SAAS',
  ];

  return (
    <div className="bg-black text-white py-0.5 mt-4 md:-ml-12 md:-mr-12 -rotate-2 overflow-hidden flex">
      <div className="animate-marquee flex gap-7 text-[20px] font-bold whitespace-nowrap min-w-max flex-shrink-0 pr-7">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center gap-7">
            <span>{skill}</span>
            <img src="/images/divider.png" alt="divider" />
          </div>
        ))}
      </div>
      <div className="animate-marquee flex gap-7 text-[20px] font-bold whitespace-nowrap min-w-max flex-shrink-0 pr-7" aria-hidden="true">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center gap-7">
            <span>{skill}</span>
            <img src="/images/divider.png" alt="divider" />
          </div>
        ))}
      </div>
    </div>
  );
}
